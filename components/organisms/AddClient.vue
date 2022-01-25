<template>
  <form class="w-full" @submit.prevent="createClient">
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
      <Button class="w-1/2" type="submit"> Save </Button>
    </div>
  </form>
</template>

<script>
import { CREATE_CLIENT } from '~/graphql'
import { required, isURL } from '~/plugins/validators'
export default {
  data: () => ({
    fieldName: '',
    fieldProfile: '',
    fieldWebsite: '',
    honeyPot: ''
  }),
  validations: {
    fieldProfile: { isURL },
    fieldName: {
      required
    },

    fieldWebsite: {
      required,
      isURL
    },

    honeyPot: {}
  },

  methods: {
    async createClient() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: CREATE_CLIENT,
          variables: {
            input: {
              name: this.fieldName,
              website: this.fieldWebsite,
              profile: this.fieldProfile
            }
          }
        })
        this.$toast.positive('Client created successfully')
        this.sending = false
        this.$emit('create:success', true)
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