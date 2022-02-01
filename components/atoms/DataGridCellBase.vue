<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'DataGridCellBase',

  props: {
    item: {
      default: null,
      type: Object
    },

    itemIndex: {
      type: Number,
      default: 0
    },

    value: {
      type: null,
      default: null
    },

    displayedValue: {
      type: null,
      default: null
    },

    options: {
      default: () => ({}),
      type: Object
    },

    column: {
      default: () => ({}),
      type: Object
    }
  }
})
</script>
