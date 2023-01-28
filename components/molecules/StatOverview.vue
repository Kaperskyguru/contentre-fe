<template>
  <div
    class="grid grid-cols-1 gap-5 sm:grid-cols-3"
    :class="{
      'lg:grid-cols-3': columns.length === 4,
      'lg:grid-cols-3': columns.length === 3
    }"
  >
    <StatBox
      v-for="(stat, key) in getStats"
      :key="`stat-${key}`"
      :stat="stat"
      :is-under-development="isUnderDevelopment"
    />
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: [Array, Object],
      default: () => {}
    },
    isUnderDevelopment: {
      type: Boolean,
      default: false
    },
    columns: {
      type: [Array, Object],
      default: () => []
    }
  },

  computed: {
    getStats() {
      const stats = []

      this.columns.forEach((item) => {
        if (item.key === 'clients') {
          stats.push({
            ...item,
            value: parseInt(this.stats.totalClients),
            increment: parseFloat(this.stats.clientPercent).toFixed(2)
          })
        }

        if (item.key === 'amounts') {
          stats.push({
            ...item,
            value: parseFloat(this.stats.amount).toFixed(2),
            increment: parseFloat(this.stats.amountPercentStat).toFixed(2)
          })
        }

        if (item.key === 'users') {
          stats.push({
            ...item,
            value: parseInt(this.stats.users),
            increment: parseFloat(this.stats.userPercent)
          })
        }

        if (item.key === 'newUser') {
          stats.push({
            ...item,
            value: parseInt(this.stats.newUser),
            increment: parseFloat(this.stats.newUserPercent)
          })
        }

        if (item.key === 'views') {
          stats.push({
            ...item,
            value: parseInt(this.stats.views),
            increment: parseFloat(this.stats.viewsPercent)
          })
        }

        if (item.key === 'contents')
          stats.push({
            ...item,
            value: parseInt(this.stats?.totalContents ?? 0),
            increment: parseFloat(this.stats.contentPercent).toFixed(2)
          })
      })

      return stats
    }
  }
}
</script>

<style>
</style>