<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Settings</PageTitle>
    </div>
    <div class="container mx-5 md:flex md:-mx-2">
      <div class="w-full bg-white rounded-xl shadow md:mx-2 md:w-5/12">
        <!-- Profile Card -->
        <CompleteProfile />
        <!-- End of profile card -->

        <!-- Links -->
        <SettingsNav />
        <!-- End of links -->
      </div>
      <nuxt-child />
    </div>
  </section>
</template>

<script>
export default {
  name: 'SettingsPage',
  layout: 'Dashboard'
}
</script>

<style>
</style>