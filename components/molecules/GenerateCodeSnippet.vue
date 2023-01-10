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
        <P>Code Snippet Generator</P>
      </div>
      <div class="py-2 text-lg font-bold">
        <TextField
          v-model="$v.fieldTitle.$model"
          class="w-full h-full border-silver"
          :rows="3"
          placeholder="Create a function in javascript that calculates fibonacci numbers."
          label=""
          :error="getValidationMessage($v.fieldTitle)"
          autofocus
        />
      </div>

      <div class="flex justify-between text-black">
        <CheckField v-model="manualCode" @changed="onManualCode"
          >Type Code manually</CheckField
        >
        <Button :waiting="sending" @click="generate">Generate</Button>
      </div>
    </div>
  </div>
</template>
  
  <script>
import vClickOutside from 'v-click-outside'
import { CREATE_SNIPPET } from '~/graphql'
import { required, minLength } from '~/plugins/validators'
export default {
  name: 'GenerateCodeSnippet',
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

  validations: {
    honeyPot: {},
    fieldTitle: { required, minLength: minLength(2) }
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  emits: ['answer', 'update:visible'],

  data: () => ({
    visibleModel: false,
    manualCode: false,
    sending: false,
    fieldTitle: null
  }),

  watch: {
    visible: {
      immediate: true,
      handler(value) {
        this.visibleModel = value
        this.manualCode = false
      }
    }
  },

  methods: {
    onClickOutside() {
      this.visibleModel = false
    },

    onManualCode() {
      this.$emit('code', true)
      this.visibleModel = false
    },

    async generate() {
      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        const {
          data: { createSnippet: AIContent }
        } = await this.$apollo.mutate({
          mutation: CREATE_SNIPPET,
          variables: {
            input: {
              title: this.fieldTitle ?? undefined
            }
          }
        })

        this.sending = false
        this.$emit('generate', {
          title: AIContent.title,
          content: AIContent.content
        })

        this.visibleModel = false
      } catch (error) {
        if (error.message.includes('You have exceeded your snippet limit.')) {
          this.$emit('isPremium')
          this.visibleModel = false
          return
        }
        this.$toast.negative(error.message)
        this.visibleModel = false
      }
    }
  }
}
</script>
  
  <style>
</style>