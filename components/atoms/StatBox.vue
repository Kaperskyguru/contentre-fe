<template>
  <div
    class="
      p-4
      bg-white
      rounded-lg
      border
      shadow-sm
      hover:shadow-lg
      transition-shadow
    "
  >
    <!-- <div v-if="noData" class="text-xl text-center">
      <NoData @clear="$emit('clear')" />
    </div> -->
    <div class="flex justify-between items-start">
      <div class="flex flex-col space-y-2">
        <span
          class="
            tracking-wide
            font-gilroy font-medium
            text-gray-400 text-xs
            card-header
          "
          >{{ uppercaseText }}</span
        >

        <span class="font-gilroy text-2xl font-bold tracking-wide"
          >{{ statValue }}%</span
        >
      </div>
      <div class="px-1 mt-8">
        <div class="flex items-start rounded-lg row">
          <div class="p-2 text-white bg-teal-300 rounded-lg teal-300">
            <img :src="statIcon" :alt="uppercaseText" />
          </div>
        </div>
      </div>
    </div>
    <div class="relative">
      <DataGridCellPercent
        :is-icon-back="true"
        :options="{
          value: statIncrement
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stat: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    uppercaseText() {
      return this.stat?.text?.toUpperCase()
    },

    statValue() {
      return isNaN(this.stat?.value) ? 0.0 : this.stat?.value
    },

    statIcon() {
      return this.stat?.icon
    },

    // noData() {
    //   return isNaN(this.stat.value) && isNaN(this.stat.increment)
    // },
    statIncrement() {
      return isNaN(this.stat?.increment) ? 0.0 : this.stat?.increment
    }
  }
}
</script>

<style scoped>
.teal-300 {
  background: #4fd1c5;
}
</style>
