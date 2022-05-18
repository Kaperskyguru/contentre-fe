<template>
  <!-- <PageContent> -->
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Settings</PageTitle>
    </div>
    <div class="container md:flex">
      <div class="w-full bg-white rounded-xl shadow md:mx-2 md:w-5/12">
        <CompleteProfile />

        <SettingsNav />
      </div>
      <nuxt-child />
    </div>
  </section>
  <!-- </PageContent> -->
</template>

<script>
export default {
  name: 'SettingsPage',
  layout: 'Dashboard',
  head() {
    return {
      title: 'Settings'
    }
  }
}
</script>

<style>
</style>