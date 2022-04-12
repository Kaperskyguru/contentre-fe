<template>
  <div
    :id="`${uid}-container`"
    class="grid relative grid-flow-row text-left"
    :class="[$attrs.class, { 'is-disabled': disabled }]"
  >
    <div
      v-if="!!label"
      class="flex items-center"
      :class="[
        {
          'text-darksilver': !error,
          'text-red-500': !!error
        },
        labelClass
      ]"
    >
      <label :for="uid" class="shrink text-sm">{{ label }}</label>

      <Tooltip
        v-if="error"
        :label="error"
        :trigger="['hover', 'click', 'focus']"
        position="right"
      >
        <div
          tabindex="0"
          class="
            ml-1
            w-3
            h-3
            rounded-full
            outline-none
            ring-0
            focus:ring-2
            ring-red-500 ring-opacity-50 ring-offset-1
            transition-all
            cursor-help
          "
        >
          <IconAlertCircle
            width="12"
            height="12"
            class="object-contain w-3 h-3 fill-current"
            :aria-label="error"
          />
        </div>
      </Tooltip>
    </div>

    <div
      class="
        flex
        order-2
        items-center
        bg-white
        focus-within:bg-snow
        rounded
        border
        focus-within:ring-2
        transition-all
      "
      :class="[
        containerClass,
        {
          'mt-1': !!label,
          'border-red-500': !disabled && !!error,
          'border-silver hover:bg-snow hover:border-warndarkgray focus-within:border-warndarkgray':
            !disabled && !error,
          'border-silver bg-warngray bg-opacity-10': !!disabled
        }
      ]"
    >
      <div class="cursor-text">
        <slot name="prepend-inner" />
      </div>

      <div class="flex p-1 space-x-1 w-full">
        <Tooltip
          v-for="color of colors"
          :key="color.code"
          :label="color.name"
          position="top"
        >
          <button
            type="button"
            :style="{ background: `${color.code}80` }"
            class="
              flex-1
              h-8
              rounded
              border
              outline-none
              focus-visible:ring-1
              transition-all
            "
            :disabled="disabled"
            :aria-label="color.name"
            :class="{
              'ring-warndarkgray border-darksilver': value !== color.code,
              'ring-1 ring-black border-black': value === color.code,
              'hover:border-warndarkgray': !disabled,
              'opacity-40 pointer-events-none': disabled
            }"
            @click="onColorClick(color)"
            @keyup="onColorKeyup"
          />
        </Tooltip>
      </div>

      <slot name="append-inner" />

      <Tooltip
        v-if="clearable && !disabled"
        label="Clear"
        :trigger="['hover', 'focus']"
      >
        <button
          type="button"
          class="
            group
            flex
            relative
            flex-none
            justify-center
            items-center
            mx-1
            w-7
            h-[1.6875rem]
            rounded
            outline-none
            focus:outline-none focus:ring-2
          "
          @click.prevent="onClickClearIcon"
        >
          <img
            src="~/assets/icons/close.svg"
            alt="Clear"
            width="12"
            height="12"
            class="
              object-contain
              absolute
              mt-px
              w-3
              h-3
              opacity-40
              group-hover:opacity-100
              transition-all
            "
          />
        </button>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Tooltip from '~/components/atoms/Tooltip.vue'

export default defineComponent({
  name: 'ColorPicker',

  components: {
    Tooltip,
    IconAlertCircle: () => import('~/assets/icons/alert-circle.svg?inline')
  },

  model: {
    prop: 'value',
    event: 'update:value'
  },

  props: {
    clearable: {
      default: false,
      type: Boolean
    },

    containerClass: {
      default: '',
      type: String
    },

    disabled: {
      default: false,
      type: Boolean
    },

    error: {
      default: null,
      type: [String, Boolean]
    },

    id: {
      default: '',
      type: String
    },

    label: {
      default: null,
      type: String
    },

    labelClass: {
      default: '',
      type: String
    },

    value: {
      default: null,
      type: String
    }
  },

  emits: ['update:value', 'icon:click'],

  data() {
    return {
      colors: [
        { code: '#d6d6d6', name: 'grey' },
        { code: '#75b970', name: 'green' },
        { code: '#f3e7cf', name: 'linen' },
        { code: '#ff6955', name: 'red' },
        { code: '#958e80', name: 'brown' },
        { code: '#acdcff', name: 'blue' },
        { code: '#f6f2ab', name: 'yellow' },
        { code: '#f4f1ea', name: 'snow' },
        { code: '#ffbf84', name: 'orange' },
        { code: '#7048a3', name: 'purple' }
      ]
    }
  },

  computed: {
    uid() {
      return this.$utils.uidGenerator(this.id)
    },

    model: {
      get() {
        return this.value
      },

      set(value) {
        this.$emit('update:value', value)
      }
    }
  },

  methods: {
    onClickClearIcon() {
      this.$emit('update:value', null)
      this.$emit('icon:click')
    },

    onColorClick({ code }) {
      this.model = code
    },

    onColorKeyup(e) {
      let el = null
      if (e.code === 'ArrowLeft') {
        el =
          e.target?.previousElementSibling ??
          e.target.parentElement.lastElementChild
      } else if (e.code === 'ArrowRight') {
        el =
          e.target?.nextElementSibling ??
          e.target.parentElement.firstElementChild
      }

      el?.focus()
    }
  }
})
</script>
