<template>
  <Tooltip
    :disabled="!to || isRemoteURL || size !== 'small'"
    :label="$t('logo.backToHome')"
    position="right"
  >
    <component
      :is="!!to ? 'a' : 'strong'"
      :href="to"
      class="
        inline-flex
        py-2
        px-0.5
        -m-0.5
        leading-none
        rounded
        outline-none
        focus-visible:ring-2
        ring-offset-2
        transition-all
      "
      :class="{
        group: !!to && !isRemoteURL,
        'hover:text-warndarkgray': !!to && isRemoteURL
      }"
      @click="onClick"
    >
      <!-- <transition
        enter-active-class="transition-all duration-300 ease-out origin-left transform-gpu"
        leave-active-class="transition-all duration-100 ease-in origin-left transform-gpu"
        enter-class="scale-0 opacity-0"
        leave-to-class="scale-0 opacity-0"
        mode="out-in"
      >
        <div v-if="size === 'small'" class="relative" :class="containerClass">
          <SvgLogoSmall
            key="logo-small"
            fill="currentColor"
            aria-label="Airbank"
            class="absolute w-full h-auto opacity-100 group-hover:opacity-0 group-focus-visible:opacity-0 transition-all transform-gpu"
            :width="width"
            :height="height"
          />

          <IconArrowBack
            class="absolute h-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all transform-gpu translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0"
          />
        </div>

        <div v-else class="relative" :class="containerClass">
          <SvgLogoFull
            key="logo-full"
            fill="currentColor"
            aria-label="Airbank"
            class="absolute w-full h-auto opacity-100 group-hover:opacity-0 group-focus-visible:opacity-0 transition-all transform-gpu"
            :width="width"
            :height="height"
          />

          <div
            v-if="!!to"
            class="flex absolute justify-center items-center space-x-2 w-full h-full opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all transform-gpu translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0"
          >
            <IconArrowBack class="flex-none h-6" />
            <span class="flex-none text-[1.0625rem] font-bold text-black">
              {{ $t('logo.home') }}
            </span>
          </div>
        </div>
      </transition> -->
    </component>
  </Tooltip>
</template>

<script>
import Tooltip from '~/components/atoms/Tooltip.vue'
// import IconArrowBack from '~/assets/icons/arrow-back.svg?inline'
// import SvgLogoFull from '~/assets/images/logo-full.svg?inline'
// import SvgLogoSmall from '~/assets/images/logo-small.svg?inline'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Logo',

  components: {
    Tooltip
    // IconArrowBack,
    // SvgLogoFull,
    // SvgLogoSmall
  },

  props: {
    to: {
      type: String,
      default: ''
    },

    size: {
      type: String,
      validate: (value) => ['small', 'normal', 'large'].includes(value),
      default: 'normal'
    },

    custom: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  computed: {
    width() {
      return this.size === 'normal' ? 98 : this.size === 'large' ? 118 : 22
    },

    height() {
      return this.size === 'large' ? 24 : 20
    },

    containerClass() {
      return this.size === 'normal'
        ? 'w-[6.125rem] h-5'
        : this.size === 'large'
        ? 'w-[7.375rem] h-6'
        : 'w-5.5 h-5'
    },

    isRemoteURL() {
      return (
        !!this.to &&
        (this.to.startsWith('http://') || this.to.startsWith('https://'))
      )
    }
  },

  methods: {
    onClick(event) {
      this.$emit('click', event, this.to || null)
      if (this.custom) return true

      event.preventDefault()
      if (!this.to) return false

      if (this.isRemoteURL) {
        location.replace(this.to)
      } else {
        this.$router.push(this.to)
      }
    }
  }
}
</script>
