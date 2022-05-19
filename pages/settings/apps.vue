<template>
  <!-- Right Side -->
  <div class="mx-2 w-full h-64 bg-white rounded-xl shadow md:w-10/12">
    <!-- Profile tab -->
    <!-- About Section -->
    <div class="bg-white rounded-xl shadow-sm">
      <div class="flex flex-col justify-between border-b-2 md:flex-row">
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
          <Button :is-pro-feature="isUnderDevelopment" message="Coming soon"
            >Connect Apps</Button
          >
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

      <Warning
        v-if="isUnderDevelopment"
        href="https://forms.gle/9PG1eC373JZLhFXK7"
        button-text="Give Feedback"
        >App feature is under development</Warning
      >

      <div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-2">
        <div class="p-3 bg-white rounded-md border shadow-sm">
          <div class="group flex justify-between font-medium text-black">
            <div class="flex bg-transparent" style="font-size: 20px">
              <MediumIcon />
            </div>
            <div class="text-right">
              <ToggleOnIcon @click="isOpenApp" />
              <ToggleOffIcon v-if="false" @click="isOpenApp" />
            </div>
          </div>
          <div class="py-10 leading-8">
            <p class="text-xl font-bold text-teal-600">Medium</p>
            <p class="text-base text-gray-500">Where good ideas find you.</p>
          </div>
        </div>

        <div
          v-for="app in apps.items"
          :key="app.id"
          class="p-3 bg-white rounded-md border shadow-sm"
        >
          <div class="group flex justify-between font-medium text-black">
            <div class="flex bg-transparent" style="font-size: 20px">
              <img
                class="mx-auto w-10 h-10"
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--R9qwOwpC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/78hs31fax49uwy6kbxyw.png"
                alt="Dev Community Inc"
              />
            </div>
            <div class="text-right">
              <ToggleOnIcon v-if="app.isActivated" @click="isOpenApp(app.id)" />
              <ToggleOffIcon v-else @click="isOpenApp" />
            </div>
          </div>
          <div class="py-10 leading-8">
            <p class="text-xl font-bold text-teal-600">
              {{ app.name }}
            </p>

            <!-- Dev Community -->
            <p class="text-base text-gray-500">
              {{ app.app.description }}
              <!-- We're a place where coders share, stay up-to-date and grow their
              careers. -->
            </p>
          </div>
        </div>
        <!-- 
        <div class="p-3 bg-white rounded-md border shadow-sm">
          <div class="group flex justify-between font-medium text-black">
            <div class="flex bg-transparent" style="font-size: 20px">
              <img
                class="mx-auto w-10 h-10"
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png?auto=compress"
                alt="Hashnode icon"
              />
            </div>
            <div class="text-right">
              <ToggleOnIcon />
            </div>
          </div>
          <div class="py-10 leading-8">
            <p class="text-xl font-bold text-teal-600">Hashnode</p>
            <p class="text-base text-gray-500">
              Home for tech writers and readers.
            </p>
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
              <ToggleOnIcon />
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
              <ToggleOnIcon />
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
              <ToggleOnIcon />
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
              <ToggleOffIcon />
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
              <ToggleOffIcon />
            </div>
          </div>
          <div class="py-10 leading-8">
            <p class="text-xl font-bold text-gray-500">Google Calender</p>
            <p class="text-base text-gray-500">Make the most of everyday</p>
          </div>
        </div> -->
      </div>
      <!-- End of connected apps--->
    </div>
    <!-- End of profile tab -->

    <lazyAppEdit v-model="appId" />
  </div>
</template>

<script>
import { GET_APPS } from '~/graphql'
export default {
  name: 'ConnectedApp',
  components: {
    ToggleOnIcon: () => import('~/assets/icons/toggle-on.svg?inline'),
    ToggleOffIcon: () => import('~/assets/icons/toggle-off.svg?inline'),
    MediumIcon: () => import('~/assets/icons/medium.svg?inline')
  },
  data: () => ({
    isUnderDevelopment: true,
    appId: null,
    apps: { items: [], total: 0 }
  }),

  apollo: {
    apps: {
      query: GET_APPS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return { items: data.getApps.apps, total: data.getApps.meta.total }
      },
      variables() {
        return {
          size: 30,
          skip: 0,
          filters: { ...this.filters }
        }
      }
    }
  },
  head() {
    return {
      title: 'Settings | Apps'
    }
  },

  methods: {
    isOpenApp(id) {
      this.appId = id
    }
  }
}
</script>

<style>
</style>