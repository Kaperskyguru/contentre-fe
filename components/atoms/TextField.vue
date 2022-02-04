<template>
  <div class="mb-6">
    <div>
      <label
        v-if="label"
        class="
          block
          mb-2
          tracking-wide
          text-body-text-color
          font-gilroy font-medium
        "
        >{{ label }}</label
      >
      <div class="relative">
        <input
          v-if="!rows"
          :id="uid"
          ref="field"
          :value="lazy ? lazyInput : model"
          class="
            block
            py-4
            pr-12
            pl-5
            w-full
            rounded
            focus:border-body-text-color focus:outline-none
            font-gilroy font-medium
            border-solid border border-border-inner
          "
          :type="showPassword ? 'text' : $attrs.type"
          v-bind="attrsButClassAndType"
          :enterkeyhint="enterkeyhint"
          :mozactionhint="enterkeyhint"
          :disabled="disabled"
          @focusin="onFocusIn"
          @focusout="onFocusOut"
          @input="onInput"
          @keydown="emitProxy('keydown', $event)"
          @keypress.enter="emitProxy('keypress', $event)"
          @keypress="validateKeypress($event, lazy ? lazyInput : value)"
          @keyup="emitProxy('keyup', $event)"
          @change="emitProxy('change', $event)"
        />

        <textarea
          v-else
          :id="uid"
          ref="field"
          :rows="rows"
          v-bind="attrsButClassAndType"
          class="
            block
            py-3
            px-4
            mb-3
            w-full
            leading-tight
            text-gray-700
            bg-white
            rounded-lg
            focus:outline-none focus:bg-white focus:border-gray-500
            border border-gray-200
          "
          :enterkeyhint="enterkeyhint"
          :mozactionhint="enterkeyhint"
          :disabled="disabled"
          @focusin="onFocusIn"
          @focusout="onFocusOut"
          @input="onInput"
          @keydown="emitProxy('keydown', $event)"
          @keypress.enter="emitProxy('keypress', $event)"
          @keypress="validateKeypress($event, lazy ? lazyInput : value)"
          @keyup="emitProxy('keyup', $event)"
          @change="emitProxy('change', $event)"
        >
        </textarea>
        <button
          v-if="$attrs.type === 'password'"
          @click.prevent="togglePasswordType"
        >
          <img
            :src="closeEyes ? closedEye : openedEye"
            :alt="closeEyes ? 'Show Password' : 'Hide Password'"
            class="absolute top-5 right-5"
          />
        </button>
      </div>
    </div>
    <div class="mt-3">
      <div v-if="error">
        <small class="font-gilroy text-xs font-bold text-red-600">{{
          error
        }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import EyeOpen from '~/assets/img/auth-nav/eye-opened.svg'
import EyeClosed from '~/assets/img/auth-nav/eye-closed.svg'

export default {
  name: 'TextFieldTW',
  inheritAttrs: false,

  model: {
    prop: 'value',
    event: 'update:value'
  },

  props: {
    label: {
      type: String,
      default: ''
    },

    enterkeyhint: {
      default: '',
      type: String
    },

    lazy: {
      default: false,
      type: Boolean
    },

    casing: {
      type: String,
      default: ''
    },

    rows: {
      type: Number,
      default: 0
    },

    disabled: {
      type: Boolean,
      default: false
    },

    error: { default: null, type: [String, Boolean] },

    value: {
      type: [String, Number],
      default: ''
    },

    validateKeypress: {
      default: () => {},
      type: Function
    }
  },

  data: () => ({
    openedEye: EyeOpen,
    closedEye: EyeClosed,
    showPassword: false,
    lazyInput: ''
  }),

  computed: {
    uid() {
      return this.$utils.uidGenerator(this.id)
    },
    attrsButClassAndType() {
      const attrs = Object.assign({}, this.$attrs)
      delete attrs.class
      delete attrs.type
      return attrs
    },
    model: {
      get() {
        return this.value
      },

      set(value) {
        if (this.casing === 'uppercase') {
          value = value.toUpperCase()
        } else if (this.casing === 'lowercase') {
          value = value.toLowerCase()
        }

        this.emitProxy('update:value', value)
      }
    },
    closeEyes() {
      return !this.showPassword
    }
  },

  watch: {
    value: {
      handler(value) {
        if (this.lazy) {
          this.lazyInput = value
        }
      },
      immediate: true
    }
  },

  methods: {
    focus() {
      const field = this.$refs.field
      if (field) {
        field.focus()
        field.select()
      }
    },

    onFocusIn() {
      this.emitProxy('focus')
      this.isFocused = true
      if (this.lazy) {
        this.lazyInput = this.value
      }
    },

    onFocusOut(event) {
      this.emitProxy('blur', event)
      if (this.lazy && this.lazyInput && this.lazyInput !== this.value) {
        this.emitProxy('change', this.lazyInput)
        this.emitProxy('lazy:change', this.lazyInput)
      }
      this.isFocused = false
    },
    togglePasswordType() {
      this.showPassword = !this.showPassword
    },
    onInput(event) {
      if (!this.lazy) {
        const target = event.target
        if (!event || !target) return false
        if (this.model !== target.value) this.model = target.value
      } else {
        const target = event.target
        if (!event || !target) return false
        this.lazyInput = target.value
      }
    },
    emitProxy(name, args) {
      this.$emit(name, args)
    }
  }
}
</script>

<style scoped>
</style>
