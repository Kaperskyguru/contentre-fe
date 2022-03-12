<template>
  <main>
    <nav class="fixed z-30 w-full bg-white border-b border-gray-200 navside-bs">
      <Nav @logout="onLogout" />
    </nav>
    <div class="flex pt-16">
      <Aside @onCollapse="collapse" />
    </div>
    <section
      class="grow"
      :class="{
        'lg:ml-14': isSidebarCollapsed,
        'lg:ml-64': !isSidebarCollapsed
      }"
    >
      <Nuxt />
    </section>
    <Toast />
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
    isSidebarCollapsed: false
  }),
  methods: {
    collapse(c) {
      this.isSidebarCollapsed = c
    }
  }
}
</script>

<style>
</style>
