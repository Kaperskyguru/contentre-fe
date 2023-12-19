<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AccountingLabel',

  props: {
    value: {
      type: [Number, String],
      default: null
    },

    currency: {
      type: String,
      default: ''
    },

    currencyBefore: {
      type: Boolean,
      default: false
    }
  },

  render(createElement) {
    const value = this.value || 0
    const isNumber = Number.isInteger(value)
    const formattedValue = isNumber
      ? new Intl.NumberFormat().format(value)
      : this.$n(value, 'float')

    const innerHTML = formattedValue.replace(
      /[-.,]/g,
      (v) => `<span class="font-sans tracking-tight">${v}</span>`
    )

    const valueNode = createElement('span', {
      class: 'whitespace-nowrap font-mono',
      domProps: { innerHTML }
    })

    if (this.currency) {
      return createElement(
        'span',
        {
          class: `${
            this.currencyBefore ? 'flex' : 'flex-inline justify-end'
          } items-baseline space-x-1 lg:space-x-1.5 xl:space-x-2`
        },
        [
          valueNode,
          createElement(
            'small',
            {
              class: `${
                !this.currencyBefore ? 'text-sm ' : 'text-base '
              }text-darksilver`
            },
            this.currency
          )
        ][this.currencyBefore ? 'reverse' : 'sort']()
      )
    }

    return valueNode
  }
})
</script>
