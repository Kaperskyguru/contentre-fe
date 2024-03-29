<template>
  <div class="flex overflow-hidden flex-col">
    <div v-if="showSelector" class="mb-5 w-full">
      <DropdownField
        v-model="selectedItem"
        :placeholder="selectorData.placeholder"
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
          :options="getBarOptions"
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
          <div
            class="analyticsfooter-footer"
            :style="{ backgroundColor: getChartDataColors[i] }"
          ></div>
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
        </a>
      </footer>
    </span>
  </div>
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
        data: [],
        placeholder: ''
      })
    }
  },

  data: () => ({
    styles: {
      height: 300
    },
    selectedItem: '',
    mounted: false,
    options: {
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {
    isBar() {
      return this.type.toLowerCase() === 'bar'
    },

    getBarOptions() {
      return {
        ...this.options,
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
        }
      }
    },

    noData() {
      return Array.isArray(this.getChartData) || this.getChartData === null
    },

    getTitle() {
      return this.getChartData?.title ?? 'Fintech Solutions'
    },
    getChartData() {
      if (this.chartData !== null) {
        return this.chartData
      }
      return null
    },

    getChartDataValues() {
      const datasets = this.getChartData?.datasets
      if (datasets) {
        return datasets[0]?.data
      }
      return []
    },

    getChartDataColors() {
      const datasets = this.getChartData?.datasets
      if (datasets) {
        return datasets[0]?.backgroundColor
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
  /* background: rgb(79, 209, 197); */
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