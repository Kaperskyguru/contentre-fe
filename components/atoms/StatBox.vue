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
    :class="{
      'bg-gray-100': isUnderDevelopment
    }"
  >
    <Tooltip
      v-if="isUnderDevelopment"
      :label="'Coming Soon'"
      tooltip-class="bg-red-400"
      :trigger="['hover', 'focus']"
      position="top"
    >
      <div class="flex justify-between items-start">
        <div class="flex flex-col space-y-2">
          <span
            class="font-gilroy text-xs font-medium tracking-wide text-gray-400"
            >{{ uppercaseText }}</span
          >

          <span class="font-gilroy text-2xl font-bold tracking-wide">
            <DataGridCellMoney
              :options="{
                value: statValue
              }"
            />
          </span>
        </div>
        <div class="px-1 mt-8">
          <div class="flex items-start rounded-lg">
            <div class="p-2 text-white bg-teal-300 rounded-lg">
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
    </Tooltip>

    <span v-else>
      <div class="flex justify-between items-start">
        <div class="flex flex-col space-y-2">
          <span
            class="font-gilroy text-xs font-medium tracking-wide text-gray-400"
            >{{ uppercaseText }}</span
          >

          <span class="font-gilroy text-2xl font-bold tracking-wide">
            <DataGridCellMoney
              :options="{
                value: statValue,
                currency: Number.isInteger(statValue) ? '' : 'USD',
                currencyBefore: false
              }"
            />
          </span>
        </div>
        <div class="px-1 mt-8">
          <div class="flex items-start rounded-lg">
            <div class="p-2 text-white bg-teal-300 rounded-lg">
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
    </span>
  </div>
</template>

<script>
import DataGridCellMoney from './DataGridCellMoney.vue'
export default {
  components: { DataGridCellMoney },
  props: {
    stat: {
      type: Object,
      default: () => {}
    },
    isUnderDevelopment: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    uppercaseText() {
      return this.stat?.text?.toUpperCase()
    },
    statValue() {
      return isNaN(this.stat?.value) || this.stat?.value === undefined
        ? 0
        : this.stat?.value
    },
    statIcon() {
      return this.stat?.icon
    },
    statIncrement() {
      return isNaN(this.stat?.increment) || this.stat?.increment === undefined
        ? 0
        : this.stat?.increment
    }
  }
}
</script>

<style scoped>
</style>
