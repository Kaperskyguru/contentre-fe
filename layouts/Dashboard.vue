<template>
  <div class="block overflow-hidden h-screen md:flex">
    <!-- <div class="flex flex-1"> -->
    <div class="hidden z-20 flex-none sm:w-0 md:block md:w-64">
      <Aside @onCollapse="collapse" />
    </div>

    <!-- <section class=""> -->
    <header class="fixed z-10 mb-5 bg-white navside-bs">
      <nav class="pr-1 md:pr-14">
        <Nav @logout="onLogout" @onToggleMenu="showMenu" />
      </nav>
    </header>

    <nav id="mobile" class="w-full md:hidden" :class="{ 'mt-16': isMenuShown }">
      <div v-if="isMenuShown" class="pt-5">
        <MobileMenu
          v-click-outside="onClickOutside"
          @onMenuClick="onClickOutside"
        />
      </div>
    </nav>

    <Nuxt
      class="flex-1"
      :class="{ 'mt-0': isMenuShown, 'mt-16': !isMenuShown }"
    />

    <Toast />
    <!-- </section> -->
  </div>
  <!-- </div> -->
</template>

<script>
import vClickOutside from 'v-click-outside'
import base from './base.vue'
export default {
  name: 'DashboardNav',

  directives: {
    clickOutside: vClickOutside.directive
  },

  extends: base,

  middleware: [
    'isAuthenticated',
    'isEmailConfirmed'
    // 'isPhoneConfirmed',
    // 'hasActiveCompany'
  ],
  data: () => ({
    isSidebarCollapsed: false,
    isMenuShown: false
  }),
  methods: {
    collapse(c) {
      this.isSidebarCollapsed = c
    },

    onClickOutside() {
      // this.isMenuShown = false
      this.closeDropdown()
    },

    closeDropdown() {
      this.isMenuShown = false
      document.removeEventListener('keyup', this.onKeyUp)
    },

    onKeyUp(event) {
      const keyCode = event.keyCode || event.which
      if (keyCode === 27) this.closeDropdown()
    },

    showMenu() {
      this.isMenuShown = !this.isMenuShown
    }
  }
}
</script>

<style>
</style>
