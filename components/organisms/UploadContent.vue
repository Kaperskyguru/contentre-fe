<template>
  <div class="w-full">
    <form class="mb-5 w-full" @submit.prevent="uploadContent">
      <div class="">
        <TextField
          v-model="$v.fieldURL.$model"
          type="text"
          class="w-full text-sm"
          label="Content URL"
          placeholder="Paste your content URL"
          :error="getValidationMessage($v.fieldURL)"
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
    <small class="pt-3 text-sm text-center text-gray-300"
      >* Only upload content you have the legal right to</small
    >
  </div>
</template>

<script>
import { UPLOAD_CONTENT } from '~/graphql'
import { required } from '~/plugins/validators'
export default {
  data: () => ({
    fieldURL: '',
    honeyPot: '',
    content: [],
    sending: false
  }),
  validations: {
    fieldURL: {
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
          mutation: UPLOAD_CONTENT,
          variables: {
            input: {
              url: this.fieldURL
            }
          },
          update(data) {
            // console.log(data)
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