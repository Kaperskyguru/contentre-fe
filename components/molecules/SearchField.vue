<template>
  <TextField
    :value="value"
    appearance="secondary"
    :autofocus="autofocus"
    :placeholder="placeholder"
    container-class="border-white duration-300 !ring-0 mt-0  rounded-lg border hover:border shadow bg-purple-white"
    field-class="placeholder-darksilver"
    :clearable="!!(value && value.length)"
    @update:value="updateValue"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @keydown="$emit('keydown', $event)"
    @keypress.enter="$emit('keypress', $event)"
    @keyup="$emit('keyup', $event)"
  >
    <template #prepend-inner>
      <div class="mr-2 ml-3 text-darksilver fill-current">
        <IconSearch />
      </div>
    </template>
  </TextField>
</template>

<script>
import { debounce as debounceFunction } from '~/plugins/utils'
export default {
  name: 'SearchField',
  components: {
    IconSearch: () => import('~/assets/icons/search.svg?inline')
  },

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    placeholder: {
      type: String,
      default: ''
    },

    id: {
      default: '',
      type: String
    },

    value: {
      type: String,
      default: ''
    },

    autofocus: {
      type: Boolean,
      default: false
    }
  },

  emits: ['input', 'keydown', 'keypress', 'keyup', 'focus', 'blur'],

  methods: {
    debounceUpdate: debounceFunction(function (newValue) {
      this.$emit('input', newValue)
    }, 750),

    updateValue(value) {
      if (!value && value !== 0) {
        this.$emit('input', '')
      }
      this.debounceUpdate(value)
    }
  }
}
</script>

<style>
</style>