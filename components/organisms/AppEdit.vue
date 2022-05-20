<template>
  <FloatingPanel v-model="open" :inside="false" from="right">
    <template #header>
      <strong>
        {{ isEditing ? 'Edit app' : 'Create app' }}
      </strong>
    </template>
    <form class="w-full" @submit.prevent="updateApp">
      <div class="mb-6">
        <TextField
          v-model="$v.fieldName.$model"
          type="text"
          class="w-full text-sm"
          label="App Name"
          placeholder="Enter your app name"
          :error="getValidationMessage($v.fieldName)"
        />
      </div>

      <div class="mb-6">
        <TextField
          v-model="$v.fieldToken.$model"
          type="text"
          class="w-full text-sm"
          label="App Token"
          placeholder="Enter your app token"
          :error="getValidationMessage($v.fieldToken)"
        />
      </div>
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />
      <div class="mb-6 w-full">
        <TextField
          v-model="$v.fieldKey.$model"
          type="text"
          class="w-full text-sm"
          label="App Key"
          placeholder="Enter app key"
          :error="getValidationMessage($v.fieldKey)"
        />
      </div>

      <!-- <div class="mb-6">
        <CheckField
          v-model="$v.fieldActivate.$model"
          type="text"
          class="w-full text-sm"
          label="Profile Link"
          placeholder="Enter your content profile"
          :error="getValidationMessage($v.fieldActivate)"
        >Active
      </div> -->

      <div
        class="
          flex flex-col
          justify-center
          items-center
          px-3
          mt-4
          space-y-2 space-x-0
          w-full
          md:flex-row md:space-y-0 md:space-x-2
        "
      >
        <Button class="w-1/2" appearance="secondary">Disable</Button>
        <Button class="w-1/2" type="submit">Enable</Button>
      </div>
    </form></FloatingPanel
  >
</template>

<script>
import { GET_APP, UPDATE_APP } from '~/graphql'
export default {
  model: {
    prop: 'appId',
    event: 'update:appId'
  },
  props: {
    appId: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    fieldName: '',
    fieldToken: '',
    fieldKey: '',
    // fieldActivate: '',
    honeyPot: ''
  }),
  validations: {
    fieldName: {},
    fieldToken: {},
    fieldKey: {},
    // fieldActivate: {},
    honeyPot: {}
  },
  computed: {
    isEditing() {
      return !!this.appId
    },
    open: {
      get() {
        return !!this.appId
      },
      set(value) {
        this.$emit('update:appId', null)
      }
    }
  },
  watch: {
    app: {
      handler(newItem) {
        if (this.app) {
          this.fieldName = newItem?.name
        }
      },
      deep: true,
      immediate: true
    }
  },
  apollo: {
    app: {
      query: GET_APP,
      update(data) {
        return data.getApp
      },
      variables() {
        return {
          id: this.appId
        }
      },
      skip() {
        return !this.appId
      }
    }
  },

  methods: {
    async updateApp() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: UPDATE_APP,
          variables: {
            id: this.appId,
            input: {
              name: this.fieldName,
              token: this.fieldToken,
              key: this.fieldKey
            }
          }
        })
        this.$toast.positive('App updated successfully')
        this.sending = false
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    }
  }
}
</script>

<style>
</style>