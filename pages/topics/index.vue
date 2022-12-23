<template>
  <PageContent>
    <TopicOverview :checked.sync="checked" />
  </PageContent>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Topics',

  layout: 'Dashboard',

  data: () => ({ checked: [] }),
  head() {
    return {
      title: 'Topics'
    }
  }
}
</script>

<style>
</style>