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
        key: 'shares',
        icon: Rocket
      },
      {
        text: 'Total Contents',
        key: 'views',
        icon: Show
      },
      {
        text: 'Total Clients',
        key: 'likes',
        icon: Heart
      },
      {
        text: 'Interactions',
        key: 'comments',
        icon: Chat
      }
    ]
  }),

  computed: {
    getStats() {
      const stats = []

      this.statistics.forEach((item) => {
        if (item.key === 'likes') {
          stats.push({
            ...item,
            value: parseFloat(this.stats.likes).toFixed(2),
            increment: parseFloat(this.stats.likePercent).toFixed(2)
          })
        }

        if (item.key === 'comments') {
          stats.push({
            ...item,
            value: parseFloat(this.stats.comments).toFixed(2),
            increment: parseFloat(this.stats.commentPercent).toFixed(2)
          })
        }

        if (item.key === 'shares') {
          stats.push({
            ...item,
            value: parseFloat(this.stats.shares).toFixed(2),
            increment: parseFloat(this.stats.sharePercent).toFixed(2)
          })
        }

        if (item.key === 'views')
          stats.push({
            ...item,
            value: '0.0',
            increment: '0.0'
          })
      })

      return stats
    }
  }
}
</script>

<style>
</style>