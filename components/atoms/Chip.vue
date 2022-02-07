<template>
  <span
    class="inline-block text-sm truncate rounded border"
    :class="[
      chipClass,
      paddingClass,
      {
        'border-transparent bg-gradient-to-tr from-whitesmoke to-linen':
          appearance === 'primary',
        'border-linen text-darksilver': appearance === 'secondary'
      }
    ]"
  >
    <span :class="{ 'flex items-center': avatar }">
      <img v-if="avatar" :src="avatar" width="20" height="20" class="mr-2" />
      <span>
        {{ chipText }}
      </span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'ChiP',

  props: {
    size: {
      type: String,
      validate: (value) => ['small', 'normal', 'large'].includes(value),
      default: 'normal'
    },

    appearance: {
      type: String,
      validate: (value) => ['primary', 'secondary'].includes(value),
      default: 'primary'
    },

    value: {
      type: [String, Object],
      default: ''
    },

    avatar: {
      type: String,
      default: null
    },

    chipClass: {
      type: [String, Array, Object],
      default: ''
    }
  },

  computed: {
    paddingClass() {
      return this.size === 'small'
        ? 'px-2 py-[0.2rem]'
        : this.size === 'normal'
        ? 'px-2 py-2'
        : 'px-3 py-2'
    },

    chipText() {
      if (!this.value) return ''
      if (typeof this.value === 'string') return this.value
      if (typeof this.value === 'object') {
        const obj = this.value
        return obj.name ?? obj.title ?? obj.text
      }

      return ''
    }
  }
}
</script>
