<template>
  <div class="p-5">
    <PageTitle>Sign In</PageTitle>
    <TextField label="Email Address" placeholder="Enter your email address"></TextField>
    <TextField type="password" placeholder="Enter your full password" label="Password"></TextField>
    <div class="flex justify-between">
      <CheckBox>Remember me</CheckBox>
      <NuxtLink to="forgot-password" class="text-base font-bold font-gilroy text-primary-teal">Forgot Password?</NuxtLink>
    </div>
    <AuthButton>Sign In</AuthButton>
    <p class="font-gilroy font-bold text-center text-body-text-color text-base">Don't have an account? <NuxtLink class="text-primary-teal" to="/">Create Account</NuxtLink></p>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  layout: 'AuthLayout',
}
</script>

<style scoped>

</style>
