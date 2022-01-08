<template>
  <div class="p-5">
    <PageTitle>Change password</PageTitle>
    <p>
      Set a new password with 8 or more characters, at least one number and one
      special character.

      {{ $v.fieldPassword.hasSymbol }}
    </p>
    <br />
    <form @submit.prevent="onSubmit">
      <TextField
        id="password"
        v-model="$v.fieldPassword.$model"
        type="password"
        name="password"
        autocomplete="password"
        label="Password"
        enterkeyhint="send"
        maxlength="50"
        :error="getValidationMessage($v.fieldPassword)"
      />

      <PasswordMeter
        :correct="$v.fieldPassword.required && $v.fieldPassword.minLength"
        text="Password should be at least 6 characters long"
      />
      <PasswordMeter
        text="Password should contain a special character"
        :correct="$v.fieldPassword.required && $v.fieldPassword.hasSymbol"
      />
      <PasswordMeter
        :correct="$v.fieldPassword.required && $v.fieldPassword.hasCapital"
        text="Password should have an uppercase letter"
      />
      <PasswordMeter
        :correct="$v.fieldPassword.required && $v.fieldPassword.hasNumber"
        text="Password should contain at least one number"
      />

      <div class="flex my-9 w-full justify-center">
        <Button
          type="button"
          appearance="secondary"
          :disabled="sending"
          @click.prevent="onGoBack"
        >
          Back
        </Button>

        <Button type="submit" :waiting="sending"> Next </Button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  required,
  minLength,
  hasLetter,
  hasNumber,
  hasSymbol,
  hasCapital
} from '~/plugins/validators'
import { RESET_PASSWORD } from '~/graphql'

export default {
  name: 'ChangePassword',
  layout: 'AuthLayout',

  middleware: ['isAuthenticated', 'isEmailConfirmed'],

  data: () => ({
    sending: false,
    fieldPassword: ''
  }),

  validations: {
    fieldPassword: {
      required,
      minLength: minLength(6),
      hasLetter,
      hasNumber,
      hasSymbol,
      hasCapital
    }
  },

  methods: {
    async onGoBack() {
      this.sending = true
      this.$v.$reset()
      await this.$logoutUser()
    },

    async onSubmit() {
      try {
        this.$toast.message = ''
        if (await this.isValidationInvalid()) return
        this.sending = true

        await this.$apollo.mutate({
          mutation: RESET_PASSWORD,
          variables: {
            newPassword: this.fieldPassword
          }
        })

        await this.$router.push('/')
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    }
  }
}
</script>
