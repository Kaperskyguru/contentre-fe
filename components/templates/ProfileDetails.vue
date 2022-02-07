<template>
  <div class="bg-white rounded-xl shadow">
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
        <span class="tracking-wide">Profile Details</span>
      </div>
    </div>
    <!-- End of about section -->

    <!-- Personal Details -->
    <div class="py-6 px-4 bg-white rounded-sm border-b-2 shadow-sm">
      <div
        class="
          block
          py-6
          px-3
          text-gray-700
          bg-white
          rounded-lg
          border border-gray-200
        "
      >
        <div class="pb-4 space-x-3 text-sm font-normal leading-8 text-gray-900">
          <span>Personal Details</span>
        </div>

        <!-- FORM -->

        <ProfileForm />
      </div>

      <!-- DIV 2 -->
      <div class="my-8 social media">
        <div class="pb-4 space-x-3 text-sm font-normal leading-8 text-gray-900">
          <span>Social Links</span>
        </div>

        <SocialLinks />
      </div>
    </div>

    <!-- End of Personal Details -->
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>