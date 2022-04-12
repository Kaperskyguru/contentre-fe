<template>
  <div class="p-5">
    <form @submit.prevent="onSubmit">
      <PageTitle>Forgot Password</PageTitle>
      <p class="font-gilroy">
        Enter the email address associated with your account before changing
        your password.
      </p>

      <br />
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />

      <TextField
        id="email"
        v-model="$v.fieldEmail.$model"
        type="email"
        name="email"
        autofocus
        autocomplete="email"
        label="Email address"
        enterkeyhint="send"
        maxlength="320"
        :error="getValidationMessage($v.fieldEmail)"
      />

      <div class="flex justify-center my-9 w-full">
        <Button
          type="button"
          appearance="secondary"
          :disabled="sending"
          @click.prevent="onGoBack"
        >
          Back
        </Button>

        <Button type="submit" :waiting="sending"> Next</Button>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required } from '~/plugins/validators'
import { SEND_PASSWORD_RESET_CODE } from '~/graphql'

export default {
  name: 'ForgotPassword',

  layout: 'AuthLayout',

  middleware: 'notAuthenticated',

  data: () => ({
    sending: false,
    fieldEmail: '',
    honeyPot: ''
  }),

  validations: {
    fieldEmail: { required, email },
    honeyPot: {}
  },

  methods: {
    async onGoBack() {
      this.sending = true
      this.$v.$reset()
      await this.$logoutUser()
    },

    async onSubmit() {
      if (this.honeyPot) return

      try {
        this.$toast.message = ''
        if (await this.isValidationInvalid()) return
        this.sending = true

        await this.$apollo.mutate({
          mutation: SEND_PASSWORD_RESET_CODE,
          variables: {
            email: this.fieldEmail.toLocaleLowerCase()
          }
        })

        this.$toast.positive(
          'If there is a match with this email address in our records, we will send a password reset link.'
        )
        await this.$nextTick()

        await this.$router.push({
          path: '/auth/forgot-password/verify-email',
          query: { email: this.fieldEmail.toLocaleLowerCase() }
        })
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    }
  }
}
</script>
