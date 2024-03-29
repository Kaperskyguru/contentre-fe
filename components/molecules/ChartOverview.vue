<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <div class="shrink-0">
        <span
          class="font-helvetica text-2xl font-bold text-gray-900 sm:text-2xl"
          >{{ title }}</span
        >

        <h3
          v-if="!noData && !hidePercent"
          class="font-gilroy text-base font-medium text-gray-500"
        >
          <span
            v-if="percent >= 0"
            class="font-gilroy text-base font-bold text-green-500"
            >(+{{ percent }}%) more</span
          >

          <span v-else class="font-gilroy text-base font-bold text-red-500"
            >({{ percent }}%) less</span
          >
          in {{ new Date().getFullYear() }}
        </h3>
      </div>
    </div>
    <Tooltip
      v-if="isUnderDevelopment"
      :label="'Coming Soon'"
      tooltip-class="bg-red-400"
      :trigger="['hover', 'focus']"
      position="top"
    >
      <div class="text-xl text-center">
        <NoData @clear="$emit('clear')" />
      </div>
    </Tooltip>
    <div v-else-if="noData" class="text-xl text-center">
      <NoData @clear="$emit('clear')" />
    </div>
    <Chart
      v-else
      :unit="unit"
      :type="type"
      :records="records"
      :locale="locale"
      :data="data"
      :percent="percent"
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
    hidePercent: {
      type: Boolean,
      default: false
    },
    percent: {
      type: [String, Number],
      default: 0.0
    },
    type: { type: String, default: '' },
    unit: {
      type: String,
      default: 'day'
    },
    locale: {
      type: String,
      default: 'en-US'
    },
    records: {
      type: Number,
      default: 0
    },
    isUnderDevelopment: {
      type: Boolean,
      default: false
    },
    isTraffic: { type: Boolean, default: false },
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
      if (this.data.isEmpty) return true
      if (this.isTraffic) return false
      if (Array.isArray(this.data)) return true

      if (!this.data?.current && !this.data?.last) {
        return true
      }

      return !(
        this.data?.current.some((item) => item > 0) ||
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
                minRotation: 0,
                maxRotation: 0,
                autoSkipPadding: 1,
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