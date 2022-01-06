<template>
<div class="p-5">
  <PageTitle>Create Account</PageTitle>
  <TextField label="Choose your portfolio address" placeholder="www.contentr.me/ username"></TextField>
  <TextField placeholder="Enter your full name" label="Full name"></TextField>
  <TextField label="Email Address" placeholder="Enter your email address"></TextField>
  <TextField type="password" placeholder="Create a strong password" label="Create password"></TextField>
  <TextField type="password" placeholder="Re-enter your password" label="Re-enter password"></TextField>
  <PasswordMeter text="Password should be at least 6 characters long" />
  <PasswordMeter text="Password should be at least 6 characters long" :correct="true" />
  <AuthButton>Create Account</AuthButton>
  <p class="font-gilroy font-bold text-center text-body-text-color text-base">Already have an account? <NuxtLink class="text-primary-teal" to="sign-in">Sign In</NuxtLink></p>
</div>
</template>

<script>
export default {
  name: "IndexPage",
  layout: 'AuthLayout',
}
</script>

<style scoped>

</style>
