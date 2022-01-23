<template>
  <div
    class="
      w-full
      px-3
      py-6
      block
      bg-white
      text-gray-700
      border border-gray-200
      rounded-lg
    "
  >
    <div class="block text-black font-bold pb-2">
      <p class="text-sm mb-4">Change Password</p>
    </div>

    <!-- ====== Cards Section Start -->
    <div class="container">
      <form @submit.prevent="changePassword">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full md:w-1/2 xl:w-1/2 px-4">
            <div>
              <TextField
                v-model="$v.fieldOldPassword.$model"
                :error="getValidationMessage($v.fieldOldPassword)"
                type="password"
                class="w-full text-sm"
                label="Current Password"
                placeholder="..................."
              />
            </div>
            <input
              v-model="$v.honeyPot.$model"
              type="text"
              class="absolute invisible"
            />
            <div class="">
              <TextField
                v-model="$v.fieldPassword.$model"
                type="password"
                class="w-full text-sm"
                label="New Password"
                placeholder="Enter new password"
              />
            </div>

            <div class="">
              <TextField
                v-model="$v.fieldConfirmPassword.$model"
                type="password"
                class="w-full text-sm"
                label="Confirm New Password"
                placeholder="Repeat new password"
              />
            </div>
          </div>
          <div class="w-full md:w-1/2 xl:w-1/2 px-4">
            <div
              class="bg-teal-300 rounded-lg shadow overflow-hidden mb-10 my-8"
            >
              <div class="p-4 sm:p-9 md:p-7 xl:p-9 text-sm">
                <p class="block text-black font-bold">Password Rules</p>
                <p class="text-body-color leading-relaxed mb-7">
                  To create a new password, you need to meet the following
                  requirements:
                </p>
                <ul class="list-disc px-4">
                  <PasswordMeter
                    :correct="
                      $v.fieldPassword.required && $v.fieldPassword.minLength
                    "
                    text="Minimum of 6 characters"
                  />
                  <PasswordMeter
                    :correct="
                      $v.fieldPassword.required && $v.fieldPassword.hasSymbol
                    "
                    text="At least one special character"
                  />
                  <PasswordMeter
                    :correct="!samePassword"
                    text="Can not be the same as the previous"
                  />
                  <PasswordMeter
                    :correct="
                      $v.fieldPassword.required && $v.fieldPassword.hasCapital
                    "
                    text="At least one uppercase letter"
                  />
                  <PasswordMeter
                    :correct="
                      $v.fieldPassword.required && $v.fieldPassword.hasNumber
                    "
                    text="At least one number"
                  />
                  <PasswordMeter
                    :correct="passwordsMatch"
                    text="Passwords should match"
                  />
                </ul>
              </div>
            </div>
          </div>
          <div class="w-full flex items-center justify-center mb-6">
            <Button class="w-1/2" type="submit"> Confirm </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { CHANGE_PASSWORD } from '~/graphql'
import {
  maxLength,
  minLength,
  required,
  hasNumber,
  hasLetter,
  hasSymbol,
  hasCapital
} from '~/plugins/validators'
export default {
  data: () => ({
    fieldPassword: '',
    fieldOldPassword: '',
    fieldConfirmPassword: '',
    honeyPot: '',
    sending: false
  }),

  computed: {
    passwordsMatch() {
      return (
        this.fieldPassword === this.fieldConfirmPassword &&
        this.fieldPassword.length >= 6
      )
    },

    samePassword() {
      return this.fieldOldPassword === this.fieldPassword
    },

    shouldEnableButton() {
      return (
        this.passwordsMatch &&
        this.$v.fieldPassword.minLength &&
        this.$v.fieldPassword.maxLength &&
        this.$v.fieldPassword.hasSymbol &&
        this.$v.fieldPassword.hasCapital &&
        this.$v.fieldPassword.hasNumber &&
        this.fieldPassword
      )
    }
  },

  methods: {
    async changePassword() {
      if (this.honeyPot) return

      if ((await this.isValidationInvalid()) || !this.shouldEnableButton) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: CHANGE_PASSWORD,
          variables: {
            newPassword: this.fieldPassword,
            oldPassword: this.fieldOldPassword
          }
        })
        this.sending = false
        this.$toast.negative('Password changes succcessfully')
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    }
  },

  validations: {
    fieldOldPassword: {
      required
    },
    fieldPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(50),
      hasNumber,
      hasLetter,
      hasSymbol,
      hasCapital
    },
    fieldConfirmPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(50)
    },
    honeyPot: {}
  }
}
</script>

<style>
</style>