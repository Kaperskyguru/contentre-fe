<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Categories</PageTitle>
    </div>

    <CategoryOverview :checked.sync="checked" />
  </section>
</template>

<script>
// import fragment from 'vue-frag'
export default {
  name: 'CategoryTw',
  // directives: {
  //   fragment
  // },

  layout: 'Dashboard',
  data: () => ({
    isEditPanelVisible: false,
    checked: []
  })
}
</script>

<style>
</style>