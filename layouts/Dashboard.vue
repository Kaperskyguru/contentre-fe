<template>
  <main class="flex">
    <div class="hidden flex-none sm:w-0 md:block md:w-64">
      <Aside @onCollapse="collapse" />
    </div>

    <section class="grow">
      <header class="fixed z-30 mb-5 bg-white navside-bs">
        <nav class="md:w-10/12">
          <Nav @logout="onLogout" @onToggleMenu="showMenu" />
        </nav>
      </header>

      <nav
        id="mobile"
        class="w-full md:hidden"
        :class="{ 'mt-16': isMenuShown }"
      >
        <div v-if="isMenuShown" class="pt-5">
          <MobileMenu
            v-click-outside="onClickOutside"
            @onMenuClick="onClickOutside"
          />
        </div>
      </nav>

      <div :class="{ 'mt-0': isMenuShown, 'mt-16': !isMenuShown }">
        <Nuxt />
      </div>
      <Toast />
    </section>
  </main>
</template>

<script>
import vClickOutside from 'v-click-outside'
import base from './base.vue'
import { currentUser } from '~/components/mixins'
export default {
  name: 'DashboardNav',

  directives: {
    clickOutside: vClickOutside.directive
  },

  extends: base,

  mixins: [currentUser],

  middleware: [
    'isAuthenticated',
    'isEmailConfirmed',
    'checkSubscription'
    // 'isPhoneConfirmed',
    // 'hasActiveCompany'
  ],
  data: () => ({
    isSidebarCollapsed: false,
    isMenuShown: false
  }),

  computed: {
    apolloClient() {
      return this.$apollo.provider.defaultClient
    },

    cache() {
      return this.apolloClient.cache
    },

    locales() {
      return this.$i18n.locales
    }
  },

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
