<template>
  <div class="mx-2 w-full h-64 bg-white rounded-xl shadow md:w-10/12">
    <!-- Profile tab -->
    <!-- About Section -->
    <div class="bg-white rounded-xl shadow-sm">
      <div
        class="
          flex
          items-center
          py-6
          px-4
          space-x-2
          font-semibold
          leading-8
          text-gray-900
          border-b-2
        "
      >
        <span class="tracking-wide">Delete Account</span>
      </div>
    </div>
    <!-- End of about section -->

    <!-- contact -->
    <div class="p-2 bg-white rounded-sm shadow-sm">
      <form @submit.prevent="onClickConfirm">
        <div class="block py-2 px-3 w-full text-gray-700 bg-white">
          <div class="col-span-2 pb-4">
            <TextField
              v-model="$v.fieldFeedback.$model"
              :rows="10"
              class="w-full text-sm"
              placeholder="|"
              :show-border="true"
              label="Please tell us why you wish to delete your account"
              :error="getValidationMessage($v.fieldFeedback)"
            />
          </div>

          <div class="block pb-2 font-normal text-black">
            <p class="text-base text-black">Enter your password</p>
          </div>

          <div class="col-span-2 pb-">
            <TextField
              v-model="$v.fieldPassword.$model"
              type="password"
              class="w-full text-sm"
              placeholder="Enter your password"
              :error="getValidationMessage($v.fieldPassword)"
            />
          </div>
        </div>

        <div class="px-3 my-6 w-full text-center">
          <p>Are you sure you want to delete your Account?</p>
          <p>
            All your files and report on Contentre will be unretrievable if you
            do.
          </p>
        </div>

        <div class="flex justify-center items-center px-3 my-6 w-full">
          <button
            class="
              py-4
              px-6
              w-1/2
              font-bold
              text-white
              bg-red-500
              rounded-lg
              shadow
              focus:shadow-outline
            "
            type="submit"
          >
            Delete my Account
          </button>
        </div>
      </form>
    </div>

    <Dialog
      v-model="isConfirmModalVisible"
      primary-text="Confirm"
      secondary-text="Cancel"
      @answer="deleteAccount"
    >
      <template #icon>
        <IconInformationCircle class="w-20 h-20" />
      </template>
      <p>Are you sure you want to delete your account?</p>
    </Dialog>
  </div>
</template>

<script>
import { DELETE_USER, GET_CURRENT_USER } from '~/graphql'
import { required } from '~/plugins/validators'
export default {
  name: 'AccountSettings',

  components: {
    IconInformationCircle: () =>
      import('~/assets/icons/information-circle.svg?inline')
  },

  data: () => ({
    fieldPassword: '',
    fieldFeedback: '',
    isConfirmModalVisible: false
  }),

  validations: {
    fieldFeedback: {},
    fieldPassword: {
      required
    },
    honeyPot: {}
  },
  methods: {
    async onClickConfirm() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.isConfirmModalVisible = true
    },
    async deleteAccount(shouldDelete) {
      if (this.honeyPot || !shouldDelete) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: DELETE_USER,
          variables: {
            oldPassword: this.fieldPassword,
            feedback: this.fieldFeedback
          },
          update: (cache, { data: { updateUser } }) => {
            cache.writeQuery({
              query: GET_CURRENT_USER,
              data: { getCurrentUser: updateUser }
            })
          }
        })

        this.$toast.positive('User deleted successfully')
        this.sending = false
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