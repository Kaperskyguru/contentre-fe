<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <div class="shrink-0">
        <span
          class="font-helvetica text-2xl font-bold text-gray-900 sm:text-2xl"
          >{{ title }}</span
        >

        <h3
          v-if="!noData"
          class="font-gilroy text-base font-medium text-gray-500"
        >
          <span
            v-if="percent >= 0"
            class="font-gilroy text-base font-bold text-green-500"
            >(+{{ percent }}%) more</span
          >

          <span v-else class="font-gilroy text-base font-bold text-red"
            >({{ percent }}%) less</span
          >
          in {{ new Date().getFullYear() }}
        </h3>
      </div>
    </div>
    <div v-if="noData" class="text-xl text-center">
      <NoData @clear="$emit('clear')" />
    </div>
    <Chart
      v-else
      :data="data"
      :percent="getPercentAmount"
      :options="getChartOptions"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Revenue Overview'
    },

    percent: {
      type: [String, Number],
      default: 0.0
    },

    data: {
      type: [Array, Object],
      default: () => {}
    },

    chartOptions: {
      type: Object,
      default: null
    }
  },
  computed: {
    noData() {
      if (Array.isArray(this.data)) return true

      if (!this.data?.current && !this.data?.last) {
        return true
      }

      return !(
        this.data?.current.some((item) => item > 0) &&
        this.data?.last.some((item) => item > 0)
      )
    },

    getChartOptions() {
      if (this.chartOptions) return this.chartOptions
      return {
        legend: {
          display: true
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                borderDash: [3.5, 3.5],
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontColor: '#CBD5E0',
                fontWeight: 'bold'
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontColor: '#CBD5E0',
                fontWeight: 'bold'
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>

<style>
</style>