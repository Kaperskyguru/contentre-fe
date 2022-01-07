<template>
  <div class="p-5">
    <PageTitle>Create Account</PageTitle>
    <form @submit.prevent="handleSubmission">
      <TextField
        v-model="$v.fieldUsername.$model"
        required
        label="Choose your portfolio address"
        placeholder="www.contentre.me/username"
        maxlength="35"
        :error="getValidationMessage($v.fieldUsername)"
      >
      </TextField>
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />
      <TextField
        v-model="$v.fieldName.$model"
        required
        placeholder="Enter your full name"
        label="Full name"
        name="name"
        maxlength="35"
        :error="getValidationMessage($v.fieldName)"
      >
      </TextField>
      <TextField
        v-model="$v.fieldEmail.$model"
        required
        type="email"
        name="email"
        label="Email Address"
        placeholder="Enter your email address"
        :error="getValidationMessage($v.fieldEmail)"
      >
      </TextField>
      <TextField
        v-model="$v.fieldPassword.$model"
        required
        minlength="6"
        type="password"
        placeholder="Create a strong password"
        label="Create password"
        maxlength="50"
      ></TextField>
      <TextField
        v-model="$v.fieldPasswordConfirmation.$model"
        required
        minlength="6"
        type="password"
        placeholder="Re-enter your password"
        label="Re-enter password"
      ></TextField>
      <PasswordMeter
        :correct="passwordLengthOK"
        text="Password should be at least 6 characters long"
      />
      <PasswordMeter
        text="Password should contain a special character"
        :correct="passwordContainsSpecialChars"
      />
      <PasswordMeter
        :correct="passwordHasCapital"
        text="Password should have an uppercase letter"
      />
      <PasswordMeter :correct="passwordsMatch" text="Passwords should match" />
      <AuthButton :disabled="!shouldEnableButton">Create Account</AuthButton>
    </form>
    <p class="font-gilroy font-bold text-center text-body-text-color text-base">
      Already have an account?
      <NuxtLink class="text-primary-teal" to="sign-in">Sign In</NuxtLink>
    </p>
  </div>
</template>

<script>
import { email, maxLength, minLength, required } from '~/plugins/validators'
export default {
  name: 'IndexPage',
  layout: 'AuthLayout',

  data: () => ({
    sending: false,
    fieldEmail: '',
    fieldUsername: '',
    fieldName: '',
    honeyPot: '',
    fieldPassword: '',
    fieldPasswordConfirmation: ''
  }),

  validations: {
    fieldEmail: { required, email },
    fieldName: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(35)
    },
    fieldPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(50)
    },
    fieldPasswordConfirmation: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(50)
    },
    fieldUsername: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(35)
    },
    honeyPot: {}
  },

  computed: {
    fullNameIsValid() {
      const names = this.fieldName.split(' ')
      return (
        names.length >= 2 &&
        this.fieldName.length >= 1 &&
        names.every((item) => item.length >= 1)
      )
    },
    usernameIsValid() {
      return /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(this.username)
    },
    passwordContainsSpecialChars() {
      return (
        /[!-/:-@[-`{-~]/.test(this.fieldPassword) &&
        this.fieldPassword.length >= 1
      )
    },
    passwordLengthOK() {
      return this.fieldPassword.length >= 6
    },
    passwordsMatch() {
      return (
        this.fieldPassword === this.fieldPasswordConfirmation &&
        this.fieldPassword.length >= 6
      )
    },
    passwordHasCapital() {
      let hasCapital = false
      for (let i = 0; i < this.fieldPassword.length; i++) {
        if (
          this.fieldPassword[i].toUpperCase() === this.fieldPassword[i] &&
          /[A-Za-z]/.test(this.fieldPassword[i])
        ) {
          hasCapital = true
        }
      }
      return hasCapital
    },

    shouldEnableButton() {
      return (
        this.passwordsMatch &&
        this.passwordLengthOK &&
        this.passwordContainsSpecialChars &&
        this.passwordHasCapital &&
        this.username &&
        this.email &&
        this.full_name &&
        this.password &&
        this.usernameIsValid &&
        this.fullNameIsValid
      )
    }
  },
  methods: {
    handleSubmission() {
      this.$store.dispatch('registration/registerUser')
    }
  }
}
</script>

<style scoped>
</style>
