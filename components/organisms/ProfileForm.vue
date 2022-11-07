<template>
  <form id="form" ref="form" class="w-full" @submit.prevent="handleSubmission">
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
          :is-onboarding="isOnboarding"
          placeholder="Content Creator | Article Writer"
          :error="getValidationMessage($v.fieldJobTitle)"
          @focus="isOnboarding = false"
        />
      </div>
      <div class="px-3 w-full md:w-1/2">
        <TextField
          v-model="$v.fieldHomeAddress.$model"
          type="text"
          class="w-full text-sm"
          placeholder="Enter your address"
          label="Home Address"
          :is-onboarding="isOnboarding"
          :error="getValidationMessage($v.fieldHomeAddress)"
          @focus="isOnboarding = false"
        />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="px-3 w-full">
        <TextField
          v-model="$v.fieldPhoneNumber.$model"
          type="text"
          class="w-full text-sm"
          label="Phone Number"
          :is-onboarding="isOnboarding"
          placeholder="Enter phone number"
          :error="getValidationMessage($v.fieldPhoneNumber)"
          @focus="isOnboarding = false"
        />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="px-3 w-full">
        <TextField
          type="file"
          accept=".jpeg,.jpg,.png,image/jpeg,image/png"
          class="w-full text-sm"
          label="Profile image"
          :is-onboarding="isOnboarding"
          @change="selectFile"
        />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="px-3 w-full">
        <TextField
          v-model="$v.fieldBio.$model"
          :rows="10"
          label="Bio"
          :is-editor="true"
          :is-onboarding="isOnboarding"
          placeholder="Minimum of 600 words"
          :error="getValidationMessage($v.fieldBio)"
          @focus="isOnboarding = false"
        />
      </div>
    </div>
    <div class="flex justify-center items-center mb-6 w-full">
      <Button id="btn" class="w-1/2" :waiting="sending" type="submit">
        Save
      </Button>
    </div>
  </form>
</template>

<script>
import { currentUser } from '~/components/mixins'
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
      fieldImage: '',
      fieldHomeAddress: '',
      fieldPhoneNumber: '',
      fieldJobTitle: '',
      sending: false,
      cloudinary: null,
      imageBlob: null,
      isOnboarding: false
    }
  },

  validations: {
    fieldEmail: { email },
    fieldImage: {},
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

  mounted() {
    const callbackPaths = ['/profile#onboarding']
    if (callbackPaths.includes(this.$route.fullPath)) {
      this.isOnboarding = true
    }

    this.fieldName = this.currentUser?.name ?? ''
    // this.fieldEmail = this.currentUser?.email ?? ''
    // this.fieldBio = this.currentUser?.bio ?? ''
    this.fieldPhoneNumber = this.currentUser?.phoneNumber ?? ''
    this.fieldJobTitle = this.currentUser?.jobTitle ?? ''
    this.fieldHomeAddress = this.currentUser?.homeAddress ?? ''
  },

  methods: {
    async selectFile(e) {
      const file = e.target.files[0]

      /* Make sure file exists */
      if (!file) return

      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(f)
        })

      /* Read data */
      this.imageBlob = await readData(file)
    },
    async handleSubmission() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      if (this.imageBlob) {
        this.cloudinary = await this.$cloudinary.upload(this.imageBlob, {
          folder: 'contentre/profiles/' + this.currentUser.id,
          upload_preset: 'yijnms7k'
        })
      }

      const input = {
        name: this.fieldName || undefined,
        jobTitle: this.fieldJobTitle || undefined,
        // email: this.fieldEmail || undefined,
        homeAddress: this.fieldHomeAddress || undefined,
        bio: this.fieldBio || undefined,
        phoneNumber: this.fieldPhoneNumber || undefined,
        avatarURL: this.cloudinary?.secure_url || undefined
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
            input
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

        const callbackPaths = ['/profile#onboarding']
        if (callbackPaths.includes(this.$route.fullPath)) {
          this.$router.push('/')
        }
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    },

    uploadImage() {},
    isEmpty(data) {
      return !Object.values(data).some((el) => el !== undefined)
    }
  }
}
</script>

<style>
</style>