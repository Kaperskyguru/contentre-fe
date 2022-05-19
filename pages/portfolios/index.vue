<template>
  <PageContent>
    <PortfolioOverview />
  </PageContent>
</template>

<script>
import fragment from 'vue-frag'
export default {
  name: 'PortfolioTw',
  directives: {
    fragment
  },

  layout: 'Dashboard',
  head() {
    return {
      title: 'Portfolios'
    }
  }
}
</script>

<style>
</style>