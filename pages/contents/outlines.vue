<template>
  <PageContent>
    <OutlineOverview :checked.sync="checked" @deleted="onDeleted" />
  </PageContent>
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