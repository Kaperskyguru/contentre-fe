<template>
  <div class="shadow rounded-xl bg-white">
    <!-- About Section -->
    <div class="bg-white shadow-sm rounded-xl">
      <div
        class="
          flex
          items-center
          space-x-2
          font-semibold
          text-gray-900
          leading-8
          px-4
          border-b-2
          py-6
        "
      >
        <span class="tracking-wide">Profile Details</span>
      </div>
    </div>
    <!-- End of about section -->

    <!-- Personal Details -->
    <div class="bg-white shadow-sm rounded-sm px-4 border-b-2 py-6">
      <div class="space-x-3 font-normal text-gray-900 text-sm leading-8 pb-4">
        <span>Personal Details</span>
      </div>

      <!-- FORM -->

      <ProfileForm />

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
        <div class="space-x-3 font-normal text-gray-900 text-sm leading-8 pb-4">
          <div
            class="md:flex md:items-center block text-black font-bold pl-2 pb-4"
          >
            <span class="text-sm"> Profile Links </span>
            <span class="pl-2"> <i class="fas fa-plus"></i></span>
          </div>
        </div>

        <div
          class="flex justify-between w-full px-3 block bg-white text-gray-700"
        >
          <!-- FORM 2 -->
          <ProfileLinkForm />
        </div>
      </div>

      <!-- DIV 2 -->
      <div class="social media my-8">
        <div class="space-x-3 font-normal text-gray-900 text-sm leading-8 pb-4">
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