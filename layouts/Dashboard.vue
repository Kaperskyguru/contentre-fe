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
          <MobileMenu />
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
import base from './base.vue'
export default {
  name: 'DashboardNav',

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

    showMenu() {
      this.isMenuShown = !this.isMenuShown
    }
  }
}
</script>

<style>
</style>
