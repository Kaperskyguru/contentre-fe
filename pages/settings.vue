<template>
  <PageContent>
    <Card>
      <PageTitle>Settings</PageTitle>
    </Card>
    <section class="gap-2 md:flex">
      <div class="w-full bg-white rounded-xl shadow md:w-5/12">
        <CompleteProfile />

        <SettingsNav />
      </div>

      <nuxt-child />
    </section>
  </PageContent>
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