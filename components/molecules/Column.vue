<template>
  <!-- Article -->
  <div class="">
    <div v-if="showSelector" class="mb-5 w-full">
      <DropdownField
        :placeholder="selectorData.title"
        :label="selectorData.title"
        @update:value="selected"
      >
        <option
          v-for="(item, itemIndex) in selectorData.data"
          :key="itemIndex"
          :value="item.name"
        >
          {{ item.name }}
        </option>
      </DropdownField>
    </div>

    <div v-if="noData" class="p-3 h-auto text-xl text-center">
      <NoData @clear="$emit('clear')" />
    </div>

    <span v-else>
      <div class="p-3 h-auto" :class="{ 'line-chart-wrapper': isBar }">
        <BarChart
          v-if="type === 'bar'"
          :chart-data="getChartData"
          :options="options"
        />
        <Doughnut v-else :chart-data="getChartData" :options="options" />
      </div>

      <header v-if="showHeader" class="py-8 px-2 leading-tight">
        <span
          v-if="getTitle"
          class="text-xl font-bold text-gray-900 sm:text-xl"
          >{{ getTitle }}</span
        >
        <h3 class="pb-8 font-normal text-gray-500">
          <span class="text-base text-green-500">(+23)</span> than last week
        </h3>
      </header>

      <footer class="flex justify-around items-center md:px-4">
        <a
          v-for="(label, i) in getChartData.labels"
          :key="i"
          class="flex items-center text-black"
          href="#"
        >
          <div class="analyticsfooter-footer"></div>
          <p class="mx-2 text-sm">{{ label }}</p>
        </a>
      </footer>

      <footer class="flex justify-around items-center mt-4 mb-8">
        <a
          v-for="(value, i) in getChartDataValues"
          :key="i"
          class="font-bold text-black"
          href="#"
        >
          <p class="text-base">{{ value }}</p>
          <div class="w-full h-1 rounded-full footer2-progress">
            <div class="w-2/3 h-full rounded-full footer2-progressball"></div>
          </div>
        </a>
      </footer>
    </span>
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
    },
    chartData: {
      type: [Array, Object],
      default: null
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showSelector: {
      type: Boolean,
      default: false
    },
    selectorData: {
      type: Object,
      default: () => ({
        title: 'Select Category',
        data: []
      })
    }
  },

  data: () => ({
    styles: {
      height: 300
    },
    mounted: false,
    defaultChartData: {
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

    noData() {
      return Array.isArray(this.getChartData)
    },

    getTitle() {
      return this.getChartData?.title ?? 'Fintech Solutions'
    },
    getChartData() {
      if (this.chartData !== null) {
        return this.chartData
      }
      return this.defaultChartData
    },

    getChartDataValues() {
      const datasets = this.getChartData?.datasets
      if (datasets) {
        return datasets[0]?.data
      }
      return []
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
          this.defaultChartData.datasets.push({
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
          this.defaultChartData.datasets.push({
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
  },
  methods: {
    selected(val) {
      this.$emit('selected', val)
    }
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