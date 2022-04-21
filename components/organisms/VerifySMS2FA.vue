<template>
  <div class="w-full">
    <div class="flex flex-col mb-6 space-x-0 md:flex-row md:space-x-2">
      <div class="pb-2 md:w-full">
        <TextField
          v-model="$v.fieldPhone.$model"
          type="text"
          class="w-full text-sm"
          placeholder="Enter Phone number"
          :error="getValidationMessage($v.fieldPhone)"
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
import { SEND_PHONE_CODE, USE_PHONE_CODE } from '~/graphql'
import { numeric } from '~/plugins/validators'
export default {
  data: () => ({
    fieldPhone: '',
    sent: false,
    sending: false,
    fieldCode: '',
    honeyPot: ''
  }),
  validations: {
    fieldCode: { numeric },
    fieldPhone: {},
    honeyPot: {}
  },

  methods: {
    async sendPhoneCode() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: SEND_PHONE_CODE,
          variables: {
            phone: this.fieldPhone
          }
        })
        this.sent = true
        this.$toast.positive('Phone code sent successfully')
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
          mutation: USE_PHONE_CODE,
          variables: {
            code: this.fieldCode + ''
          }
        })
        this.sent = true
        this.$toast.positive('Phone verified successfully')
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