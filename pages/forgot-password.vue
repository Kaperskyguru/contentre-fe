<template>
  <div>
    <PageTitle title="Forgot password" />
    <TextField placeholder="Enter your email address" label="Email address" />
    <div class="sign-in-options">
      <Hyperlink id="sign-in-option-link" class="gilroy-bold" to="/sign-in"
        >Sign In?</Hyperlink
      >
    </div>
    <Button>Submit</Button>
    <p class="gilroy-bold text-center">
      Don't have an account?
      <Hyperlink to="/">Create Account</Hyperlink>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  layout: 'AuthLayout'
}
</script>

<style scoped>
p {
  color: #102a27;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  margin-top: 20px;
}

p a {
  color: #4fd1c5;
  text-decoration: none;
}

.sign-in-options {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 40px;
}

#sign-in-option-link {
  color: #4fd1c5;
  letter-spacing: 0.02em;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
}
</style>
