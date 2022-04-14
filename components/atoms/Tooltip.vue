<template>
  <div v-fragment>
    <SlotExtender
      @click="onClick"
      @focus="onFocus"
      @blur="onBlur"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @touchend="onTouchEnd"
    >
      <slot />
    </SlotExtender>

    <Portal selector="#portal-tooltip">
      <transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-100"
        enter-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <span
          v-if="(visible && !disabled) || always"
          class="
            fixed
            z-50
            p-0.5
            px-1.5
            text-xs text-white
            whitespace-nowrap
            bg-darksilver
            rounded-sm
            pointer-events-none
          "
          :class="[
            {
              'mb-1.5 -translate-x-1/2': position === 'top',
              'mt-1.5 -translate-x-1/2': position === 'bottom',
              'mr-1.5 -translate-y-1/2': position === 'left',
              'ml-1.5 -translate-y-1/2': position === 'right'
            },
            tooltipClass
          ]"
          :style="absolutePosition"
        >
          {{ label }}
        </span>
      </transition>
    </Portal>
  </div>
</template>

<script>
import fragment from 'vue-frag'
import SlotExtender from 'vue-vnode-syringe'
import { Portal } from '@linusborg/vue-simple-portal'

export default {
  name: 'ToolTip',

  directives: {
    fragment
  },

  components: {
    Portal,
    SlotExtender
  },

  props: {
    position: {
      type: String,
      default: 'bottom'
    },

    label: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    },

    always: {
      type: Boolean,
      default: false
    },

    trigger: {
      type: Array,
      default: () => ['click', 'hover', 'focus']
    },

    tooltipClass: {
      type: String,
      default: undefined
    }
  },

  data: () => ({
    visible: false,
    absolutePosition: null
  }),

  methods: {
    updateAbsolutePosition() {
      if (!this.$el?.frag) return null

      let wrapper
      const frags = [...this.$el?.frag].filter(
        (el) => !(el instanceof Text || el instanceof Comment)
      )

      while (frags.length) {
        wrapper = frags.pop()
        if (wrapper.getBoundingClientRect) break
      }

      if (!wrapper) return null

      const { top, left, width, height, bottom } =
        wrapper.getBoundingClientRect()

      if (this.position === 'right')
        this.absolutePosition = {
          top: `${top + height / 2}px`,
          left: `${left + width}px`
        }
      else if (this.position === 'left')
        this.absolutePosition = {
          top: `${top + height / 2}px`,
          right: `${left + width}px`
        }
      else if (this.position === 'top')
        this.absolutePosition = {
          left: `${left + width / 2}px`,
          bottom: `${window.innerHeight - bottom + height}px`
        }
      else
        this.absolutePosition = {
          left: `${left + width / 2}px`,
          top: `${top + height}px`
        }
    },

    async show() {
      this.updateAbsolutePosition()
      await this.$nextTick()
      this.visible = true
    },

    async hide() {
      await this.$nextTick()
      this.visible = false
    },

    onMouseEnter() {
      if (this.trigger.includes('hover')) {
        this.show()
      }
    },

    onMouseLeave() {
      if (this.trigger.includes('hover')) {
        this.hide()
      }
    },

    onTouchEnd() {
      setTimeout(() => {
        this.hide()
      }, 50)
    },

    onClick() {
      if (this.trigger.includes('click')) {
        if (!this.visible) this.show()
      }
    },

    onFocus() {
      if (this.trigger.includes('focus')) {
        this.show()
      }
    },

    onBlur() {
      if (this.trigger.includes('focus')) {
        this.hide()
      }
    }
  }
}
</script>
