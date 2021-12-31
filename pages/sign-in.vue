<template>
  <div>
    <AuthPageTitle title="Sign In"/>
    <AuthInputField placeholder="Enter your email address" label="Email address"/>
    <AuthInputField type="password" placeholder="Enter your full password" label="Password"/>
    <div class="sign-in-options">
      <AuthCheckBox>Remember me</AuthCheckBox>
      <NuxtLink id="sign-in-option-link" class="gilroy-bold" to="/forgot-password">Forgot Password?</NuxtLink>
    </div>
    <AuthSubmitButton>Sign In</AuthSubmitButton>
    <p class="gilroy-bold text-center">Don't have an account?
      <NuxtLink to="/">Create Account</NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  layout: "AuthLayout"
}
</script>

<style scoped>
p {
  color: #102A27;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  margin-top: 20px;
}

p a {
  color: #4FD1C5;
  text-decoration: none;
}

.sign-in-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

#sign-in-option-link {
  color: #4FD1C5;
  letter-spacing: 0.02em;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
}
</style>
