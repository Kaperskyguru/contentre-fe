<template>
  <main>
    <nav class="bg-white border-b border-gray-200 fixed z-30 w-full navside-bs">
      <Nav @logout="onLogout" />
    </nav>
    <div class="flex pt-16">
      <Aside />
    </div>

    <section class="h-full lg:ml-64 px-3 md:px-12">
      <div class="flex items-center justify-between py-4">
        <PageTitle>Settings</PageTitle>
      </div>

      <div class="container mx-auto mx-5 md:flex no-wrap md:-mx-2">
        <div class="w-full md:w-5/12 md:mx-2 shadow rounded-xl bg-white">
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