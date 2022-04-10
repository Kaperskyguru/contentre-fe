<template>
  <div class="w-full">
    <div class="flex flex-col mb-6 space-x-0 md:flex-row md:space-x-2">
      <div class="pb-2 md:w-full">
        <TextField
          v-model="$v.fieldEmail.$model"
          type="email"
          class="w-full text-sm"
          placeholder="Enter email"
          :error="getValidationMessage($v.fieldEmail)"
          :disabled="sent"
        />
      </div>
      <div class="md:w-1/3">
        <Button
          :disabled="sent"
          :waiting="sending"
          @click.prevent="sendEmailCode"
        >
          {{ sent ? 'Code Sent' : 'Send Code' }}
        </Button>
      </div>
    </div>

    <div class="flex flex-col space-x-0 md:flex-row md:space-x-2">
      <div class="pb-2 md:w-full">
        <TextField
          v-model="$v.fieldCode.$model"
          type="number"
          class="w-full text-sm"
          required
          placeholder="Enter code"
          :error="getValidationMessage($v.fieldCode)"
        />
      </div>
      <div class="md:w-1/3">
        <Button :waiting="sending" @click.prevent="verifyCode">
          Verify Code
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { SEND_EMAIL_CODE, USE_EMAIL_CODE } from '~/graphql'
import { required, email } from '~/plugins/validators'
export default {
  data: () => ({
    fieldEmail: '',
    fieldCode: '',
    sent: false,
    sending: false,
    honeyPot: ''
  }),
  validations: {
    fieldEmail: { email, required },
    fieldCode: {},
    honeyPot: {}
  },

  methods: {
    async sendEmailCode() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: SEND_EMAIL_CODE,
          variables: {
            email: this.fieldEmail
          }
        })
        this.sent = true
        this.$toast.positive('Email sent successfully')
        this.sending = false
        this.$emit('create:success', true)
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
        this.$emit('create:success', false)
      }
    },

    async verifyCode() {
      if (this.honeyPot) return

      if (!this.fieldCode) {
        this.$toast.negative('Code is required')
        return
      }

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: USE_EMAIL_CODE,
          variables: {
            code: this.fieldCode + ''
          }
        })
        this.sent = true
        this.$toast.positive('Email verified successfully')
        this.sending = false
        this.$emit('create:success', true)
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
        this.$emit('create:success', false)
      }
    }
  }
}
</script>

<style>
</style>