<template>
  <div class="bg-white rounded-xl shadow">
    <!-- Profile Card -->
    <ProfileCard :user="currentUser" />
    <!-- End of profile card -->

    <!-- Text -->
    <div class="py-6 px-4 text-center border-t-2">
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
import { currentUser } from '~/components/mixins'
export default {
  mixins: [currentUser]
}
</script>

<style>
</style>