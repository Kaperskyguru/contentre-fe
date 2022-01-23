<template>
  <div class="shadow rounded-xl bg-white">
    <!-- Profile Card -->
    <ProfileCard :user="currentUser" />
    <!-- End of profile card -->

    <!-- Text -->
    <div class="px-4 border-t-2 text-center py-6">
      <CustomText :text="currentUser.bio" />
    </div>
    <!-- End of Text -->

    <!-- Link -->
    <ProfileLinks :user="currentUser" />
    <!-- End of link -->

    <!-- Contact details -->
    <ProfileContact :user="currentUser" />
    <!-- End of contact details -->
  </div>
</template>

<script>
import { currentUser } from '../mixins'
export default {
  mixins: [currentUser]
}
</script>

<style>
</style>