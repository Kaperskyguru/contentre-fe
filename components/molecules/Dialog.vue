<template>
  <Portal selector="#portal-dialog">
    <transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-300"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        role="presentation"
        class="
          grid
          fixed
          top-0
          left-0
          z-40
          place-items-center
          w-full
          h-full
          backdrop-blur
          bg-gray-500 bg-opacity-50
        "
        @click.prevent="closeByBackdrop"
      >
        <transition
          appear
          enter-active-class="transition-transform duration-500 transform-gpu"
          enter-class="translate-y-full"
        >
          <div
            v-if="visible"
            ref="dialog"
            role="dialog"
            class="
              items-center
              py-8
              px-6
              w-full
              bg-white
              rounded-lg
              border
              outline-none
              shadow-lg
              md:py-10 md:px-8
              lg:px-12
            "
            :class="{
              'flex flex-col': $slots.icon,
              ' max-w-5xl my-10': isLarge,
              ' max-w-md': !isLarge
            }"
            tabindex="0"
            @click.stop
          >
            <div v-if="$slots.icon" class="mb-8">
              <slot name="icon" />
            </div>

            <div
              :class="{ 'text-sm md:text-base text-center': $slots.icon }"
              class="pb-8"
            >
              <slot />
            </div>

            <div
              v-if="primaryText || secondaryText"
              class="mt-8 space-x-3 text-center"
            >
              <Button
                v-if="secondaryText"
                appearance="secondary"
                class="min-w-30"
                @click="answer(false)"
              >
                {{ secondaryText }}
              </Button>

              <Button v-if="primaryText" class="min-w-30" @click="answer(true)">
                {{ primaryText }}
              </Button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Portal>
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal'
import { defineComponent } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button.vue'

export default defineComponent({
  name: 'DialogBox',

  components: {
    Button,
    Portal
  },

  model: {
    prop: 'visible',
    event: 'update:visible'
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isLarge: {
      type: Boolean,
      default: false
    },
    secondaryText: {
      type: String,
      default: ''
    },

    primaryText: {
      type: String,
      default: ''
    }
  },

  emits: ['answer', 'update:visible'],

  watch: {
    async visible(value) {
      await this.$nextTick()

      if (value) {
        document.addEventListener('keyup', this.closeByKey)

        const dialog = this.$refs.dialog
        if (dialog && dialog.focus) dialog.focus()
        else if (dialog && dialog.$el && dialog.$el.focus) dialog.$el.focus()
      } else {
        document.removeEventListener('keyup', this.closeByKey)
      }
    },
    $route: 'closeByChangeRoute'
  },

  visibleDialog: {
    get() {
      return this.visible
    },

    set(value) {
      this.$emit('update:visible', value)
    }
  },

  destroyed() {
    document.removeEventListener('keyup', this.closeByKey)
  },

  methods: {
    closeByBackdrop() {
      // if (this.secondaryText) {
      this.answer(false)
      // }
    },

    closeByKey(event) {
      if (event.keyCode === 13 && this.primaryText) {
        this.answer(true)
      } else if (event.keyCode === 27 && this.secondaryText) {
        this.answer(false)
      }
    },

    closeByChangeRoute() {
      this.$emit('update:visible', false)
    },

    answer(value) {
      this.$emit('answer', value)
      this.$emit('update:visible', false)
    },

    close(event) {
      if (!event.keyCode || event.keyCode === 27) {
        this.answer(false)
      }
    }
  }
})
</script>
