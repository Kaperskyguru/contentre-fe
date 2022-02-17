<template>
  <div class="mb-6">
    <div
      v-if="!!label"
      class="flex items-center"
      :class="[
        {
          'text-darksilver': !isFocused & !error,
          'text-red': !!error
        },
        labelClass
      ]"
    >
      <!-- <label :for="uid" class="shrink text-sm">{{ label }}</label> -->

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
            transition-all
            cursor-help
            ring-opacity-50 ring-offset-1
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
      <div
        class="
          flex
          relative
          order-2
          items-center
          bg-white
          rounded
          transition-all
          cursor-text
        "
        :class="[
          containerClass,
          {
            'mt-1': !!label,
            'border-red': !disabled && !!error,
            'border-silver hover:bg-snow hover:border-warndarkgray focus-within:border-warndarkgray':
              !disabled && !error,
            'border-silver bg-warngray bg-opacity-10': !!disabled
          }
        ]"
        @click="focus"
      >
        <div
          v-if="$slots['prepend-inner']"
          class="flex-auto cursor-text"
          :class="{ 'overflow-hidden min-w-8 max-w-2/5': isFocused }"
          @click="focus"
        >
          <slot name="prepend-inner" />
        </div>
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
          "
          :class="{
            'border-solid border border-border-inner border-gray-200':
              showBorder
          }"
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
            py-4
            pr-12
            pl-5
            w-full
            rounded
            focus:border-body-text-color focus:outline-none
            font-gilroy font-medium
          "
          :class="{
            'border-solid border border-border-inner border-gray-200':
              showBorder,
            'border-none': !showBorder,
            'bg-gray-100': disabled
          }"
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
        <slot name="append-inner" :isFocused="isFocused" />
        <Tooltip
          v-if="$attrs.type === 'password'"
          label=""
          :trigger="['hover', 'focus']"
        >
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
        </Tooltip>

        <Tooltip v-if="clearable" label="Clear" :trigger="['hover', 'focus']">
          <button
            type="button"
            class="
              group
              flex
              relative
              flex-none
              shrink-0
              justify-center
              items-center
              mr-1
              w-7
              h-[1.6875rem]
              rounded
              outline-none
              focus:outline-none focus:ring-2
            "
            @click.prevent="onIconClick('clear')"
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
    <div class="mt-3">
      <div v-if="error">
        <small class="ml-5 font-gilroy text-xs font-bold text-red-600">{{
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

  components: {
    IconAlertCircle: () => import('~/assets/icons/alert-circle.svg?inline')
  },
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

    containerClass: {
      default: '',
      type: String
    },

    showBorder: {
      default: true,
      type: Boolean
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

    labelClass: {
      default: '',
      type: String
    },

    clearable: {
      default: false,
      type: Boolean
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
    lazyInput: '',
    isFocused: false
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

    onIconClick(type) {
      switch (type) {
        case 'showPassword':
          this.showPassword = !this.showPassword
          break
        case 'clear':
          if (this.lazy) {
            this.lazyInput = null
            this.emitProxy('lazy:change', null)
          } else {
            this.emitProxy('update:value', '')
          }
      }

      this.emitProxy('icon:click')
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
