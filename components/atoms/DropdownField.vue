<template>
  <div
    :id="`${uid}-container`"
    class="dropdown-field"
    :class="[
      $attrs.class,
      { 'has-focus': isFocused, 'is-disabled': disabled, 'has-label': !!label }
    ]"
  >
    <div
      v-if="!!label"
      class="flex items-center"
      :class="[
        {
          'text-darksilver': !isFocused & !error,
          'text-red-500': !!error
        },
        labelClass
      ]"
    >
      <label :for="uid" class="shrink mb-1">{{ label }}</label>

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
            ring-opacity-50 ring-offset-1
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

    <select
      :id="uid"
      ref="field"
      class="
        block
        py-2
        pr-12
        pl-5
        w-full
        rounded
        border
        focus:border-body-text-color
        outline-none
        focus:outline-none
      "
      :class="[
        {
          'border-red-500': !disabled && !!error,
          'border-silver hover:bg-snow hover:border-warndarkgray focus-within:border-warndarkgray':
            !disabled && !error,
          'bg-gray-500 bg-opacity-10': !!disabled,
          '!bg-linen !border-0 py-0 focus:!ring-0 home': !!home
        },
        fieldClass
      ]"
      :value="value"
      v-bind="attrsButClass"
      :enterkeyhint="enterkeyhint"
      :mozactionhint="enterkeyhint"
      :disabled="disabled"
      required
      @input="onInput"
      @focusin="onFocusIn"
      @focusout="onFocusOut"
    >
      <option v-if="placeholder" disabled selected value="">
        {{ placeholder }}
      </option>
      <slot>
        <option
          v-for="(item, itemIndex) in items"
          :key="itemIndex"
          :value="item[valueKey]"
        >
          {{ item[titleKey] }}
        </option>
      </slot>
    </select>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Tooltip from '~/components/atoms/Tooltip.vue'

export default defineComponent({
  name: 'DropdownField',

  components: {
    Tooltip,
    IconAlertCircle: () => import('~/assets/icons/alert-circle.svg?inline')
  },

  inheritAttrs: false,

  model: {
    prop: 'value',
    event: 'update:value'
  },

  props: {
    home: {
      default: false,
      type: Boolean
    },

    disabled: {
      default: false,
      type: Boolean
    },

    enterkeyhint: {
      default: '',
      type: String
    },

    error: {
      default: null,
      type: [String, Boolean]
    },

    fieldClass: {
      default: '',
      type: String
    },

    id: {
      default: '',
      type: String
    },

    label: {
      default: null,
      type: String
    },

    autofocus: {
      type: Boolean,
      default: false
    },

    labelClass: {
      default: 'text-sm',
      type: String
    },

    placeholder: {
      default: '',
      type: String
    },

    value: {
      default: '',
      type: String
    },

    items: {
      default: () => [],
      type: Array
    },

    valueKey: {
      default: 'id',
      type: String
    },

    titleKey: {
      default: 'name',
      type: String
    }
  },

  emits: ['update:value'],

  data: () => ({
    isFocused: false
  }),

  computed: {
    uid() {
      return this.$utils.uidGenerator(this.id)
    },

    attrsButClass() {
      const attrs = Object.assign({}, this.$attrs)
      delete attrs.class
      return attrs
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

  mounted() {
    this.checkAutofocusField()
  },

  methods: {
    onInput(event) {
      const target = event.target
      if (!event || !target) return false
      const selected = target.options[target.options.selectedIndex].value
      if (this.model !== selected) this.model = selected
    },

    onFocusIn() {
      this.isFocused = true
    },

    onFocusOut() {
      this.isFocused = false
    },

    focus() {
      const field = this.$refs.field
      field && field.focus()
    },

    checkAutofocusField() {
      if (this.autofocus) {
        const field = this.$el.querySelector('select')
        field?.focus()
      }
    }
  }
})
</script>

<style scoped>
.dropdown-field {
  @apply relative grid grid-flow-row text-left;
}

.dropdown-field select {
  @apply text-gray-600 min-h-[2.1875rem] pr-8;

  appearance: none;
  background-image: url('~/assets/icons/arrow-down.svg');
  background-position: calc(100% - 0.8rem) 50%;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}

.dropdown-field select,
.dropdown-field label::before {
  @apply inline-flex items-center relative transition-transform filter blur-0;

  font-family: inherit;
  line-height: inherit;
  color: inherit;
  transform-origin: inherit;
  content: attr(data-content);
  backface-visibility: hidden;
}

.dropdown-field select:invalid,
.dropdown-field option[value=''] {
}

.home {
  @apply !text-black;
}

.dropdown-field:not(.has-focus) select:valid {
  @apply text-black;
}

.dropdown-field.has-focus select:valid {
  @apply text-black;
}

.dropdown-field option:not([value='']) {
  @apply text-black;
}
</style>
