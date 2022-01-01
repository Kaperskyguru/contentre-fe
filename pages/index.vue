<template>
  <div>
    <PageTitle />
    <TextField
      placeholder="www.contentr.me/ username"
      label="Choose your portfolio address"
    />
    <TextField placeholder="Enter your full name" label="Full name" />
    <TextField placeholder="Enter your email address" label="Email address" />
    <TextField
      placeholder="Create password"
      label="Create a strong password"
      type="password"
    />
    <TextField
      placeholder="Re-enter password"
      label="Re-enter your password"
      type="password"
    />
    <PasswordMeter text="Password should be at least 6 characters" />
    <PasswordMeter correct text="Password should contain a special character" />
    <PasswordMeter text="Password should have an uppercase letter" />
    <Button>Create Account</Button>
    <p class="gilroy-bold text-center">
      Already have an account? <Hyperlink to="sign-in">Sign In</Hyperlink>
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
