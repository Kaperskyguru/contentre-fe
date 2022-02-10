<template>
  <main>
    <nav class="fixed z-30 w-full bg-white border-b border-gray-200 navside-bs">
      <Nav @logout="onLogout" />
    </nav>
    <div class="flex pt-16">
      <Aside />
    </div>

    <section class="px-3 h-full md:px-12 lg:ml-64">
      <div class="flex justify-between items-center py-4">
        <PageTitle>Settings</PageTitle>
      </div>

      <div class="container mx-5 md:flex md:-mx-2 no-wrap">
        <div class="w-full bg-white rounded-xl shadow md:mx-2 md:w-5/12">
          <!-- Profile Card -->
          <CompleteProfile />
          <!-- End of profile card -->

          <!-- Links -->
          <SettingsNav />
          <!-- End of links -->
        </div>
        <Nuxt />
      </div>
    </section>
    <Toast />
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