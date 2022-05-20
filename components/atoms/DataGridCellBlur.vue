<template>
  <span class="w-full text-darksilver blur-sm select-none">
    {{ $utils.stringGenerateRandom(options.length) }}
  </span>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import BaseCell from './DataGridCellBase'

export default defineComponent({
  name: 'DataGridCellBlur',

  extends: BaseCell
})
</script>
