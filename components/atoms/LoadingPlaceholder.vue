<template>
  <div
    class="
      overflow-hidden
      bg-gradient-to-r
      min-h-4
      from-whitesmoke
      via-snow
      to-whitesmoke
      animation-loading-placeholder
    "
    :style="{ width: width ? computedWidth : undefined }"
    :class="{ 'rounded-full': circle, rounded: !circle }"
  />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LoadingPlaceholder',

  props: {
    width: {
      type: [String, Number],
      default: '100%'
    },

    circle: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    computedWidth() {
      return this.checkStyleValue(this.width)
    }
  },

  methods: {
    checkStyleValue(value) {
      if (value) {
        value = String(value)
        if (value.endsWith('%') || value.endsWith('px')) {
          return value
        }

        return `${value}px`
      }
    }
  }
})
</script>

<style scoped>
@keyframes loadingPlaceholder {
  0% {
    background-position: 200% 0;
  }
}

.animation-loading-placeholder {
  animation: loadingPlaceholder 1.15s linear both infinite;
  background-size: 200% 100%;
}
</style>
