<template>
  <div class="p-5">
    <PageTitle>Sign In</PageTitle>
    <form @submit.prevent="login">
      <TextField
        v-model="$v.fieldEmail.$model"
        required
        type="email"
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
        type="password"
        maxlength="50"
        placeholder="Enter your full password"
        label="Password"
      ></TextField>
      <div class="flex justify-between">
        <CheckField id="remember" v-model="fieldRemember"
          >Remember me</CheckField
        >
        <NuxtLink
          to="forgot-password"
          class="text-base font-bold font-gilroy text-primary-teal"
          >Forgot Password?
        </NuxtLink>
      </div>
      <div class="flex my-9 w-full justify-center">
        <Button :disabled="!shouldEnableButton" :waiting="sending"
          >Sign In</Button
        >
      </div>
    </form>
    <p class="font-gilroy font-bold text-center text-body-text-color text-base">
      Don't have an account?
      <NuxtLink class="text-primary-teal" to="/">Create Account</NuxtLink>
    </p>
  </div>
</template>

<script>
import { GET_CURRENT_USER, LOGIN_USER } from '~/graphql'
import { email, required } from '~/plugins/validators'
export default {
  name: 'SignIn',

  layout: 'AuthLayout',

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
              email: this.fieldEmail,
              password: this.fieldPassword,
              remember: this.fieldRemember
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
