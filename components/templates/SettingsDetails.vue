<template>
  <div class="w-full bg-white rounded-xl shadow md:w-10/12 md:h-64">
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
        <span class="tracking-wide">Security</span>
      </div>
    </div>
    <!-- End of about section -->

    <!-- Two factor Auth -->

    <!-- 2 -->
    <div class="py-6 px-4 bg-white rounded-sm shadow-sm">
      <TwoFactor />
    </div>

    <!-- End of Two factor Auth --->

    <!-- Change Password -->
    <div class="py-6 px-4 bg-white rounded-sm shadow-sm">
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