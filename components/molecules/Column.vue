<template>
  <!-- Article -->
  <div class="overflow-hidden">
    <div class="h-auto p-3" :class="{ 'line-chart-wrapper': isBar }">
      <BarChart
        v-if="type === 'bar'"
        :chartdata="chartData"
        :options="options"
      />
      <Doughnut v-else :chartdata="chartData" :options="options" />
    </div>

    <header class="leading-tight py-8 px-2">
      <span class="text-xl sm:text-xl font-bold text-gray-900"
        >Fintech Solutions</span
      >
      <h3 class="text-normal font-normal text-gray-500 pb-8">
        <span class="text-green-500 text-base">(+23)</span> than last week
      </h3>
    </header>

    <footer class="flex items-center justify-around md:px-4">
      <a
        v-for="(label, i) in chartData.labels"
        :key="i"
        class="flex items-center text-black"
        href="#"
      >
        <div class="analyticsfooter-footer"></div>
        <p class="mx-2 text-sm">{{ label }}</p>
      </a>
    </footer>

    <footer class="flex items-center justify-around mt-4 mb-8">
      <a
        v-for="(value, i) in getChartData"
        :key="i"
        class="text-black font-bold"
        href="#"
      >
        <p class="text-base">{{ value }}</p>
        <div class="w-full h-1 footer2-progress rounded-full">
          <div class="w-2/3 h-full footer2-progressball rounded-full"></div>
        </div>
      </a>
    </footer>
    <!-- footer 2 -->
  </div>
  <!-- END Article -->
</template>

<script>
export default {
  name: 'ChartColumn',

  props: {
    type: {
      type: String,
      default: 'bar'
    }
  },
  data: () => ({
    styles: {
      height: 300
    },
    mounted: false,
    chartData: {
      labels: ['Views', 'Clicks', 'Likes', 'Comments'],
      datasets: []
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: '#fff'
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ]
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {
    isBar() {
      return this.type.toLowerCase() === 'bar'
    },

    getChartData() {
      return this.chartData?.datasets[0]?.data
    },
    calculatedHeight() {
      if (this.mounted) {
        const elem = document.getElementById('actual-wrapper')
        const height = window
          .getComputedStyle(elem, null)
          .getPropertyValue('height')
        return height - 60
      } else {
        return 300
      }
    }
  },

  watch: {
    type: {
      handler(v) {
        if (v === 'bar') {
          this.chartData.datasets.push({
            backgroundColor: '#fff',
            barPercentage: 1,
            borderWidth: 700,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            categoryPercentage: 1,
            label: '',
            data: [32984, 24200, 12340, 320]
          })
        } else if (v === 'doughnut') {
          this.chartData.datasets.push({
            label: '',
            data: [32984, 24200, 12340, 320],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          })
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.mounted = true
  }
}
</script>

<style scoped>
.analyticsfooter-footer {
  width: 12px;
  height: 26px;
  background: rgb(79, 209, 197);
  border-radius: 5px;
}

.footer2-progress {
  margin-top: 10px;
  background: rgb(226, 232, 240);
}
.line-chart-wrapper {
  border-radius: 12px;
  background: linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%);
}
</style>