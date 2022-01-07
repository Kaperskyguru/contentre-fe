<template>
  <div class="p-5">
    <PageTitle>Forgot Password</PageTitle>
    <TextField v-model="email" label="Email Address" placeholder="Enter your email address"></TextField>

    <AuthButton>Submit</AuthButton>
    <p class="font-gilroy font-bold text-center text-body-text-color text-base">Don't have an account? <NuxtLink class="text-primary-teal" to="/">Create Account</NuxtLink></p>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  layout: 'AuthLayout',
  computed: {
    email: {
      get() {
        return this.$store.state.forgotPassword.email
      },
      set(value) {
        this.$store.commit('forgotPassword.js/updateEmail', value)
      }
    },
  }
}
</script>

<style scoped>

</style>
