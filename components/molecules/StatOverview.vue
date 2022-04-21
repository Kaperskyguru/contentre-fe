<template>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <StatBox
      v-for="(stat, key) in getStats"
      :key="`stat-${key}`"
      :stat="stat"
    />
  </div>
</template>

<script>
import Rocket from '~/assets/icons/rocket.svg'
import Show from '~/assets/icons/show.svg'
import Heart from '~/assets/icons/heart.svg'
import Chat from '~/assets/icons/chat.svg'
export default {
  props: {
    stats: {
      type: [Array, Object],
      default: () => {}
    }
  },
  data: () => ({
    statistics: [
      {
        text: 'Total Revenue',
        key: 'amounts',
        icon: Rocket
      },
      {
        text: 'Total Contents',
        key: 'contents',
        icon: Show
      },
      {
        text: 'Total Clients',
        key: 'clients',
        icon: Heart
      },
      {
        text: 'Interactions',
        key: 'interactions',
        icon: Chat
      }
    ]
  }),

  computed: {
    getStats() {
      const stats = []

      this.statistics.forEach((item) => {
        if (item.key === 'clients') {
          stats.push({
            ...item,
            value: parseInt(this.stats.totalClients),
            increment: parseFloat(this.stats.clientPercent).toFixed(2)
          })
        }

        if (item.key === 'interactions') {
          stats.push({
            ...item,
            value: parseInt(this.stats.currentInteractions),
            increment: parseFloat(this.stats.interactionPercent).toFixed(2)
          })
        }

        if (item.key === 'amounts') {
          stats.push({
            ...item,
            value: parseFloat(this.stats.amount).toFixed(2),
            increment: parseFloat(this.stats.amountPercentStat).toFixed(2)
          })
        }

        if (item.key === 'contents')
          stats.push({
            ...item,
            value: parseInt(this.stats.totalContents),
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