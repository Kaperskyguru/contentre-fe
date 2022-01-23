<template>
  <form class="w-full" @submit.prevent="handleSubmission">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <TextField
          v-model="$v.fieldFirstname.$model"
          type="text"
          class="w-full text-sm"
          label="First Name"
          placeholder="Enter Firstname"
          :error="getValidationMessage($v.fieldFirstname)"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <TextField
          v-model="$v.fieldLastname.$model"
          type="text"
          class="w-full text-sm 0"
          label="Last Name"
          placeholder="Enter Lastname"
          :error="getValidationMessage($v.fieldLastname)"
        />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <TextField
          v-model="$v.fieldJobTitle.$model"
          type="text"
          class="w-full text-sm"
          label="Job Title"
          placeholder="Content Creator | Article Writer"
          :error="getValidationMessage($v.fieldJobTitle)"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
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
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <TextField
          v-model="$v.fieldEmail.$model"
          type="email"
          class="w-full text-sm"
          label="Email Address"
          placeholder="Jane"
          :error="getValidationMessage($v.fieldEmail)"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
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

    <div class="flex flex-wrap -mx-3">
      <div class="w-full px-3">
        <TextField
          v-model="$v.fieldBio.$model"
          :rows="10"
          label="Bio"
          placeholder="Minimum of 600 words"
          :error="getValidationMessage($v.fieldBio)"
        />
      </div>
    </div>
    <div class="w-full flex items-center justify-center mb-6">
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
      fieldFirstname: '',
      fieldLastname: '',
      fieldBio: '',
      fieldHomeAddress: '',
      fieldPhoneNumber: '',
      fieldJobTitle: '',
      sending: false
    }
  },

  validations: {
    fieldEmail: { email },
    fieldFirstname: {
      minLength: minLength(2),
      maxLength: maxLength(35),
      hasLetter
    },
    fieldLastname: {
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
        firstname: this.fieldPhoneNumber || undefined,
        lastname: this.fieldLastname || undefined,
        jobTitle: this.fieldJobTitle || undefined,
        email: this.fieldEmail || undefined,
        homeAddress: this.fieldHomeAddress || undefined,
        bio: this.fieldBio || undefined,
        phoneNumber: this.fieldPhoneNumber || undefined
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
        console.log(this.currentUser.emailConfirmed)
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    }
  }
}
</script>

<style>
</style>