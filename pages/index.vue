<template>
  <div>
    <AuthPageTitle />
    <AuthInputField placeholder="www.contentr.me/ username" label="Choose your portfolio address" />
    <AuthInputField placeholder="Enter your full name" label="Full name" />
    <AuthInputField placeholder="Enter your email address" label="Email address" />
    <AuthInputField placeholder="Create password" label="Create a strong password" type="password" />
    <AuthInputField placeholder="Re-enter password" label="Re-enter your password" type="password" />
    <AuthCorrectPasswordIdentifier />
    <AuthCorrectPasswordIdentifier correct="true" text="Password should contain a special character" />
    <AuthCorrectPasswordIdentifier text="Password should have an uppercase letter" />
    <AuthSubmitButton>Create Account</AuthSubmitButton>
    <p class="gilroy-bold text-center">Already have an account? <NuxtLink to="sign-in">Sign In</NuxtLink></p>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: "AuthLayout"
}
</script>

<style scoped>
p {
  color: #102A27;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
}
p a {
  color: #4FD1C5;
  text-decoration: none;
}
</style>
