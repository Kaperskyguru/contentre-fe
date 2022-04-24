<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Contents</PageTitle>
    </div>
    <ContentOverview :checked.sync="checked" />
  </section>
</template>

<script>
export default {
  name: 'ContentPage',
  layout: 'Dashboard',
  data: () => ({
    checked: []
  }),

  watch: {
    $route() {
      this.checked = []
    }
  }
}
</script>

<style>
</style>