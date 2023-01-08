<!-- eslint-disable tailwindcss/enforces-negative-arbitrary-values -->
<template>
  <div
    v-if="visibleModel"
    v-click-outside="onClickOutside"
    x-transition:enter="transition ease-out duration-100"
    x-transition:enter-start="transform opacity-0 scale-95"
    x-transition:enter-end="transform opacity-100 scale-100"
    x-transition:leave="transition ease-in duration-75"
    x-transition:leave-start="transform opacity-100 scale-100"
    x-transition:leave-end="transform opacity-0 scale-95"
    class="
      absolute
      top-auto
      -left-[10px]
      z-[100]
      p-3
      mt-2
      w-96
      bg-white
      dark:bg-gray-800
      rounded-lg
      border border-btn-green
      dark:border-transparent
      shadow-lg
      drop-shadow
    "
  >
    <div class="">
      <div class="flex space-x-2 text-black">
        <WriteIcon />
        <P>Magic Write</P>
      </div>
      <div class="py-2 text-lg font-bold">
        <TextField
          class="w-full h-full"
          :show-border="false"
          :rows="3"
          autofocus
          @keypress="generateIdeas"
        />
      </div>
      <div class="text-black"><p>Press the return key</p></div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'GenerateIdea',
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    WriteIcon: () => import('~/assets/icons/editor/write.svg?inline')
  },

  model: {
    prop: 'visible',
    event: 'update:visible'
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  emits: ['answer', 'update:visible'],

  data: () => ({
    visibleModel: false
  }),

  watch: {
    visible: {
      immediate: true,
      handler(value) {
        this.visibleModel = value
      }
    }
  },

  methods: {
    onClickOutside() {
      this.visibleModel = false
    },

    generateIdeas() {
      this.$emit('generate')
    }
  }
}
</script>

<style>
</style>