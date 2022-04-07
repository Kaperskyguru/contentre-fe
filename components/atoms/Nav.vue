<template>
  <div class="flex justify-between p-3">
    <div class="p-0 sm:p-2 md:hidden lg:hidden aside-header">
      <Hyperlink to="/" class="flex items-center font-bold">
        <img src="/logo.png" class="mt-2 img-fluid" alt="contentre logo" />
      </Hyperlink>
    </div>
    <div class="flex justify-center items-center">
      <button
        id="toggleSidebarMobile"
        aria-expanded="true"
        aria-controls="sidebar"
        class="
          p-2
          mr-2
          text-gray-600
          hover:text-gray-900 hover:bg-gray-100
          focus:bg-gray-100
          rounded
          focus:ring-2 focus:ring-gray-100
          cursor-pointer
          lg:hidden
        "
        @click="$emit('onToggleMenu')"
      >
        <svg
          id="toggleSidebarMobileHamburger"
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <svg
          id="toggleSidebarMobileClose"
          class="hidden w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>

    <div class="justify-items-start">
      <UserDropdown :user="currentUser" @logout="$emit('logout')" />
    </div>
  </div>
</template>

<script>
import { currentUser } from '~/components/mixins'
export default {
  name: 'DashboardNav',

  mixins: [currentUser]
}
</script>

<style>
</style>
