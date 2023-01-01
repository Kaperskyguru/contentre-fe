<template>
  <SnippetOverview
    :checked.sync="checked"
    :on-boarded="onBoarded"
    @deleted="onDeleted"
  />
</template>
  
  <script>
export default {
  name: 'SnippetPage',
  layout: 'Dashboard',
  data: () => ({
    checked: [],
    onBoarded: false
  }),
  head() {
    return {
      title: 'Snippets'
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