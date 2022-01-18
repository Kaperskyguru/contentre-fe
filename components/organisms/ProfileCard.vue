<template>
  <div class="bg-white p-3 rounded-xl text-center">
    <div class="image overflow-hidden mt-4">
      <img
        class="h-16 w-16 mx-auto rounded-full"
        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
        alt=""
      />
    </div>
    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1 mb-2">
      Jane Smith
    </h1>
    <h3 class="text-gray-600 font-lg text-semibold leading-6 mb-2">
      Content Creator | Article Writer
    </h3>

    <!-- social media Icons -->
    <div class="flex items-center justify-center">
      <div class="flex items-center justify-center space-x-4">
        <!--Whatsapp Button -->

        <button
          class="
            bg-white
            duration-500
            w-8
            h-8
            border-2
            rounded-full
            border-green-600
            text-xl text-green-500
            hover:bg-green-600 hover:text-white
          "
        >
          <i class="fab fa-whatsapp"></i>
        </button>

        <!--Linkedin Button-->

        <button
          class="
            bg-teal-200
            border-2
            w-8
            h-8
            rounded-full
            duration-500
            text-blue-600
            border-blue-500
            hover:bg-blue-500 hover:text-white
            text-xl
          "
        >
          <i class="fab fa-linkedin-in"></i>
        </button>

        <!--Twitter Button -->

        <button
          class="
            bg-teal-300
            border-2
            w-8
            h-8
            rounded-full
            duration-500
            text-blue-600
            border-blue-400
            hover:bg-blue-400 hover:text-white
            text-xl
          "
        >
          <i class="fab fa-twitter"></i>
        </button>

        <!--İnstagram Button -->

        <button
          class="
            border-2
            hover:border-0
            border-pink-500
            bg-gradient-to-b
            text-xl
            hover:from-indigo-600 hover:via-pink-600 hover:to-yellow-500
            min-w-wull
            hover:text-white
            bg-white
            text-pink-600
            w-8
            h-8
            rounded-full
            duration-500
          "
        >
          <i class="fab fa-instagram"></i>
        </button>

        <!--Facebook Button -->

        <button
          class="
            bg-white
            sticky
            duration-500
            border-2 border-blue-600
            w-8
            h-8
            text-xl
            rounded-full
            hover:bg-blue-600 hover:text-white
            text-blue-600
          "
        >
          <i class="fab fa-facebook-f"></i>
        </button>

        <!--Snapchat Button-->

        <button
          class="
            bg-white
            border-2
            w-8
            h-8
            rounded-full
            duration-500
            text-yellow-300
            border-yellow-300
            hover:bg-yellow-300 hover:text-white
            text-xl
          "
        >
          <i class="fab fa-snapchat-ghost"></i>
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