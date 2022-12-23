<template>
  <PageContent>
    <CategoryOverview :checked.sync="checked" />
  </PageContent>
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
    checked: []
  }),
  head() {
    return {
      title: 'Categories'
    }
  }
}
</script>

<style>
</style>