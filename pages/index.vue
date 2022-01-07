<template>
  <div class="p-5">
    <PageTitle>Create Account</PageTitle>
    <form @submit.prevent="handleSubmission">
      <TextField
        v-model="username"
        required label="Choose your portfolio address"
        placeholder="www.contentr.me/ username">
        <template #error>
          <div>
            <small
              v-if="!usernameIsValid && username.length >= 1"
              class="font-bold font-gilroy text-red-600 text-xs">Please enter a valid username. A valid username
              can only contain letters, dashes and numbers. It must also not begin or end with a dash.</small>
          </div>
        </template>
      </TextField>
      <TextField v-model="full_name" required placeholder="Enter your full name" label="Full name">
        <template #error>
          <div>
            <small
              v-if="!fullNameIsValid && full_name.length >= 1"
              class="font-bold font-gilroy text-red-600 text-xs">Please enter your full name</small>
          </div>
        </template>
      </TextField>
      <TextField v-model="email" required type="email" label="Email Address" placeholder="Enter your email address">
        <template #error>
          <div>
            <small
              v-if="!validator.isValid(email) && email.length >= 1"
              class="font-bold font-gilroy text-red-600 text-xs">Please enter a valid email address</small>
          </div>
        </template>
      </TextField>
      <TextField
        v-model="password"
        required minlength="6" type="password" placeholder="Create a strong password"
        label="Create password"></TextField>
      <TextField
        v-model="password_again"
        required minlength="6" type="password" placeholder="Re-enter your password"
        label="Re-enter password"></TextField>
      <PasswordMeter :correct="passwordLengthOK" text="Password should be at least 6 characters long"/>
      <PasswordMeter
        text="Password should contain a special character"
        :correct="passwordContainsSpecialChars"/>
      <PasswordMeter :correct="passwordHasCapital" text="Password should have an uppercase letter"/>
      <PasswordMeter :correct="passwordsMatch" text="Passwords should match"/>
      <AuthButton :disabled="!shouldEnableButton">Create Account</AuthButton>
    </form>
    <p class="font-gilroy font-bold text-center text-body-text-color text-base">Already have an account?
      <NuxtLink class="text-primary-teal" to="sign-in">Sign In</NuxtLink>
    </p>
  </div>
</template>

<script>
const EmailValidator = require('commons-validator-js').EmailValidator;
const validator = new EmailValidator();
export default {
  name: "IndexPage",
  layout: 'AuthLayout',
  data: () => ({
    validator
  }),
  computed: {
    fullNameIsValid() {
      const names = this.full_name.split(' ')
      return names.length >= 2 && this.full_name.length >= 1 && names.every(item => item.length >= 1)
    },
    usernameIsValid() {
      return /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(this.username)
    },
    passwordContainsSpecialChars() {
      return /[!-/:-@[-`{-~]/.test(this.password) && this.password.length >= 1
    },
    passwordLengthOK() {
      return this.password.length >= 6;
    },
    passwordsMatch() {
      return this.password === this.password_again && this.password.length >= 6
    },
    passwordHasCapital() {
      let hasCapital = false;
      for (let i = 0; i < this.password.length; i++) {
        if (this.password[i].toUpperCase() === this.password[i] && /[A-Za-z]/.test(this.password[i])) {
          hasCapital = true;
        }
      }
      return hasCapital;
    },
    username: {
      get() {
        return this.$store.state.registration.username;
      },
      set(value) {
        this.$store.commit("registration/updateUserName", value)
      }
    },
    full_name: {
      get() {
        return this.$store.state.registration.full_name;
      },
      set(value) {
        this.$store.commit("registration/updateFullName", value);
      }
    },
    email: {
      get() {
        return this.$store.state.registration.email;
      },
      set(value) {
        this.$store.commit("registration/updateEmail", value);
      }
    },
    password: {
      get() {
        return this.$store.state.registration.password;
      },
      set(value) {
        this.$store.commit("registration/updatePassword", value);
      }
    },
    password_again: {
      get() {
        return this.$store.state.registration.password_again;
      },
      set(value) {
        this.$store.commit("registration/updatePasswordAgain", value);
      }
    },
    shouldEnableButton() {
      return this.passwordsMatch && this.passwordLengthOK && this.passwordContainsSpecialChars && this.passwordHasCapital
        && this.username && this.email && this.full_name && this.password && validator.isValid(this.email) && this.usernameIsValid && this.fullNameIsValid
    }
  },
  methods: {
    handleSubmission() {
      this.$store.dispatch("registration/registerUser")
    },

  }
}
</script>

<style scoped>

</style>
