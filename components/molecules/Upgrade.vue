<template>
  <div>
    <div class="flex justify-between items-center p-2">
      <div class="mr-2">
        <p class="font-roboto text-base text-white">Contents</p>
      </div>
      <div class="">
        <Button appearance="secondary"> Upgrade </Button>
      </div>
    </div>

    <div class="px-2 pb-2 aside-footer-footer">
      <p class="pb-4 font-roboto text-white">
        {{ contents }}<span class="text-white"> of {{ maxText }}</span>
      </p>

      <ProgressBar
        size="medium"
        :val="computeContent"
        class="w-full h-2 rounded-full"
        :max="computeTotal"
        bar-color="#dcf6f3"
        bg-color="#102a27"
      ></ProgressBar>
    </div>
  </div>
</template>

<script>
import ProgressBar from 'vue-simple-progress'
export default {
  name: 'UpgradE',
  components: {
    ProgressBar
  },
  props: {
    contents: {
      type: Number,
      default: 0
    },
    max: {
      type: [Number, String],
      default: 12
    }
  },

  computed: {
    computeContent() {
      return this.contents * 100
    },
    maxText() {
      if (this.max === 0) return 'Unlimited'
      return this.max
    },
    computeTotal() {
      return this.max * 100
    }
  }
}
</script>

<style>
</style>