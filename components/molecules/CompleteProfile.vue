<template>
  <div class="bg-white p-3 rounded-xl">
    <div class="info-card p-8 bg-teal-500 shadow rounded-lg">
      <div class="flex items-center">
        <div
          class="
            inline-flex
            flex-shrink-0
            items-center
            mt-4
            h-16
            w-16
            text-white
            bg-transparent
            mr-4
          "
        >
          <img
            class="h-16 w-16 rounded-full mx-auto"
            src="~/assets/img/loader.png"
            alt=""
          />
        </div>
        <div class="pt-4">
          <span class="block text-white font-bold pro-info"
            >Profile Information</span
          >
          <span class="block text-white text-sm pro-check pt-2"
            >Check your profile page to complete your profile</span
          >
        </div>
      </div>
      <div class="w-full flex items-center justify-center mt-4">
        <button
          class="
            shadow
            bg-white
            w-full
            focus:shadow-outline
            text-teal-300
            font-bold
            py-2
            px-6
            rounded
          "
          type="submit"
        >
          Complete Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>