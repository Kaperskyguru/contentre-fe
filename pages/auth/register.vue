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
      <PasswordMeter :correct="passwordsMatch" text="Passwords should match" />
      <div class="flex my-9 w-full justify-center">
        <Button :disabled="!shouldEnableButton" :waiting="sending"
          >Create Account</Button
        >
      </div>
    </form>
    <p class="font-gilroy font-bold text-center text-body-text-color text-base">
      Already have an account?
      <NuxtLink class="text-primary-teal" to="sign-in">Sign In</NuxtLink>
    </p>
  </div>
</template>

<script>
import {
  email,
  maxLength,
  minLength,
  required,
  hasLetter,
  hasNumber,
  hasSymbol,
  hasCapital
} from '~/plugins/validators'
import { CREATE_USER, GET_CURRENT_USER, VERIFY_USERNAME } from '~/graphql'
import { SEND_EMAIL_CODE } from '~/graphql/auth/mutations'
import { currentUser } from '~/components/mixins'
export default {
  name: 'IndexPage',

  mixins: [currentUser],

  layout: 'AuthLayout',

  middleware: 'notAuthenticated',

  data: () => ({
    sending: false,
    fieldEmail: '',
    fieldUsername: '',
    fieldName: '',
    honeyPot: '',
    fieldPassword: '',
    fieldPasswordConfirmation: '',
    usernameError: ''
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
      maxLength: maxLength(50),
      hasNumber,
      hasLetter,
      hasSymbol,
      hasCapital
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

    passwordsMatch() {
      return (
        this.fieldPassword === this.fieldPasswordConfirmation &&
        this.fieldPassword.length >= 6
      )
    },

    shouldEnableButton() {
      return (
        this.passwordsMatch &&
        this.$v.fieldPassword.minLength &&
        this.$v.fieldPassword.maxLength &&
        this.$v.fieldPassword.hasSymbol &&
        this.$v.fieldPassword.hasCapital &&
        this.fieldUsername &&
        this.fieldEmail &&
        this.fieldName &&
        this.fieldPassword &&
        this.usernameIsValid &&
        this.fullNameIsValid
      )
    }
  },
  methods: {
    async handleSubmission() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: VERIFY_USERNAME,
          variables: {
            username: this.fieldUsername
          }
        })

        await this.createNewUser({
          email: this.fieldEmail,
          username: this.fieldUsername,
          name: this.fieldName,
          password: this.fieldPassword
          // signedUpThrough: 'CONTENTRE'
        })

        if (!this.currentUser.emailConfirmed) {
          await this.$apollo.mutate({
            mutation: SEND_EMAIL_CODE,
            variables: {
              email: this.currentUser.email
            }
          })
        }

        await this.$router.push('/auth/verify-email')
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    },

    async createNewUser(input) {
      await this.$apollo.mutate({
        mutation: CREATE_USER,
        variables: {
          input: {
            ...input
            // language: this.$i18n.getLocaleCookie()
          }
        },
        update: (cache, { data: { createUser } }) => {
          cache.writeQuery({
            query: GET_CURRENT_USER,
            data: { getCurrentUser: createUser }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>