<template>
  <div role="presentation" :aria-label="'Loading'">
    <p
      v-if="$slots.default"
      class="mb-12 text-lg font-bold text-center md:text-xl"
    >
      <slot />
    </p>

    <SvgLoader :width="sizeAsNumber" :height="sizeAsNumber" class="mx-auto" />
  </div>
</template>

<script>
import SvgLoader from '~/assets/img/loader.svg?inline'

export default {
  name: 'LoadinG',

  components: {
    SvgLoader
  },

  props: {
    size: {
      type: String,
      validate: (value) =>
        ['xs', 'xxs', 'sm', 'base', 'lg', 'xl'].includes(value),
      default: 'base'
    }
  },

  data: () => ({
    sizes: {
      xxs: 18,
      xs: 28,
      sm: 72,
      lg: 160,
      xl: 240
    }
  }),

  computed: {
    sizeAsNumber() {
      return this.sizes[this.size] || 100
    }
  }
}
</script>
