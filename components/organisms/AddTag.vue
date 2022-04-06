<template>
  <form class="w-full" @submit.prevent="createTag">
    <div class="mb-6">
      <TextField
        v-model="$v.fieldName.$model"
        type="text"
        class="w-full text-sm"
        label="Tag Name"
        placeholder="Enter your tag name"
        :error="getValidationMessage($v.fieldName)"
      />
    </div>
    <input
      v-model="$v.honeyPot.$model"
      type="text"
      class="absolute invisible"
    />

    <div class="flex justify-center items-center px-3 mt-4 w-full">
      <Button class="w-1/2" type="submit"> Save </Button>
    </div>
  </form>
</template>

<script>
import { CREATE_TAG } from '~/graphql'
import { required } from '~/plugins/validators'
export default {
  data: () => ({
    fieldName: '',
    honeyPot: ''
  }),
  validations: {
    fieldName: {
      required
    },

    honeyPot: {}
  },

  methods: {
    async createTag() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: CREATE_TAG,
          variables: {
            input: {
              name: this.fieldName
            }
          }
        })
        this.$toast.positive('Tag created successfully')
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