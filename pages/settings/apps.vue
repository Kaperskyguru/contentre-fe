<template>
  <!-- Right Side -->
  <div class="mx-2 w-full h-64 bg-white rounded-xl shadow md:w-10/12">
    <!-- Profile tab -->
    <!-- About Section -->
    <div class="bg-white rounded-xl shadow-sm">
      <div class="flex justify-between border-b-2">
        <div
          class="
            flex
            items-center
            py-6
            px-4
            w-full
            font-semibold
            leading-8
            text-gray-900
          "
        >
          <span class="tracking-wide">Connected Apps</span>
        </div>
        <div class="flex justify-end items-end px-3 my-6 w-full">
          <Button>Connect Apps</Button>
        </div>
      </div>
    </div>
    <!-- End of about section -->

    <!-- connected apps -->
    <div class="py-2 px-4 bg-white rounded-sm shadow-sm">
      <div class="block w-full text-gray-700 bg-white">
        <div class="block pb-2 text-gray-500">
          <p class="mb-4 text-base">Manage and control your connected Apps</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-2">
        <div class="p-3 bg-white rounded-md border shadow-sm">
          <div class="group flex justify-between font-medium text-black">
            <div class="flex bg-transparent" style="font-size: 20px">
              <i class="fab fa-medium fa-lg"></i>
            </div>
            <div class="text-right">
              <i class="fas fa-toggle-on fa-lg" style="font-size: 24px"></i>
            </div>
          </div>
          <div class="py-10 leading-8">
            <p class="text-xl font-bold text-teal-600">Medium</p>
            <p class="text-base text-gray-500">Where good ideas find you.</p>
          </div>
        </div>

        <div class="p-3 bg-white rounded-md border shadow-sm">
          <div class="group flex justify-between font-medium text-black">
            <div class="flex bg-transparent">
              <img
                class="mx-auto w-10 h-10 border"
                src="~/assets/img/drive.png"
                alt=""
              />
            </div>
            <div class="text-right">
              <i class="fas fa-toggle-on" style="font-size: 24px"></i>
            </div>
          </div>
          <div class="py-10 leading-8">
            <p class="text-xl font-bold text-teal-600">Google Drive</p>
            <p class="text-base text-gray-500">
              Cloud storage and file synchronization service developed by google
            </p>
          </div>
        </div>

        <div class="p-3 bg-white rounded-md border shadow-sm">
          <div class="group flex justify-between font-medium text-black">
            <div class="flex bg-transparent">
              <img class="mx-auto w-8 h-8" src="~/assets/img/word.png" alt="" />
            </div>
            <div class="text-right">
              <i class="fas fa-toggle-on" style="font-size: 24px"></i>
            </div>
          </div>
          <div class="py-10 leading-8">
            <p class="text-xl font-bold text-teal-600">Microsoft Word</p>
            <p class="text-base text-gray-500">Word Processing Software</p>
          </div>
        </div>

        <div class="p-3 bg-white rounded-md border shadow-sm">
          <div class="group flex justify-between font-medium text-black">
            <div class="flex bg-transparent">
              <img
                class="mx-auto w-8 h-8"
                src="~/assets/img/slack.png"
                alt=""
              />
            </div>
            <div class="text-right">
              <i class="fas fa-toggle-on" style="font-size: 24px"></i>
            </div>
          </div>
          <div class="py-10 leading-8">
            <p class="text-xl font-bold text-teal-600">Slack</p>
            <p class="text-base text-gray-500">Where the future works</p>
          </div>
        </div>

        <div class="p-3 bg-white rounded-md border shadow-sm">
          <div class="group flex justify-between font-medium text-black">
            <div class="flex bg-transparent">
              <img
                class="mx-auto w-10 h-10"
                src="~/assets/img/note.png"
                alt=""
              />
            </div>
            <div class="text-right text-gray-500">
              <i class="fas fa-toggle-off" style="font-size: 24px"></i>
            </div>
          </div>
          <div class="py-10 leading-8">
            <p class="text-xl font-bold text-gray-500">Microsoft One Note</p>
            <p class="text-base text-gray-500">
              The digital note taking app for all your devices
            </p>
          </div>
        </div>

        <div class="p-3 bg-white rounded-md border shadow-sm">
          <div class="group flex justify-between font-medium text-black">
            <div class="flex bg-transparent">
              <img
                class="mx-auto w-10 h-10"
                src="~/assets/img/date.png"
                alt=""
              />
            </div>
            <div class="text-right text-gray-500">
              <i class="fas fa-toggle-off" style="font-size: 24px"></i>
            </div>
          </div>
          <div class="py-10 leading-8">
            <p class="text-xl font-bold text-gray-500">Google Calender</p>
            <p class="text-base text-gray-500">Make the most of everyday</p>
          </div>
        </div>
      </div>
      <!-- End of connected apps--->
    </div>
    <!-- End of profile tab -->
  </div>
</template>

<script>
export default {
  name: 'ConnectedApp'
}
</script>

<style>
</style>