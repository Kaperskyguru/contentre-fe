<template>
  <div>
    <div class="flex justify-between items-center p-2">
      <div class="mr-2">
        <p class="font-roboto text-base text-white">Contents</p>
      </div>
      <div class="">
        <button class="py-1 px-2 font-bold text-white bg-red rounded-md shadow">
          Upgrade
        </button>
      </div>
    </div>

    <div class="px-2 pb-2 aside-footer-footer">
      <p class="pb-4 font-roboto text-white">
        {{ contents }}<span class="text-white"> of 12</span>
      </p>
      <div class="w-full h-2 rounded-full progress-bg">
        <div class="w-1/6 h-full rounded-full progress"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpgradE',
  props: {
    contents: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style>
</style>