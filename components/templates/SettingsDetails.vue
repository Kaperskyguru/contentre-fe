<template>
  <div class="w-full md:w-10/12 mx-2 h-64 shadow rounded-xl bg-white">
    <!-- Profile tab -->
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
        <span class="tracking-wide">Security</span>
      </div>
    </div>
    <!-- End of about section -->

    <!-- Two factor Auth -->

    <!-- 2 -->
    <div class="bg-white shadow-sm rounded-sm px-4 py-6">
      <TwoFactor />
    </div>

    <!-- End of Two factor Auth --->

    <!-- Change Password -->
    <div class="bg-white shadow-sm rounded-sm px-4 py-6">
      <!-- 3 -->
      <ChangePassword />
    </div>

    <!-- End of Change Password -->
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>