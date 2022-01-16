<template>
  <button
    v-bind="$attrs"
    :tabindex="disabled || (active && activeAutoDisables) ? -1 : 0"
    :class="classNames"
    :disabled="disabled || waiting"
    :aria-label="waiting ? 'Please wait…' : undefined"
    v-on="$listeners"
  >
    <div v-if="waiting" class="custom-icon" role="presentation">
      <SvgLoader class="-my-px" />
    </div>

    <template v-else>
      <slot />
      <div v-if="$slots.icon" class="custom-icon" role="presentation">
        <slot name="icon" />
      </div>
    </template>
  </button>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import SvgLoader from '~/assets/img/loader.svg?inline'
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Button',

  components: {
    SvgLoader
  },

  props: {
    waiting: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    active: {
      type: Boolean,
      default: false
    },

    activeAutoDisables: {
      type: Boolean,
      default: true
    },

    appearance: {
      type: String,
      validate: (value) => ['primary', 'secondary', 'tertiary'].includes(value),
      default: 'primary'
    },

    size: {
      type: String,
      validate: (value) => ['small', 'normal', 'large'].includes(value),
      default: 'normal'
    }
  },

  computed: {
    classNames() {
      const classNames = [
        `button-${this.appearance}`,
        'items-center',
        'transition-all',
        'outline-none',
        'cursor-pointer',
        'focus:outline-none',
        'ring-offset-2',
        'focus-visible:ring-2',
        'active:shadow-inner',
        'whitespace-nowrap',
        //
        'disabled:cursor-not-allowed',
        'disabled:opacity-75',
        'font-gilroy',
        // 'mx-auto',
        'font-bold',
        'rounded',
        'text-white',
        'text-base',
        'bg-primary-teal',
        'py-4',
        'px-8',
        'sm:text-xl'
      ]

      if (this.active) {
        classNames.push('active')

        if (this.activeAutoDisables) {
          classNames.push('pointer-events-none')
        }
      }

      if (!this.hasHiddenClass && !this.hasDisplayClass) {
        classNames.push('inline-flex')
      }

      if (!this.hasTextPositioningClass) {
        classNames.push('text-center')
      }

      classNames.push(this.textSizeClass)
      classNames.push(this.justifyClass)

      if (this.disabled || this.waiting) {
        classNames.push(
          'opacity-50 pointer-events-none cursor-default active:shadow-none'
        )
      }

      classNames.push(this.heightClass)

      if (this.appearance === 'tertiary') {
        classNames.push(this.widthClass)
      } else {
        if (!this.hasPaddingXClass) classNames.push(this.paddingXClasses)
        if (!this.hasPaddingYClass) classNames.push(this.paddingYClasses)
      }

      return classNames.join(' ').trim()
    },
    heightClass() {
      return this.hasHeightClass
        ? undefined
        : this.size === 'small'
        ? 'h-6'
        : this.size === 'normal'
        ? 'h-[2.1875rem]'
        : 'h-[2.625rem]'
    },

    widthClass() {
      return this.size === 'small'
        ? 'w-6'
        : this.size === 'normal'
        ? 'w-[2.1875rem]'
        : 'w-[2.625rem]'
    },

    textSizeClass() {
      return this.hasTextSizeClass
        ? undefined
        : this.size === 'small'
        ? 'text-xs'
        : this.size === 'normal'
        ? 'text-sm'
        : this.appearance === 'tertiary'
        ? 'text-lg'
        : 'text-base'
    },

    paddingXClasses() {
      return this.size === 'small'
        ? 'px-1 lg:px-2'
        : this.size === 'normal'
        ? 'px-3 lg:px-6'
        : 'px-4'
    },

    paddingYClasses() {
      return this.size === 'small'
        ? 'py-1'
        : this.size === 'normal'
        ? 'pb-1.5 pt-[0.4375rem]'
        : 'py-2'
    },

    justifyClass() {
      return this.hasJustifyClass
        ? undefined
        : !this.$slots.icon || !this.$slots.default || this.waiting
        ? 'justify-center'
        : 'justify-between'
    },

    staticClasses() {
      return this.$attrs.class || this.$vnode?.data?.staticClass || ''
    },

    hasDisplayClass() {
      return /\b((inline-)?flex|(inline-)?grid|(inline-)?block)\b/g.test(
        this.staticClasses
      )
    },

    hasHeightClass() {
      return /\bh-\d+\b/g.test(this.staticClasses)
    },

    hasHiddenClass() {
      return /\b(^overflow-)hidden\b/g.test(this.staticClasses)
    },

    hasTextPositioningClass() {
      return /\btext-(left|right|center)\b/g.test(this.staticClasses)
    },

    hasTextSizeClass() {
      return /\btext-(2?xs|sm|base|lg|2?xl)\b/g.test(this.staticClasses)
    },

    hasJustifyClass() {
      return /\bjustify-(start|end|center|between|around|evenly)\b/g.test(
        this.staticClasses
      )
    },

    hasPaddingXClass() {
      const classes = this.staticClasses
      return /\bp(x)?-\d\b/g.test(classes)
    },

    hasPaddingYClass() {
      return /\bp(y)?-\d\b/g.test(this.staticClasses)
    }
  }
})
</script>

<style scoped>
/* .button-primary {
  @apply border rounded text-white border-black;
}

.button-primary .loader {
  @apply filter invert;
}

.button-primary:not(.active) {
  @apply bg-black;
}

.button-primary.active {
  @apply bg-opacity-90  border-opacity-90 hover:border-black hover:bg-opacity-95;
}

.button-secondary {
  @apply border rounded;
}

.button-secondary:not(.active) {
  @apply border-solid bg-transparent  hover:bg-opacity-25;
}

.button-secondary.active {
  @apply bg-none;
}

.button-tertiary {
  @apply rounded-full  hover:bg-opacity-25;
} */

.custom-icon:not(:only-child) {
  margin-left: 0.9375em;
  margin-top: -1px;
  margin-bottom: -2px;
}

.custom-icon > svg {
  width: 1.5em;
  height: 1.5em;
  fill: currentColor;
}
</style>
