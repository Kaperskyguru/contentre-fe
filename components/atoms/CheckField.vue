<template>
  <Tooltip
    :label="isPro || isUnderDevelopment ? getMessage : ''"
    :tooltip-class="isUnderDevelopment || isPro ? 'bg-red-400' : ''"
    :trigger="['hover', 'focus']"
    position="top"
  >
    <div
      :id="`${uid}-container`"
      class="check-field"
      :class="[
        $attrs.class,
        type,
        `size-${size}`,
        {
          'is-disabled': disabled || isUnderDevelopment || isPro,
          'has-focus': isFocused,
          'is-invalid': !!error,
          'check-on-right': checkOnRight,
          'check-on-left': !checkOnRight,
          checked: isChecked
        }
      ]"
    >
      <label
        class="flex text-sm cursor-pointer select-none"
        :for="uid"
        :class="labelClass"
      >
        <div
          class="
            justify-center
            items-center
            w-[30px]
            bg-transparent
            peer-checked:bg-primary-teal
            rounded
          "
        >
          <img v-if="isChecked" :src="Checked" alt="Checked" />
          <img v-else :src="Unchecked" alt="Unchecked" />
        </div>

        <span class="peer relative ml-3 font-gilroy text-base text-gray-500">
          <slot></slot>
        </span>

        <input
          :id="uid"
          ref="field"
          :type="type"
          :checked="isChecked"
          :value="value"
          v-bind="attrsButClass"
          :disabled="disabled || isUnderDevelopment || isPro"
          class="hidden absolute w-0 h-0 opacity-0 cursor-pointer"
          @input="onInput"
          @focusin="onFocusIn"
          @focusout="onFocusOut"
        />
      </label>
    </div>
  </Tooltip>
</template>

<script>
import Unchecked from '~/assets/icons/unchecked.svg'
import Checked from '~/assets/icons/checked.svg'

export default {
  name: 'CheckField',

  inheritAttrs: false,

  model: {
    prop: 'checked',
    event: 'changed'
  },

  props: {
    showLabel: {
      type: Boolean,
      default: false
    },

    isPro: { type: Boolean, default: false },
    message: {
      type: String,
      default: ''
    },

    isUnderDevelopment: {
      type: Boolean,
      default: false
    },

    labelType: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },

    checked: {
      type: [String, Number, Array, Boolean],
      default: false
    },

    value: {
      type: [String, Number, Boolean],
      default: ''
    },

    type: {
      type: String,
      validate: (value) => ['radio', 'checkbox'].includes(value),
      default: 'checkbox'
    },

    size: {
      type: String,
      validate: (value) => ['normal', 'large'].includes(value),
      default: 'normal'
    },

    error: {
      type: [Boolean, String],
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    labelClass: {
      type: String,
      default: ''
    },

    checkOnRight: {
      type: Boolean,
      default: false
    }
  },

  emits: ['changed'],

  data: () => ({
    isFocused: false,
    Unchecked,
    Checked
  }),

  computed: {
    uid() {
      return this.$utils?.uidGenerator(this.id) ?? undefined
    },

    getMessage() {
      return this.message || 'coming Soon'
    },

    attrsButClass() {
      const { class: className, ...attrs } = this.$attrs
      return attrs
    },

    isChecked() {
      if (typeof this.checked !== 'boolean' || this.type === 'radio') {
        if (!this.value) return false

        if (Array.isArray(this.checked)) {
          return this.checked.includes(this.value)
        } else {
          return this.checked === this.value
        }
      }

      return this.checked
    },

    model: {
      get() {
        return this.checked
      },

      set(value) {
        this.$emit('changed', value)
      }
    }
  },

  methods: {
    onInput(event) {
      const target = event.target
      if (!event || !target) return false
      if (Array.isArray(this.model)) {
        if (target.checked) {
          this.model = [...this.model, target.value]
        } else {
          this.model = this.model.filter((value) => value !== target.value)
        }
      } else if (target.value) {
        if (this.model !== target.value) {
          this.model = target.value
        }
      } else if (this.model !== target.checked) {
        this.model = target.checked
      }
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
    }
  }
}
</script>

<style>
.check-field {
  @apply relative  inline-flex items-center text-left p-0.5 -m-0.5 transition-all  leading-none;
}

.check-field.has-focus {
  @apply ring-2;
}

.check-field label {
  @apply flex-auto;
}

.check-field.check-on-left label {
}

.check-field.check-on-right label {
  @apply pr-1.5;
}

.check-field.is-disabled {
  @apply opacity-50;
}

.check-field:not(.is-disabled),
.check-field:not(.is-disabled) label,
.check-field:not(.is-disabled) input {
  @apply cursor-pointer;
}

.check-field:not(.is-invalid):not(.is-disabled):hover label {
  /* @apply; */
}

.check-field input {
  @apply flex-grow-0 flex-shrink-0 opacity-0;
}

.check-field.size-normal input {
  @apply w-3.5 h-3.5;
}

.check-field.size-large input {
  @apply w-3.5 h-3.5;
}

.check-field.check-on-right input {
  @apply order-1;
}

.check-field::before {
  @apply absolute flex-grow-0 flex-shrink-0 hidden  transition-all pointer-events-none;

  content: '';
}

.check-field.checkbox::before {
  @apply rounded-sm;
}

.check-field.radio::before {
  @apply rounded-full;
}

.check-field.size-normal::before {
  @apply w-3.5 h-3.5;
}

.check-field.size-large::before {
  /* @apply w-4.5 h-4.5; */
}

.check-field.check-on-left::before {
  @apply left-0.5;
}

.check-field.check-on-right::before {
  @apply right-0.5;
}

.check-field:not(:hover)::before,
.check-field:not(.has-focus)::before {
  @apply bg-white;
}

.check-field:hover:not(.is-disabled)::before,
.check-field.has-focus:not(.is-disabled)::before {
  /* @apply bg-snow; */
}

.check-field::after {
  @apply absolute flex-grow-0 flex-shrink-0 rounded-full hidden transition-all opacity-0 transform scale-0 pointer-events-none;

  content: '';
}

.check-field.size-normal::after {
  @apply w-1.5 h-1.5;
}

.check-field.size-large::after {
  @apply w-2.5 h-2.5;
}

.check-field.check-on-left::after {
  @apply left-1.5;
}

.check-field.check-on-right::after {
  @apply right-1.5;
}

.check-field:hover::after {
  /* @apply bg-warndarkgray; */
}

.check-field:not(:hover)::after,
.check-field.is-disabled::after {
  @apply bg-black;
}

.check-field.checked::after {
  @apply opacity-100 scale-100;
}

.check-field.is-invalid {
  /* @apply text-red; */
}

.check-field.is-invalid::before {
  /* @apply border-red; */
}

.check-field.is-invalid::after {
  @apply bg-red-400;
}
</style>