<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Briefs</PageTitle>
    </div>
    <BriefOverview :checked.sync="checked" @deleted="onDeleted" />
  </section>
</template>
  
  <script>
export default {
  name: 'ContentPage',
  layout: 'Dashboard',
  data: () => ({
    checked: []
  }),
  head() {
    return {
      title: 'Briefs'
    }
  },

  watch: {
    $route() {
      this.checked = []
    }
  },

  methods: {
    onDeleted() {
      this.checked = []
    }
  }
}
</script>
  
  <style>
</style>