<template>
  <div class="w-full">
    <form class="mb-5 w-full" @submit.prevent="uploadContent">
      <div class="">
        <TextField
          v-model="$v.fieldURLs.$model"
          type="text"
          :rows="20"
          class="w-full text-sm"
          label="Content URLs"
          placeholder="Paste all your content URLs (separate by space)"
          :error="getValidationMessage($v.fieldURLs)"
        />
      </div>
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />

      <div class="flex justify-center items-center px-3 mt-4 w-full">
        <Button type="submit" :waiting="sending"> Upload </Button>
      </div>
    </form>
    <small class="pt-3 text-sm text-center text-red-300"
      >* Only upload contents you have the legal right to</small
    >
  </div>
</template>

<script>
import { UPLOAD_MULTIPLE_CONTENT } from '~/graphql'
import { required } from '~/plugins/validators'
export default {
  data: () => ({
    fieldURLs: '',
    honeyPot: '',
    content: [],
    sending: false
  }),
  validations: {
    fieldURLs: {
      required
    },

    honeyPot: {}
  },

  methods: {
    async uploadContent() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: UPLOAD_MULTIPLE_CONTENT,
          variables: {
            input: {
              urls: this.fieldURLs.split(/\r?\n/)
            }
          },
          update(data) {
            console.log(data)
          }
        })
        this.$toast.positive('Content upload successfully')
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