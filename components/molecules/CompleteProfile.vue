<template>
  <div class="p-3 bg-white rounded-xl">
    <div class="p-8 bg-teal-500 rounded-lg shadow info-card">
      <div class="flex items-center">
        <div
          class="
            inline-flex
            shrink-0
            items-center
            mt-4
            mr-4
            w-16
            h-16
            text-white
            bg-transparent
          "
        >
          <img
            v-if="!isProfileCompleted"
            class="mx-auto w-16 h-16 rounded-full"
            src="~/assets/img/loader.png"
            alt=""
          />
        </div>
        <div class="pt-4">
          <span class="block font-bold text-white">Profile Information</span>
          <span class="block pt-2 text-sm text-white"
            >Check your profile page to complete your profile</span
          >
        </div>
      </div>
      <div class="flex justify-center items-center mt-4 w-full">
        <Hyperlink
          :to="isProfileCompleted ? '' : '/profile'"
          class="
            py-2
            px-6
            w-full
            font-bold
            text-center text-teal-300
            bg-white
            rounded
            shadow
          "
        >
          {{ isProfileCompleted ? 'Profile Completed' : 'Complete Profile' }}
        </Hyperlink>
      </div>
    </div>
  </div>
</template>

<script>
import { currentUser } from '~/components/mixins'
export default {
  mixins: [currentUser],
  computed: {
    isProfileCompleted() {
      let percent = 0
      if (this.currentUser?.totalContents > 0) percent += 10
      if (this.currentUser?.bio) percent += 10
      if (this.currentUser?.jobTitle) percent += 10
      if (this.currentUser?.avatarURL) percent += 10
      if (this.currentUser?.homeAddress) percent += 10
      if (this.currentUser?.phoneNumber) percent += 10
      return percent > 50
    }
  }
}
</script>

<style>
</style>