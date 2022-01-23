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
        <span class="tracking-wide">Delete Account</span>
      </div>
    </div>
    <!-- End of about section -->

    <!-- contact -->
    <div class="bg-white shadow-sm rounded-sm px-2 py-2">
      <div class="w-full px-3 py-2 block bg-white text-gray-700">
        <div class="col-span-2 pb-4">
          <TextField
            :rows="10"
            type="email"
            class="w-full text-sm"
            placeholder="|"
            label="Please tell us why you wish to delete your account"
          />
        </div>

        <div class="block text-black font-normal pb-2">
          <p class="text-base text-black">Enter your password</p>
        </div>

        <div class="col-span-2 pb-">
          <TextField
            type="password"
            class="w-full text-sm"
            placeholder="Enter your password"
          />
        </div>
      </div>

      <div class="w-full px-3 text-center my-6">
        <p>Are you sure you want to delete your Account?</p>
        <p>
          All your files and report on Contentre will be unretrievable if you
          do.
        </p>
      </div>

      <div class="w-full px-3 flex items-center justify-center my-6">
        <button
          class="
            shadow
            bg-red-500
            w-1/2
            focus:shadow-outline
            text-white
            font-bold
            py-4
            px-6
            rounded-lg
          "
          type="submit"
        >
          Delete my Account
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountSettings',
  layout: 'SettingsLayout'
}
</script>

<style>
</style>