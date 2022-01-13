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
        <span class="text-gray-400 text-xs font-gilroy tracking-wide font-medium card-header">AVG. CLICK RATE</span>
        <span class="text-2xl font-gilroy tracking-wide font-bold font-gilroy">56,8%</span>
      </div>
      <div class="px-1 mt-8">
        <div class="flex flex row items-start rounded-lg">
          <div class="bg-teal-300 teal-300 text-white rounded-lg p-2">
            <svg
              class="fill-current text-grey md:h-6 md:w-6 h-4 w-4"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M11.933 13.069s7.059-5.094 6.276-10.924a.465.465 0 0 0-.112-.268.436.436 0 0 0-.263-.115C12.137.961 7.16 8.184 7.16 8.184c-4.318-.517-4.004.344-5.974 5.076-.377.902.234 1.213.904.959l2.148-.811 2.59 2.648-.793 2.199c-.248.686.055 1.311.938.926 4.624-2.016 5.466-1.694 4.96-6.112zm1.009-5.916a1.594 1.594 0 0 1 0-2.217 1.509 1.509 0 0 1 2.166 0 1.594 1.594 0 0 1 0 2.217 1.509 1.509 0 0 1-2.166 0z"
              />
            </svg>
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
      <span class="text-green-500 pl-1">19.3%</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.teal-300 {
  background: #4FD1C5
}
</style>
