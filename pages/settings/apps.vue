<template>
  <!-- Right Side -->
  <div class="w-full md:w-10/12 mx-2 h-64 shadow rounded-xl bg-white">
    <!-- Profile tab -->
    <!-- About Section -->
    <div class="bg-white shadow-sm rounded-xl">
      <div class="border-b-2 flex justify-between">
        <div
          class="
            flex
            w-full
            items-center
            font-semibold
            text-gray-900
            leading-8
            px-4
            py-6
          "
        >
          <span class="tracking-wide">Connected Apps</span>
        </div>
        <div class="w-full px-3 flex items-end justify-end my-6">
          <Button>Connect Apps</Button>
        </div>
      </div>
    </div>
    <!-- End of about section -->

    <!-- connected apps -->
    <div class="bg-white shadow-sm rounded-sm px-4 py-2">
      <div class="w-full block bg-white text-gray-700">
        <div class="block text-gray-500 pb-2">
          <p class="text-base mb-4">Manage and control your connected Apps</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 p-4 gap-4">
        <div class="bg-white shadow-sm rounded-md p-3 border">
          <div class="flex justify-between text-black font-medium group">
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

        <div class="bg-white shadow-sm rounded-md p-3 border">
          <div class="flex justify-between text-black font-medium group">
            <div class="flex bg-transparent">
              <img
                class="h-10 w-10 border mx-auto"
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

        <div class="bg-white shadow-sm rounded-md p-3 border">
          <div class="flex justify-between text-black font-medium group">
            <div class="flex bg-transparent">
              <img class="h-8 w-8 mx-auto" src="~/assets/img/word.png" alt="" />
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

        <div class="bg-white shadow-sm rounded-md p-3 border">
          <div class="flex justify-between text-black font-medium group">
            <div class="flex bg-transparent">
              <img
                class="h-8 w-8 mx-auto"
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

        <div class="bg-white shadow-sm rounded-md p-3 border">
          <div class="flex justify-between text-black font-medium group">
            <div class="flex bg-transparent">
              <img
                class="h-10 w-10 mx-auto"
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

        <div class="bg-white shadow-sm rounded-md p-3 border">
          <div class="flex justify-between text-black font-medium group">
            <div class="flex bg-transparent">
              <img
                class="h-10 w-10 mx-auto"
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
  name: 'ConnectedApp',
  layout: 'SettingsLayout'
}
</script>

<style>
</style>