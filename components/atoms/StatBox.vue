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
        <span class="text-gray-400 text-xs font-gilroy tracking-wide font-medium card-header">{{stat.text.toUpperCase()}}</span>
        <span class="text-2xl font-gilroy tracking-wide font-bold font-gilroy">{{stat.value}}</span>
      </div>
      <div class="px-1 mt-8">
        <div class="flex flex row items-start rounded-lg">
          <div class="bg-teal-300 teal-300 text-white rounded-lg p-2">
            <img :src="stat.icon" :alt="stat.text" />
          </div>
        </div>
      </div>
    </div>
    <div class="relative">
      <span class="inline-block relative card-arrow text-green-500 text-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
        >
          <path
            class="heroicon-ui"
            d="M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z"
          />
        </svg>
      </span>
      <span class="text-green-500 pl-1">{{stat.increment}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stat: {
      type: Object
    }
  },
}
</script>

<style scoped>
.teal-300 {
  background: #4FD1C5
}
</style>
