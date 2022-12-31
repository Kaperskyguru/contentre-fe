<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Snippets</PageTitle>
    </div>
    <SnippetOverview
      :checked.sync="checked"
      :on-boarded="onBoarded"
      @deleted="onDeleted"
    />
  </section>
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
    },

  }
}
</script>
  
  <style>
</style>