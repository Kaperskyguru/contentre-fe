<template>
  <div>
    <PageTitle title="Sign In" />
    <InputField placeholder="Enter your email address" label="Email address" />
    <InputField
      type="password"
      placeholder="Enter your full password"
      label="Password"
    />
    <div class="sign-in-options">
      <CheckBox>Remember me</CheckBox>
      <NuxtLink
        id="sign-in-option-link"
        class="gilroy-bold"
        to="/forgot-password"
        >Forgot Password?</NuxtLink
      >
    </div>
    <SubmitButton>Sign In</SubmitButton>
    <p class="gilroy-bold text-center">
      Don't have an account?
      <NuxtLink to="/">Create Account</NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  layout: 'AuthLayout',
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
  justify-content: space-between;
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
