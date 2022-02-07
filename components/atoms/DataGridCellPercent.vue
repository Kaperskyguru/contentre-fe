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
        lg:overflow-hidden lg:overflow-ellipsis lg:whitespace-nowrap
      "
      :class="[
        options.class,
        { 'text-darksilver': options.style === 'secondary' }
      ]"
    >
      <div class="flex relative">
        <span
          class="pl-1"
          :class="{
            'text-green-500': isPositive,
            'text-red-500': !isPositive
          }"
          ><span v-if="isPositive">+</span>{{ options.value }}%</span
        >

        <span
          v-if="isPositive"
          class="inline-block relative text-green-500 text-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path
              class="heroicon-ui"
              d="M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z"
            ></path>
          </svg>
        </span>
        <span v-else class="inline-block relative text-red-500 text-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path
              class="heroicon-ui"
              d="M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z"
            ></path>
          </svg>
        </span>
      </div>

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
  name: 'DataGridCellPercent',

  extends: BaseCell,

  computed: {
    isPositive() {
      return this.options.value >= 0
    }
  }
})
</script>
