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
          v-model="$v.fieldTitle.$model"
          class="w-full h-full"
          :rows="3"
          autofocus
          :error="getValidationMessage($v.fieldTitle)"
        />
      </div>
      <div class="flex justify-end">
        <Button :waiting="sending" @click="generateIdeas">Generate</Button>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import { required, minLength } from '~/plugins/validators'
import { GENERATE_WITH_AI } from '~/graphql'
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

  validations: {
    honeyPot: {},
    fieldTitle: { required, minLength: minLength(2) }
  },

  emits: ['answer', 'update:visible'],

  data: () => ({
    visibleModel: false,
    sending: false,
    fieldTitle: null
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

    async generateIdeas() {
      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        const {
          data: { generateWithAI: AIContent }
        } = await this.$apollo.query({
          query: GENERATE_WITH_AI,
          variables: {
            input: {
              title: this.fieldTitle ?? undefined
            }
          }
        })

        this.sending = false
        this.visibleModel = false
        this.$emit('generate', {
          title: AIContent.title,
          content: AIContent.content
        })
      } catch (error) {
        if (error.message.includes('Generate idea is a premium')) {
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