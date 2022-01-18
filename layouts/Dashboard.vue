<template>
  <main>
    <nav class="bg-white border-b border-gray-200 fixed z-30 w-full navside-bs">
      <Nav @logout="onLogout" />
    </nav>
    <div class="flex pt-16">
      <Aside />
    </div>
    <Nuxt />
  </main>
</template>

<script>
import base from './base.vue'
export default {
  name: 'DashboardNav',

  extends: base,

  middleware: ['isAuthenticated', 'isEmailConfirmed']
}
</script>

<style>
</style>
