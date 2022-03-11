<template>
  <form class="w-full" @submit.prevent="handleSubmission">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="px-3 w-full">
        <TextField
          v-model="$v.fieldName.$model"
          type="text"
          class="w-full text-sm"
          label="Full Name"
          placeholder="Enter full name"
          :error="getValidationMessage($v.fieldName)"
        />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="px-3 mb-6 w-full md:mb-0 md:w-1/2">
        <TextField
          v-model="$v.fieldJobTitle.$model"
          type="text"
          class="w-full text-sm"
          label="Job Title"
          placeholder="Content Creator | Article Writer"
          :error="getValidationMessage($v.fieldJobTitle)"
        />
      </div>
      <div class="px-3 w-full md:w-1/2">
        <TextField
          v-model="$v.fieldHomeAddress.$model"
          type="text"
          class="w-full text-sm"
          placeholder="16, Challenge, Ibadan - Oyo State, Nigeria"
          label="Home Address"
          :error="getValidationMessage($v.fieldHomeAddress)"
        />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="px-3 mb-6 w-full md:mb-0 md:w-1/2">
        <TextField
          v-model="$v.fieldEmail.$model"
          type="email"
          class="w-full text-sm"
          label="Email Address"
          placeholder="Jane"
          :error="getValidationMessage($v.fieldEmail)"
        />
      </div>
      <div class="px-3 w-full md:w-1/2">
        <TextField
          v-model="$v.fieldPhoneNumber.$model"
          type="text"
          class="w-full text-sm"
          label="Phone Number"
          placeholder="Enter phone number"
          :error="getValidationMessage($v.fieldPhoneNumber)"
        />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="px-3 w-full">
        <TextField
          v-model="$v.fieldBio.$model"
          :rows="10"
          label="Bio"
          placeholder="Minimum of 600 words"
          :error="getValidationMessage($v.fieldBio)"
        />
      </div>
    </div>
    <div class="flex justify-center items-center mb-6 w-full">
      <Button class="w-1/2" type="submit"> Save </Button>
    </div>
  </form>
</template>

<script>
import { currentUser } from '../mixins'
import { GET_CURRENT_USER, SEND_EMAIL_CODE, UPDATE_USER } from '~/graphql'
import {
  email,
  maxLength,
  minLength,
  hasLetter,
  hasNumber
} from '~/plugins/validators'
export default {
  mixins: [currentUser],
  data() {
    return {
      fieldEmail: '',
      fieldName: '',
      fieldBio: '',
      fieldHomeAddress: '',
      fieldPhoneNumber: '',
      fieldJobTitle: '',
      sending: false
    }
  },

  validations: {
    fieldEmail: { email },
    fieldName: {
      minLength: minLength(2),
      maxLength: maxLength(35),
      hasLetter
    },

    fieldBio: {
      hasLetter
    },
    fieldHomeAddress: {
      hasLetter
    },
    fieldPhoneNumber: {
      hasNumber
    },
    fieldJobTitle: {
      hasLetter
    },
    honeyPot: {}
  },

  methods: {
    async handleSubmission() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      const input = {
        name: this.fieldName || undefined,
        jobTitle: this.fieldJobTitle || undefined,
        email: this.fieldEmail || undefined,
        homeAddress: this.fieldHomeAddress || undefined,
        bio: this.fieldBio || undefined,
        phoneNumber: this.fieldPhoneNumber || undefined
      }

      if (this.isEmpty(input)) {
        this.$toast.negative('Enter at least one field')
        this.sending = false
        return
      }

      try {
        await this.$apollo.mutate({
          mutation: UPDATE_USER,
          variables: {
            input: {
              ...input
            }
          },
          update: (cache, { data: { updateUser } }) => {
            cache.writeQuery({
              query: GET_CURRENT_USER,
              data: { getCurrentUser: updateUser }
            })
          }
        })

        if (!this.currentUser.emailConfirmed) {
          await this.$apollo.mutate({
            mutation: SEND_EMAIL_CODE,
            variables: {
              email: this.currentUser.email
            }
          })
        }

        this.$toast.positive('User updated successfully')
        this.sending = false
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    },
    isEmpty(data) {
      return !Object.values(data).some((el) => el !== undefined)
    }
  }
}
</script>

<style>
</style>