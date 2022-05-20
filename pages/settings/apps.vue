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
          <Button message="Coming soon" @click.prevent="onOpenApps"
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
        <div
          v-for="app in apps.items"
          :key="app.id"
          class="p-3 bg-white rounded-md border shadow-sm"
        >
          <div class="group flex justify-between font-medium text-black">
            <div class="flex bg-transparent" style="font-size: 20px">
              <MediumIcon />
            </div>
            <div class="text-right">
              <ToggleOnIcon v-if="app.isActivated" @click="isOpenApp(app.id)" />
              <ToggleOffIcon v-else @click="isOpenApp(app.id)" />
            </div>
          </div>
          <div class="py-10 leading-8">
            <p class="text-xl font-bold text-teal-600">
              {{ app.name }}
            </p>
            <p class="text-base text-gray-500">
              {{ app.app.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <lazyAppEdit v-model="appId" />

    <Dialog v-model="isAppModalVisible" :is-large="true" title="Apps">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full h-4/5 text-gray-700 bg-white">
          <Apps />
        </div>
      </div>
    </Dialog>
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
    isAppModalVisible: false,
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
    onOpenApps() {
      this.isAppModalVisible = true
    },
    isOpenApp(id) {
      this.appId = id
    }
  }
}
</script>

<style>
</style>