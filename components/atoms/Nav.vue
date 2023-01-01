<template>
  <div class="flex justify-between items-center p-2">
    <UserDropdown :user="currentUser" @logout="$emit('logout')" />
  </div>
</template>

<script>
import { currentUser } from '~/components/mixins'
export default {
  name: 'DashboardNav',

  mixins: [currentUser],

  computed: {
    isProfileCompleted() {
      return (
        this.currentUser?.bio &&
        this.currentUser?.jobTitle &&
        this.currentUser?.avatarURL
      )
    }
  }
}
</script>

<style>
</style>
