<template>
  <div class="p-5">
    <PageTitle>Forgot Password</PageTitle>
    <TextField label="Email Address" placeholder="Enter your email address"></TextField>

    <AuthButton>Submit</AuthButton>
    <p class="font-gilroy font-bold text-center text-body-text-color text-base">Don't have an account? <NuxtLink class="text-primary-teal" to="/">Create Account</NuxtLink></p>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  layout: 'AuthLayout',
}
</script>

<style scoped>

</style>
