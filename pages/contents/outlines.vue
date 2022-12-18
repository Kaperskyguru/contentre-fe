<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Outlines</PageTitle>
    </div>
    <OutlineOverview :checked.sync="checked" @deleted="onDeleted" />
  </section>
</template>
  
  <script>
export default {
  name: 'OutlinePage',
  layout: 'Dashboard',
  data: () => ({
    checked: []
  }),
  head() {
    return {
      title: 'Outlines'
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