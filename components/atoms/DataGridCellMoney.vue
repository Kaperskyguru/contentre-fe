<template>
  <AccountingLabel
    :value="value"
    :currency="currency"
    :currency-before="options.currencyBefore"
  />
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import BaseCell from './DataGridCellBase'
import AccountingLabel from '~/components/molecules/AccountingLabel.vue'

export default defineComponent({
  name: 'DataGridCellMoney',

  components: {
    AccountingLabel
  },

  extends: BaseCell,

  computed: {
    currency() {
      const currencyKey = this.options.currencyKey || 'currency'
      return this.item[currencyKey] ?? this.options[currencyKey]
    }
  }
})
</script>
