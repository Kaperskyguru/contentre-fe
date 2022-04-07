<template>
  <div
    :id="`${uid}-container`"
    ref="container"
    class="group text-field"
    :class="[$attrs.class, { 'has-focus': isFocused, 'is-disabled': disabled }]"
  >
    <div
      v-if="!!label"
      class="flex items-center"
      :class="[
        {
          'text-darksilver': !isFocused & !error,
          'text-red': !!error || isOnboarding
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

    <div
      class="
        flex
        order-2
        items-center
        bg-white
        focus-within:bg-snow
        rounded
        border
        transition-all
        cursor-text
      "
      :class="[
        containerClass,
        {
          'mt-1': !!label,
          'border-red': (!disabled && !!error) || isOnboarding,
          'border-silver hover:bg-snow hover:border-warndarkgray focus-within:border-warndarkgray':
            !disabled && !error && !isOnboarding,
          'border-silver bg-warngray bg-opacity-10': !!disabled
        }
      ]"
      @click="focus"
    >
      <!-- 'border-solid border border-border-inner border-gray-200': showBorder -->
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
        :class="[
          baseClass,
          fieldClass,
          {
            uppercase: casing === 'uppercase',
            lowercase: casing === 'lowercase',
            'pl-1': !!$slots['prepend-inner'],
            'pl-3': !$slots['prepend-inner'],
            'pr-1': !!$slots['append-inner'],
            'pr-3': !$slots['append-inner']
          }
        ]"
        :type="showPassword ? 'text' : $attrs.type"
        :value="lazy ? lazyInput : model"
        v-bind="attrsButClassAndType"
        :enterkeyhint="enterkeyhint"
        :mozactionhint="enterkeyhint"
        :disabled="disabled"
        @input="onInput"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        @animationstart="onAnimationStart"
        @keydown="emitProxy('keydown', $event)"
        @click="emitProxy('click', $event)"
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
        :class="[
          baseClass,
          fieldClass,
          {
            uppercase: casing === 'uppercase',
            lowercase: casing === 'lowercase',
            'pl-1': !!$slots['prepend-inner'],
            'pl-3': !$slots['prepend-inner'],
            'pr-1': !!$slots['append-inner'],
            'pr-3': !$slots['append-inner'],
            'bg-gray-100': disabled
          }
        ]"
        v-bind="attrsButClassAndType"
        :value="lazy ? lazyInput : model"
        :enterkeyhint="enterkeyhint"
        :mozactionhint="enterkeyhint"
        :disabled="disabled"
        @input="onInput"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        @animationstart="onAnimationStart"
        @click="emitProxy('click', $event)"
        @keydown="emitProxy('keydown', $event)"
        @keypress.enter="emitProxy('keypress', $event)"
        @keypress="validateKeypress($event, lazy ? lazyInput : value)"
        @keyup="emitProxy('keyup', $event)"
        @change="emitProxy('change', $event)"
      />
      <!-- 'border-solid border border-border-inner border-gray-200':
              showBorder,
              
                      class="
          block
          py-2
          pr-12
          pl-5
          w-full
          rounded
          focus:border-body-text-color focus:outline-none
          font-gilroy font-medium
        "
              
              
               -->

      <slot name="append-inner" :isFocused="isFocused" />

      <Tooltip
        v-if="$attrs.type === 'password'"
        :label="closeEyes ? 'Show password' : 'Hide password'"
        :trigger="['hover', 'focus']"
      >
        <button
          v-if="$attrs.type === 'password'"
          type="button"
          class="
            group
            flex
            relative
            justify-center
            items-center
            mx-1
            w-8
            h-[1.6875rem]
            rounded
            outline-none
            focus:outline-none focus:ring-2
          "
          @click.prevent="togglePasswordType"
        >
          <img
            width="24"
            height="24"
            :src="closeEyes ? closedEye : openedEye"
            :alt="closeEyes ? 'Show Password' : 'Hide Password'"
            class="
              object-contain
              absolute
              mt-px
              w-6
              h-6
              opacity-40
              group-hover:opacity-100
              transition-all
            "
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
    casing: {
      default: null,
      type: String,
      validate: (value) => ['uppercase', 'lowercase'].includes(value)
    },

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

    autofocus: {
      type: Boolean,
      default: false
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
      type: [String, Object]
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

    rows: {
      default: null,
      type: [String, Number]
    },

    value: {
      default: '',
      type: [String, Number]
    },
    lazy: {
      default: false,
      type: Boolean
    },

    isOnboarding: {
      type: Boolean,
      default: false
    },

    validateKeypress: {
      default: () => {},
      type: Function
    }
  },

  data: () => ({
    baseClass:
      'flex-auto min-w-3 w-full py-2 text-black bg-transparent border-none outline-none',
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
    onAnimationStart(event) {
      if (event.animationName === 'onAutoFillStart') {
        this.isFocused = true
      } else if (event.animationName === 'onAutoFillEnd') {
        this.isFocused = false
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
.text-field {
  @apply relative grid grid-flow-row text-left;
}

.text-field input,
.text-field textarea {
  @apply min-h-[2.1875rem];
}

.text-field input[type='number']::-webkit-outer-spin-button,
.text-field input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.text-field input[type='number'] {
  -moz-appearance: textfield;
}

.text-field input:-webkit-autofill,
.text-field textarea:-webkit-autofill {
  /* HACK: Hook when auto fill is shown, so JavaScript can capture on 'animationstart'. */
  animation: onAutoFillStart 0s;

  /* HACK: Make real auto fill color transition takes all the day. */
  transition: background-color 86400s ease-in-out 0s;
}

.text-field input:not(:-webkit-autofill),
.text-field textarea:not(:-webkit-autofill) {
  /* HACK: Hook when auto fill is canceled, so JavaScript can capture on 'animationstart'. */
  animation: onAutoFillEnd 0s;
}

@keyframes onAutoFillStart {
  0%,
  100% {
    /* HACK: Empty just to ensure 'animationstart' will trigger 'onAutoFillStart'. */
  }
}

@keyframes onAutoFillCancel {
  0%,
  100% {
    /* HACK: Empty just to ensure 'animationstart' will trigger 'onAutoFillCancel'. */
  }
}
</style>
