<template>
  <div
    class="
      p-4
      transition-shadow
      border
      rounded-lg
      shadow-sm
      hover:shadow-lg
      bg-white
    "
  >
    <div class="flex items-start justify-between">
      <div class="flex flex-col space-y-2">
        <span
          class="
            text-gray-400 text-xs
            font-gilroy
            tracking-wide
            font-medium
            card-header
          "
          >{{ uppercaseText }}</span
        >
        <span
          class="text-2xl font-gilroy tracking-wide font-bold font-gilroy"
          >{{ statValue }}</span
        >
      </div>
      <div class="px-1 mt-8">
        <div class="flex flex row items-start rounded-lg">
          <div class="bg-teal-300 teal-300 text-white rounded-lg p-2">
            <img :src="statIcon" :alt="uppercaseText" />
          </div>
        </div>
      </div>
    </div>
    <div class="relative">
      <span class="inline-block relative card-arrow text-green-500 text-md">
        <IncrementIcon />
      </span>
      <span class="text-green-500 pl-1">{{ statIncrement }}</span>
    </div>
  </div>
</template>

<script>
import IncrementIcon from '~/assets/icons/increment.svg?inline'
export default {
  components: { IncrementIcon },
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
      return this.stat?.value
    },

    statIcon() {
      return this.stat?.icon
    },

    statIncrement() {
      return this.stat?.increment
    }
  }
}
</script>

<style scoped>
.teal-300 {
  background: #4fd1c5;
}
</style>
