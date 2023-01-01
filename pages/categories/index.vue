<template>
  <CategoryOverview :checked.sync="checked" />
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