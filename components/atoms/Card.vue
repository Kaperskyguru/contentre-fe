<template>
  <div :class="classNames">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CardT',

  props: {
    padding: {
      type: String,
      validate: (value) => ['none', 'normal', 'large'].includes(value),
      default: 'normal'
    },

    elevation: {
      type: String,
      validate: (value) => ['none', 'normal', 'large'].includes(value),
      default: 'none'
    },

    flex: {
      type: Boolean,
      default: false
    },

    fullHeight: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classNames() {
      const classNames = ['bg-white', 'rounded-lg']

      if (this.padding && this.padding !== 'none') {
        classNames.push(this.padding === 'normal' ? 'p-4' : 'p-6')
      }

      if (this.elevation && this.elevation !== 'none') {
        classNames.push(this.elevation === 'normal' ? 'shadow' : 'shadow-lg')
      }

      if (this.flex) {
        classNames.push('flex')
      }

      if (this.fullHeight) {
        classNames.push('max-h-full')
      }

      return classNames.join(' ')
    }
  }
})
</script>
