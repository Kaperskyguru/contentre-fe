<template>
  <div class="relative w-full">
    <section class="fixed top-0 left-0 z-20 w-full">
      <div
        v-if="!isProfileCompleted"
        class="justify-center items-center w-full"
      >
        <Warning link="/profile#onboarding" button-text="Complete Profile"
          >Check your profile page to complete your profile. It is required for
          your Writing Portfolios</Warning
        >
      </div>
      <MyHeader :user="currentUser" class="w-full" @logout="onLogout" />
    </section>
    <Nuxt
      class="md:py-4"
      :class="[
        {
          'mt-[254px] md:mt-36 lg:mt-[137px] ': !isProfileCompleted
        },
        { 'md:mt-20 mt-24': isProfileCompleted }
      ]"
    />
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
    },

    isProfileCompleted() {
      return (
        this.currentUser?.bio &&
        this.currentUser?.jobTitle &&
        this.currentUser?.avatarURL
      )
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
@media only screen and (min-width: 768px) {
  .fixedbar {
    @apply mt-36;
  }
}
</style>
