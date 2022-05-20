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
        <div v-if="!viewToken">
          <div class="mb-1 text-darksilver">
            <label class="shrink text-sm">App Token</label>
          </div>
          <div class="flex justify-between">
            <div class="w-full">
              <DataGridCellBlur
                :options="{
                  length: 100
                }"
              />
            </div>
            <Button class="w-5" @click.prevent="onViewToken">{{
              viewToken ? 'Hide' : 'View'
            }}</Button>
          </div>
        </div>
        <div v-else>
          <TextField
            v-model="$v.fieldToken.$model"
            type="text"
            class="w-full text-sm"
            label="App Token"
            placeholder="Enter your app token"
            :error="getValidationMessage($v.fieldToken)"
          >
            <template #append-inner>
              <Button class="w-5" @click.prevent="onViewToken">{{
                viewToken ? 'Hide' : 'View'
              }}</Button>
            </template>
          </TextField>
        </div>
      </div>
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />

      <div class="mb-6">
        <div v-if="!viewKey">
          <div class="mb-1 text-darksilver">
            <label class="shrink text-sm">App Key</label>
          </div>
          <div class="flex justify-between">
            <div class="w-full">
              <DataGridCellBlur
                :options="{
                  length: 100
                }"
              />
            </div>
            <Button class="w-5" @click.prevent="onViewKey">{{
              viewKey ? 'Hide' : 'View'
            }}</Button>
          </div>
        </div>
        <div v-else>
          <TextField
            v-model="$v.fieldKey.$model"
            type="text"
            class="w-full text-sm"
            label="App Key"
            placeholder="Enter your app key"
            :error="getValidationMessage($v.fieldKey)"
          >
            <template #append-inner>
              <Button class="w-5" @click.prevent="onViewKey">{{
                viewKey ? 'Hide' : 'View'
              }}</Button>
            </template>
          </TextField>
        </div>
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
        <Button class="w-1/2" appearance="secondary" @click.prevent="deactivate"
          >Disable</Button
        >
        <Button class="w-1/2" type="submit">Enable</Button>
      </div>
    </form></FloatingPanel
  >
</template>

<script>
import DataGridCellBlur from '../atoms/DataGridCellBlur.vue'
import { GET_APP, UPDATE_APP } from '~/graphql'
export default {
  components: { DataGridCellBlur },
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
    viewToken: false,
    viewKey: false,
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
          this.fieldToken = newItem?.token
          this.fieldKey = newItem?.secret
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
    onViewToken() {
      this.viewToken = !this.viewToken
    },
    onViewKey() {
      this.viewKey = !this.viewKey
    },
    async deactivate() {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_APP,
          variables: {
            id: this.appId,
            input: {
              isActivated: false
            }
          }
        })
        this.$toast.positive('App deactivated successfully')
        this.sending = false
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    },
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
              name: this.fieldName ?? undefined,
              token: this.fieldToken ?? undefined,
              key: this.fieldKey ?? undefined,
              isActivated: true
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