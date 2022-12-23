<template>
  <div class="flex overflow-hidden flex-col">
    <!-- <div class="justify-center items-center w-full">
      <Warning link="/profile#onboarding" button-text="Complete Profile"
        >Check your profile page to complete your profile. It is required for
        your Writing Portfolios</Warning
      >
    </div> -->

    <!-- Menu -->

    <!-- <div class="hidden flex-none sm:w-0 md:block md:w-64">
      <Aside @onCollapse="collapse" />
    </div> -->

    <header class="flex items-center py-1 px-4 bg-white md:px-6">
      <div
        class="
          inline-flex
          py-2
          px-0.5
          -m-0.5
          leading-none
          rounded
          outline-none
          focus-visible:ring-2
          ring-offset-2
          transition-all
        "
      >
        <Hyperlink to="/" class="flex items-center font-bold lg:ml-2.5">
          <img
            src="~/assets/img/Concentre.io-iconpng.png"
            class="h-12"
            alt="contentre logo"
          />
          <span class="self-center whitespace-nowrap">Contentre</span>
        </Hyperlink>
      </div>
      <!-- <div class="justify-between mb-5 bg-white navside-bs"> -->
      <nav
        class="
          hidden
          flex-1
          items-center
          md:flex md:mx-6 md:space-x-1
          lg:mx-16 lg:space-x-4
          xl:space-x-6
        "
      >
        <!-- <Nav @logout="onLogout" @onToggleMenu="showMenu" /> -->
      </nav>

      <div class="flex-auto pl-3 md:hidden" />

      <!-- <NotificationDropdown
        class="mr-1 md:mr-3 lg:mr-5"
        :items="notifications"
        @item-click="$emit('notification-click', $event)"
        @clear-all-notifications="$emit('clear-all-notifications')"
      /> -->

      <UserDropdown :user="currentUser" @logout="$emit('logout')" />
      <!-- </div> -->

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
    </header>

    <!-- <div class="flex"> -->
    <!--  -->

    <!-- <section class="w-full">
        <div :class="{ 'mt-0': isMenuShown, 'mt-16': !isMenuShown }"> -->

    <!-- <main></main> -->

    <Nuxt class="flex-1" />
    <!-- </div> -->
    <Toast />
    <!-- </section> -->
    <!-- </div> -->

    <!-- <WarnDialog
      ref="warnDialog"
      persistent
      :title="$t('blockingDialog.title')"
      :message="$t('blockingDialog.message')"
      :confirm="$t('blockingDialog.button')"
      :hide-cancel="true"
      @confirm="$router.go()"
    /> -->
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
