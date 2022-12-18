<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Snippets</PageTitle>
    </div>
    <ContentOverview
      :checked.sync="checked"
      :on-boarded="onBoarded"
      @deleted="onDeleted"
    />

    <Dialog v-model="isAddMultipleContent">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <LazyUploadMultipleContents
            :is-onboarding="true"
            @created="onCreatedContent"
            @close="close"
          />
        </div>
      </div>
    </Dialog>
  </section>
</template>
  
  <script>
export default {
  name: 'ContentPage',
  layout: 'Dashboard',
  data: () => ({
    checked: [],
    isAddMultipleContent: false,
    onBoarded: false
  }),
  head() {
    return {
      title: 'Contents'
    }
  },

  watch: {
    $route() {
      this.checked = []
    }
  },

  beforeMount() {
    const callbackPaths = ['/contents#upload']
    if (callbackPaths.includes(this.$route.fullPath)) {
      this.isAddMultipleContent = true
    }
  },

  methods: {
    onDeleted() {
      this.checked = []
    },
    onCreatedContent(done) {
      this.isAddMultipleContent = false
      this.$router.push('/')
    },

    close() {
      this.isAddMultipleContent = false
      this.$router.push('/')
    }
  }
}
</script>
  
  <style>
</style>