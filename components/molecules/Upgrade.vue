<template>
  <div>
    <div
      class="flex flex-col gap-3 justify-between items-center p-2 md:flex-row"
    >
      <p class="text-base text-white">Contents</p>

      <Button appearance="outline" class="w-full" @click.prevent="subscribe">
        {{ btnText }}
      </Button>
    </div>

    <div class="px-2 pb-2 aside-footer-footer">
      <p class="pb-4 text-white">
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
import { currentUser } from '~/components/mixins'
export default {
  name: 'UpgradE',
  components: {
    ProgressBar
  },
  mixins: [currentUser],
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
    btnText() {
      return this.max ? 'Upgrade' : 'Renew'
    },
    computeContent() {
      return this.contents * 100
    },
    maxText() {
      if (this.max === 0) return 'Unlimited'
      return this.max
    },
    computeTotal() {
      // if (!this.max) return 100
      return this.max * 100
    }
  },

  methods: {
    async subscribe() {
      await this.$segment({
        operation: 'identify'
      })
      await this.$segment({
        eventName: 'Viewed Subscriptions Page',
        data: {
          from: this.max ? 'Upgrade' : 'Renew',
          user: this.currentUser
        }
      })
      this.$router.push('/subscriptions?tab=Plan')
    }
  }
}
</script>

<style>
</style>