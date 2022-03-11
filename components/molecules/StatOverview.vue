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
        text: 'Avg. Click Rate',
        key: 'shares',
        icon: Rocket
      },
      {
        text: 'Page Views',
        key: 'views',
        icon: Show
      },
      {
        text: 'Total Likes',
        key: 'likes',
        icon: Heart
      },
      {
        text: 'Total Comments',
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

          stats.push({
            text: 'Page Views',
            value: '0.0',
            increment: '0.0',
            key: 'views',
            icon: Show
          })
        }
      })

      return stats
    }
  }
}
</script>

<style>
</style>