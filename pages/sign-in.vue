<template>
  <div class="p-5">
    <PageTitle>Sign In</PageTitle>
    <TextField v-model="email" label="Email Address" placeholder="Enter your email address"></TextField>
    <TextField v-model="password" type="password" placeholder="Enter your full password" label="Password"></TextField>
    <div class="flex justify-between">
      <CheckBox v-model="rememberMe">Remember me</CheckBox>
      <NuxtLink to="forgot-password" class="text-base font-bold font-gilroy text-primary-teal">Forgot Password?
      </NuxtLink>
    </div>
    <AuthButton>Sign In</AuthButton>
    <p class="font-gilroy font-bold text-center text-body-text-color text-base">Don't have an account?
      <NuxtLink class="text-primary-teal" to="/">Create Account</NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  layout: 'AuthLayout',
  computed: {
    email: {
      get() {
        return this.$store.state.login.email
      },
      set(value) {
        this.$store.commit('login/updateEmail', value)
      }
    },
    password: {
      get() {
        return this.$store.state.login.password
      },
      set(value) {
        this.$store.commit('login/updatePassword', value)
      }
    },
    rememberMe: {
      get() {
        return this.$store.state.login.rememberMe
      },
      set() {
        this.$store.commit('login/toggleRememberMe')
      }
    }
  }
}
</script>

<style scoped>

</style>
