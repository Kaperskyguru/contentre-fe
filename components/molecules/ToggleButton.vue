<template>
  <Button
    :waiting="waiting"
    :disabled="disabled"
    :size="size"
    :appearance="appearance"
    :active="active"
    :active-auto-disables="false"
    @click.prevent="onToggleActive"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <slot v-if="active" name="icon-active">
      <IconEye slot="icon" />
    </slot>
    <slot v-else name="icon-inactive">
      <IconEyeBlocked slot="icon" class="text-darksilver" />
    </slot>
  </Button>
</template>

<script>
import Button from '~/components/atoms/Button.vue'

export default {
  name: 'ToggleButton',

  components: {
    Button,
    IconEye: () => import('~/assets/icons/eye.svg?inline'),
    IconEyeBlocked: () => import('~/assets/icons/eye-blocked.svg?inline')
  },

  model: {
    prop: 'active',
    event: 'toggle'
  },

  props: {
    active: {
      type: Boolean,
      default: true
    },

    waiting: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    appearance: {
      type: String,
      validate: (value) => ['primary', 'secondary', 'tertiary'].includes(value),
      default: 'tertiary'
    },

    size: {
      type: String,
      validate: (value) => ['small', 'normal', 'large'].includes(value),
      default: 'normal'
    }
  },

  emits: ['toggle', 'focus', 'blur', 'mouseenter', 'mouseleave'],

  methods: {
    onToggleActive() {
      this.$emit('toggle', !this.active)
    }
  }
}
</script>
