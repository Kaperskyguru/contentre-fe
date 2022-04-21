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
      class="
        h-full
        leading-normal
        lg:overflow-hidden lg:text-ellipsis lg:whitespace-nowrap
      "
      :class="[
        options.class,
        { 'text-darksilver': options.style === 'secondary' }
      ]"
    >
      <div class="flex relative">
        <div v-if="isIconBack">
          <span v-if="isPositive" class="inline-block relative text-green-500">
            <IncrementIcon />
          </span>
          <span v-else class="inline-block relative text-red-500">
            <DecrementIcon />
          </span>
        </div>

        <span
          class="pl-1"
          :class="{
            'text-green-500': isPositive,
            'text-red-500': !isPositive
          }"
          ><span v-if="isPositive">+</span>{{ options.value }}%</span
        >

        <div v-if="!isIconBack">
          <span
            v-if="isPositive"
            class="inline-block relative text-lg text-green-500"
          >
            <IncrementIcon />
          </span>
          <span v-else class="inline-block relative text-lg text-red-500">
            <DecrementIcon />
          </span>
        </div>
      </div>

      <small v-if="options.suffix" class="text-2xs text-red-500">
        {{ options.suffix }}
      </small>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import BaseCell from './DataGridCellBase'
import DecrementIcon from '~/assets/icons/decrement.svg?inline'
import IncrementIcon from '~/assets/icons/increment.svg?inline'

export default defineComponent({
  name: 'DataGridCellPercent',

  components: { IncrementIcon, DecrementIcon },

  extends: BaseCell,

  props: {
    isIconBack: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isPositive() {
      return this.options.value >= 0
    }
  }
})
</script>
