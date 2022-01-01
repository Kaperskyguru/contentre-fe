<template>
  <div>
    <PageTitle />
    <InputField
      placeholder="www.contentr.me/ username"
      label="Choose your portfolio address"
    />
    <InputField placeholder="Enter your full name" label="Full name" />
    <InputField placeholder="Enter your email address" label="Email address" />
    <InputField
      placeholder="Create password"
      label="Create a strong password"
      type="password"
    />
    <InputField
      placeholder="Re-enter password"
      label="Re-enter your password"
      type="password"
    />
    <CorrectPasswordIdentifier />
    <CorrectPasswordIdentifier
      correct
      text="Password should contain a special character"
    />
    <CorrectPasswordIdentifier
      text="Password should have an uppercase letter"
    />
    <SubmitButton>Create Account</SubmitButton>
    <p class="gilroy-bold text-center">
      Already have an account? <NuxtLink to="sign-in">Sign In</NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'AuthLayout',
}
</script>

<style scoped>
p {
  color: #102a27;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
}
p a {
  color: #4fd1c5;
  text-decoration: none;
}
</style>
