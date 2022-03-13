<template>
  <div class="line-chart-wrapper" :style="computedStyles">
    <LineChart
      :styles="styles"
      :chart-data="chartData"
      :options="computedChartOptions"
    />
  </div>
</template>

<script>
export default {
  name: 'BarChart',
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

    options: {
      type: Object,
      default: null
    }
  },

  data: () => ({
    styles: {
      // height: 400
    }
  }),
  computed: {
    computedChartOptions() {
      return this.options ? this.options : this.defaultOptions
    },
    computeChartData() {
      return this.data?.data
        ? this.data?.data
        : [
            {
              data: this.data?.current,
              pointRadius: 0,
              label: new Date().getFullYear(),
              borderColor: '#4FD1C5',
              borderWidth: 3,
              backgroundColor: 'rgba(79, 209, 197, .54)',
              fill: 'start'
            },

            {
              data: this.data?.last,
              label: new Date().getFullYear() - 1,
              pointRadius: 0,
              borderColor: 'rgba(79, 209, 197, .20)',
              borderWidth: 3,
              backgroundColor: 'rgba(79, 209, 197, .20)',
              fill: 'start'
            }
          ]
    },

    chartData() {
      return {
        labels: this.data?.labels,

        datasets: this.computeChartData
      }
    },
    defaultOptions() {
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
    },

    computedStyles() {
      return {
        // height: `${this.styles.height}px`,
        position: 'relative',
        width: '100%'
      }
    }
  }
}
</script>

<style>
</style>
