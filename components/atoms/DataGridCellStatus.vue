<template>
  <div
    class="
      inline-flex
      -my-2
      space-x-2
      lg:items-baseline lg:space-x-1 lg:w-full
      xl:space-x-2
    "
    :class="[
      {
        'items-center': options.type === 'icon',
        'items-baseline': options.type === 'image'
      }
    ]"
  >
    <Tooltip
      v-if="(options.file || options.url) && !options.link"
      :label="options.name || options.value"
      :trigger="['hover', 'click']"
    >
      <img
        v-if="(options.file || options.url) && !options.link"
        :src="options.file || options.url"
        :alt="options.name || options.value"
        :width="
          options.type === 'icon' ? options.size || 10 : options.size || 20
        "
        :height="
          options.type === 'icon' ? options.size || 10 : options.size || 20
        "
        class="object-contain relative"
        :class="{
          '-mt-1 lg:mt-0': options.type === 'icon' && options.size,
          'w-2.5 h-2.5': options.type === 'icon' && !options.size,
          'top-1 w-5 h-5': options.type === 'image' && !options.size
        }"
        :style="{
          top: options.size
            ? `${options.size / (options.size / 2)}px`
            : undefined
        }"
      />
    </Tooltip>

    <div
      class="h-full"
      :class="[
        options.class,
        { 'text-darksilver': options.style === 'secondary' }
      ]"
    >
      <span
        class="py-2 px-3 text-xs capitalize"
        :class="{
          'bg-green-200 text-green-600 rounded-lg': isGreen,
          'text-red-600 bg-red-200 rounded-lg': isRed
        }"
        >{{ options.value }}</span
      >

      <small v-if="options.suffix" class="text-2xs text-red">
        {{ options.suffix }}
      </small>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import BaseCell from './DataGridCellBase'

export default defineComponent({
  name: 'DataGridCellStatus',

  extends: BaseCell,

  computed: {
    isGreen() {
      const arr = ['online', 'ACTIVE', 'PUBLISHED']
      return arr.includes(this.options.value)
    },

    isRed() {
      const arr = ['DELETED', 'DRAFT', 'INACTIVE']
      return arr.includes(this.options.value)
    }
  }
})
</script>
