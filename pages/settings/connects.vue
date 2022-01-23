<template>
  <!-- Right Side -->
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
        <span class="tracking-wide">Connect</span>
      </div>
    </div>
    <!-- End of about section -->

    <!-- contact -->
    <div class="bg-white shadow-sm rounded-sm px-2 py-2">
      <div class="w-full px-3 py-2 block bg-white text-gray-700">
        <div class="block text-black font-normal pb-2">
          <p class="text-base text-gray-500">
            Copy and share your contentr link with others
          </p>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2 pb-4">
            <input
              type="email"
              class="
                w-full
                mt-2
                p-4
                text-sm
                border
                rounded-md
                focus:border-blue-400
                focus:outline-none
                focus:ring-1
                focus:ring-blue-600
              "
              placeholder="https://www.nation.so/Joyce-Eboh-0d027018a40d4245bd58a8e6081e90f1"
            />
          </div>
          <div class="pt-2">
            <div
              class="
                w-full
                px-3
                flex
                items-center
                justify-center
                shadow
                form-btn
                focus:shadow-outline
              "
            >
              <button
                class="text-white font-bold py-4 px-2 rounded-lg"
                type="submit"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        <div class="block text-black font-normal pb-2 mt-6">
          <p class="text-base text-gray-500">Invite friends to Contentr</p>
        </div>

        <div class="grid grid-cols-3 gap-4 mb-8">
          <div class="col-span-2 pb-4">
            <input
              type="email"
              class="
                w-full
                mt-2
                p-4
                text-sm
                border
                rounded-md
                focus:border-blue-400
                focus:outline-none
                focus:ring-1
                focus:ring-blue-600
              "
              placeholder="Enter your friend's email or contact link"
            />
          </div>
          <div class="pt-2">
            <div
              class="
                w-full
                px-3
                flex
                items-center
                justify-center
                shadow
                form-btn
                focus:shadow-outline
              "
            >
              <button
                class="text-white font-bold py-4 px-2 rounded-lg"
                type="submit"
              >
                Invite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- End of contact --->
  </div>
</template>

<script>
export default {
  name: 'ConnectS',
  layout: 'SettingsLayout'
}
</script>

<style>
</style>