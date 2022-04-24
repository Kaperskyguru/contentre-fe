<template>
  <div class="p-5">
    <PageTitle>Sign In</PageTitle>
    <form @submit.prevent="login">
      <TextField
        v-model="$v.fieldEmail.$model"
        required
        type="email"
        class="mb-6"
        name="email"
        label="Email Address"
        placeholder="Enter your email address"
        :error="getValidationMessage($v.fieldEmail)"
      />
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />
      <TextField
        v-model="$v.fieldPassword.$model"
        required
        minlength="6"
        class="mb-6"
        type="password"
        maxlength="50"
        placeholder="Enter your full password"
        label="Password"
      ></TextField>
      <div class="flex justify-between mb-6">
        <CheckField id="remember" v-model="fieldRemember"
          >Remember me</CheckField
        >
        <NuxtLink
          to="forgot-password"
          class="font-gilroy text-base font-bold text-primary-teal"
          >Forgot Password?
        </NuxtLink>
      </div>
      <div class="flex justify-center my-9 w-full">
        <Button :disabled="!shouldEnableButton" :waiting="sending"
          >Sign In</Button
        >
      </div>
    </form>
    <p class="font-gilroy text-base font-bold text-center text-body-text-color">
      Don't have an account?
      <NuxtLink class="text-primary-teal" to="/auth/register"
        >Create Account</NuxtLink
      >
    </p>
  </div>
</template>

<script>
import { GET_CURRENT_USER, LOGIN_USER } from '~/graphql'
import { email, required } from '~/plugins/validators'
export default {
  name: 'SignIn',

  layout: 'AuthLayout',

  middleware: 'notAuthenticated',

  data: () => ({
    sending: false,
    fieldEmail: '',
    honeyPot: '',
    fieldRemember: false,
    fieldPassword: ''
  }),

  validations: {
    fieldEmail: { required, email },
    fieldPassword: {
      required
    },
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
          mutation: LOGIN_USER,
          variables: {
            input: {
              email: this.fieldEmail.toLocaleLowerCase(),
              password: this.fieldPassword,
              remember: this.fieldRemember
            }
          },
          update: (cache, { data: { loginUser } }) => {
            cache.writeQuery({
              query: GET_CURRENT_USER,
              data: { getCurrentUser: loginUser }
            })
          }
        })
        this.sending = false

        // GO to 2FA
        await this.$router.push('/') // '/auth/signup/verify-email')
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
