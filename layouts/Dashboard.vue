<template>
  <div class="flex overflow-hidden flex-col">
    <div class="justify-center items-center w-full">
      <Warning link="/profile#onboarding" button-text="Complete Profile"
        >Check your profile page to complete your profile. It is required for
        your Writing Portfolios</Warning
      >
    </div>
    <MyHeader :user="currentUser" @logout="onLogout" />

    <Nuxt class="flex-1" />
    <Toast />
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import base from './base.vue'
import { currentUser, uiState } from '~/components/mixins'
export default {
  name: 'DashboardNav',

  directives: {
    clickOutside: vClickOutside.directive
  },

  extends: base,

  mixins: [currentUser, uiState],

  middleware: [
    'isAuthenticated',
    'isEmailConfirmed',
    'checkSubscription'
    // 'isPhoneConfirmed',
    // 'hasActiveCompany'
  ],
  data: () => ({
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
