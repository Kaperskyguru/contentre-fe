
<script>
import TextField from '~/components/atoms/TextField.vue'
const { validateKeypress, ...props } = TextField.props

export default {
  name: 'NumberField',

  extends: {
    ...TextField,

    props: {
      ...props,

      emptyUndefined: {
        default: false,
        type: Boolean
      },

      fieldClass: {
        default: 'text-right',
        type: String
      }
    }
  },

  computed: {
    separator() {
      const char = this.$n(1, 'float')[1]
      return {
        charCode: char === ',' ? 44 : 46,
        char
      }
    }
  },

  watch: {
    '$i18n.locale'() {
      if (this.lazy) {
        const fullValue = this.$n(this.convertValue(this.value), 'float')
        this.lazyInput =
          this.separator.char === ',' ? fullValue.replace('.', ',') : fullValue
      }
    },

    value: {
      handler(value) {
        if (this.lazy) {
          if (this.emptyUndefined) {
            this.lazyInput =
              !!value && value !== 0 ? this.$n(value, 'float') : ''
          } else {
            this.lazyInput = this.$n(value, 'float')
          }
        }
      },
      immediate: true
    }
  },

  methods: {
    convertValue(value) {
      let convertedValue = value
      if (this.separator.char === ',' && value && typeof value === 'string') {
        convertedValue = value.replaceAll('.', '').replaceAll(',', '.')
      }
      if (this.separator.char === '.' && value && typeof value === 'string') {
        convertedValue = value.replaceAll(',', '')
      }

      return convertedValue
    },

    validateKeypress(evt, value) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        (charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== this.separator.charCode) ||
        (charCode === this.separator.charCode &&
          value &&
          value.includes(this.separator.char))
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },

    onFocusIn() {
      this.emitProxy('focus')
      this.isFocused = true
    },

    emitProxy(name, args) {
      const defaultValue = this.emptyUndefined ? '' : 0

      switch (name) {
        case 'blur':
          if (!this.lazy && this.value) {
            this.$emit(
              'update:value',
              parseFloat(this.convertValue(this.value)) || defaultValue
            )
          }
          this.$emit(name, args)
          break
        case 'update:value':
          this.$emit(
            'update:value',
            parseFloat(this.convertValue(args)) || defaultValue
          )
          break
        case 'lazy:change':
          this.$emit(name, this.convertValue(args) || defaultValue)
          break
        case 'keypress':
          this.$emit(
            name,
            (this.lazy
              ? this.convertValue(this.lazyInput)
              : this.convertValue(this.value)) || defaultValue
          )
          break
        default:
          this.$emit(name, args)
          break
      }
    }
  }
}
</script>
