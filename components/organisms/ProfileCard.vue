<template>
  <div class="p-3 text-center bg-white rounded-xl">
    <div class="overflow-hidden mt-4 image">
      <img
        class="mx-auto w-16 h-16 rounded-full"
        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
        alt=""
      />
    </div>
    <h1 class="my-1 mb-2 text-xl font-bold leading-8 text-gray-900">
      {{ user.name || '' }}
    </h1>
    <h3 class="mb-2 leading-6 text-gray-600 font-lg text-semibold">
      {{ user.jobTitle || '' }}
    </h3>

    <!-- social media Icons -->
    <div class="flex justify-center items-center">
      <div class="flex justify-center items-center space-x-4">
        <!--Whatsapp Button -->

        <button
          class="
            w-8
            h-8
            hover:bg-green-600 hover:text-white
            bg-white
            rounded-full
            duration-500
            border-2 border-green-600
            text-xl text-green-500
          "
        >
          <i class="fab fa-whatsapp"></i>
        </button>

        <!--Linkedin Button-->

        <button
          class="
            w-8
            h-8
            hover:bg-blue-500 hover:text-white
            bg-teal-200
            rounded-full
            duration-500
            text-xl text-blue-600
            border-2 border-blue-500
          "
        >
          <i class="fab fa-linkedin-in"></i>
        </button>

        <!--Twitter Button -->

        <button
          class="
            w-8
            h-8
            hover:bg-blue-400 hover:text-white
            bg-teal-300
            rounded-full
            duration-500
            text-xl text-blue-600
            border-2 border-blue-400
          "
        >
          <i class="fab fa-twitter"></i>
        </button>

        <!--İnstagram Button -->

        <button
          class="
            w-8
            h-8
            hover:text-white
            hover:from-indigo-600
            hover:via-pink-600
            hover:to-yellow-500
            rounded-full
            border-2
            hover:border-0
            border-pink-500
            duration-500
            text-xl text-pink-600
            bg-white bg-gradient-to-b
            min-w-wull
          "
        >
          <i class="fab fa-instagram"></i>
        </button>

        <!--Facebook Button -->

        <button
          class="
            sticky
            w-8
            h-8
            hover:bg-blue-600 hover:text-white
            bg-white
            rounded-full
            duration-500
            text-xl text-blue-600
            border-2 border-blue-600
          "
        >
          <i class="fab fa-facebook-f"></i>
        </button>

        <!--Snapchat Button-->

        <button
          class="
            w-8
            h-8
            hover:bg-yellow-300 hover:text-white
            bg-white
            rounded-full
            duration-500
            text-xl text-yellow-300
            border-2 border-yellow-300
          "
        >
          <i class="fab fa-snapchat-ghost"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: [Array, Object],
      default: () => {}
    }
  }
}
</script>

<style>
</style>