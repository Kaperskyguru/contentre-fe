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
      v-if="options.link"
      :label="options.name || options.value"
      :trigger="['hover', 'focus', 'click']"
    >
      <a
        :href="options.url"
        target="_new"
        class="
          block
          relative
          rounded
          outline-none
          focus:ring-2 focus:ring-offset-4
          transition-all
        "
        :style="{
          top: options.size
            ? `${options.size / (options.size / 4)}px`
            : undefined
        }"
        @click.stop
      >
        <img
          v-if="options.file || options.url"
          :src="options.file || options.url"
          :alt="options.name || options.value"
          :width="
            options.type === 'icon' ? options.size || 10 : options.size || 20
          "
          :height="
            options.type === 'icon' ? options.size || 10 : options.size || 20
          "
          class="object-contain"
          :class="{
            '-mt-1 lg:mt-0': options.type === 'icon' && options.size,
            'w-2.5 h-2.5': options.type === 'icon' && !options.size,
            'top-1 w-5 h-5': options.type === 'image' && !options.size
          }"
        />
      </a>
    </Tooltip>

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
      {{ options.value }}

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
  name: 'DataGridCellIcon',

  extends: BaseCell
})
</script>
