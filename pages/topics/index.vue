<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Topics & Niches</PageTitle>
    </div>

    <TopicOverview :checked.sync="checked" />
  </section>
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