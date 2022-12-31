<template>
  <BriefOverview :checked.sync="checked" @deleted="onDeleted" />
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