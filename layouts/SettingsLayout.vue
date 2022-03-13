<template>
  <main>
    <section class="px-3 h-full md:px-12">
      <div class="container mx-5 md:flex md:-mx-2">
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
import Dashboard from './Dashboard.vue'
export default {
  name: 'DashboardNav',

  extends: Dashboard,

  middleware: ['isAuthenticated', 'isEmailConfirmed']
}
</script>

<style>
</style>