<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <div class="shrink-0">
        <span
          class="font-helvetica text-2xl font-bold text-gray-900 sm:text-2xl"
          >{{ title }}</span
        >

        <div v-if="noData" class="text-xl text-center">
          <NoData @clear="$emit('clear')" />
        </div>
        <h3 v-else class="font-gilroy text-base font-medium text-gray-500">
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

    <Chart
      v-if="!noData"
      :data="data"
      :percent="getPercentAmount"
      :options="chartOptions"
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
      return !this.data?.data
    }
  }
}
</script>

<style>
</style>