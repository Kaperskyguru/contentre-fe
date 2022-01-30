<template>
  <FloatingPanel v-model="open" :inside="false" from="right">
    <form class="w-full" @submit.prevent="updateClient">
      <div class="">
        <TextField
          v-model="$v.fieldName.$model"
          type="text"
          class="w-full text-sm"
          label="Client Name"
          placeholder="Enter your client name"
          :error="getValidationMessage($v.fieldName)"
        />
      </div>
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />
      <div class="w-full">
        <TextField
          v-model="$v.fieldWebsite.$model"
          type="text"
          class="w-full text-sm"
          label="Client Website"
          placeholder="Enter client website"
          :error="getValidationMessage($v.fieldWebsite)"
        />
      </div>

      <section class="">
        <TextField
          v-model="$v.fieldProfile.$model"
          type="text"
          class="w-full text-sm"
          label="Profile Link"
          placeholder="Enter your content profile"
          :error="getValidationMessage($v.fieldProfile)"
        />
      </section>

      <div class="w-full px-3 flex items-center justify-center mt-4">
        <Button class="w-1/2" type="submit">Update</Button>
      </div>
    </form></FloatingPanel
  >
</template>

<script>
import { isURL } from '~/plugins/validators'
import { GET_CLIENT, UPDATE_CLIENT } from '~/graphql'
export default {
  model: {
    prop: 'clientId',
    event: 'update:clientId'
  },
  props: {
    clientId: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    fieldName: '',
    fieldProfile: '',
    fieldWebsite: '',
    honeyPot: ''
  }),
  validations: {
    fieldProfile: { isURL },
    fieldName: {},
    fieldWebsite: {
      isURL
    },

    honeyPot: {}
  },
  computed: {
    open: {
      get() {
        return !!this.clientId
      },
      set(value) {
        this.$emit('update:clientId', null)
      }
    }
  },
  watch: {
    client: {
      handler(newItem) {
        if (this.client) {
          this.fieldProfile = newItem?.profile
          this.fieldWebsite = newItem?.website
          this.fieldName = newItem?.name
        }
      },
      deep: true,
      immediate: true
    }
  },
  apollo: {
    client: {
      query: GET_CLIENT,
      update(data) {
        return data.getClient
      },
      variables() {
        return {
          id: this.clientId
        }
      },
      skip() {
        return !this.clientId
      }
    }
  },

  methods: {
    async updateClient() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        console.log(this.fieldProfile)
        await this.$apollo.mutate({
          mutation: UPDATE_CLIENT,
          variables: {
            id: this.clientId,
            input: {
              name: this.fieldName,
              website: this.fieldWebsite,
              profile: this.fieldProfile
            }
          }
        })
        this.$toast.positive('Client updated successfully')
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