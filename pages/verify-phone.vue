<template>
  <div class="p-5">
    <PageTitle>Verify Phone Number</PageTitle>
    <form @submit.prevent="login">
      <TextField
        v-model="$v.fieldPhone.$model"
        required
        type="text"
        name="phone"
        label="Phone Number"
        placeholder="Enter your phone number"
        :error="getValidationMessage($v.fieldPhone)"
      />
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />
      <div class="flex my-9 w-full justify-center">
        <Button :disabled="!shouldEnableButton" :waiting="sending"
        >Verify Phone!</Button
        >
      </div>
    </form>
  </div>
</template>

<script>
import {GET_CURRENT_USER, LOGIN_USER, SEND_PHONE_CODE} from '~/graphql'
import { email, required } from '~/plugins/validators'
export default {
  name: 'VerifyPhone',

  layout: 'AuthLayout',

  data: () => ({
    sending: false,
    fieldPhone: '',
    honeyPot: '',
  }),

  validations: {
    fieldPhone: { required, email },
    honeyPot: {}
  },

  computed: {
    shouldEnableButton() {
      return this.fieldEmail && this.fieldPassword
    }
  },

  methods: {
    async login() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return
      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: SEND_PHONE_CODE,
          variables: {
            input: {
              email: this.fieldEmail,
            }
          },
          update: (cache, { data: { loginUser } }) => {
            cache.writeQuery({
              query: GET_CURRENT_USER,
              data: { getCurrentUser: loginUser }
            })

            // this.$pusher.subscribe(`presence-online-${loginUser?.id}`)
          }
        })

        alert('Login successfully')
        this.sending = false

        // await this.$router.push('/auth/signup/verify-email')
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    }
  }
}
</script>

<style scoped>
</style>
