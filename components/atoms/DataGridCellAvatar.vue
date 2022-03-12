<template>
  <span>
    <a v-if="options.url" :href="options.url" target="_blank">
      <span
        class="
          inline-grid
          grid-flow-col
          auto-cols-max
          gap-2
          items-center
          lg:gap-1.5
          xl:gap-2
        "
        :class="{
          '-my-3': !!options.icon && isImageValid,
          '-my-2': !options.icon && !isImageValid
        }"
      >
        <picture
          class="
            flex
            overflow-hidden
            relative
            flex-initial
            shrink-0
            justify-center
            items-center
            p-2
            w-9
            h-9
            text-sm
            bg-lavander
            rounded-full
            border-gray-700 border border-opacity-25
          "
          :class="{
            'top-2': !!options.icon && isImageValid
          }"
        >
          <img
            v-if="options.icon && isImageValid"
            :src="options.icon"
            :alt="options.name || value"
            :title="options.name"
            width="35"
            height="35"
            class="object-contain absolute w-full h-full"
            @error="imgError"
          />

          <template v-else>
            <small>{{ (options.value || '').substring(0, 1) }}</small>
            <small v-if="(options.value || '').includes(' ')">
              {{ (options.value || '').split(' ').pop().substring(0, 1) }}
            </small>
          </template>
        </picture>

        <span
          class="relative mt-px break-words"
          :class="[
            options.class,
            {
              'text-darksilver': options.style === 'secondary',
              'top-1.5': !!options.icon && isImageValid
            }
          ]"
        >
          {{ options.value }}

          <small v-if="options.suffix" class="text-2xs text-red">
            {{ options.suffix }}
          </small>
        </span>
      </span>
    </a>
    <span
      v-else
      class="
        inline-grid
        grid-flow-col
        auto-cols-max
        gap-2
        items-center
        lg:gap-1.5
        xl:gap-2
      "
      :class="{
        '-my-3': !!options.icon && isImageValid,
        '-my-2': !options.icon && !isImageValid
      }"
    >
      <picture
        class="
          flex
          overflow-hidden
          relative
          flex-initial
          shrink-0
          justify-center
          items-center
          p-2
          w-9
          h-9
          text-sm
          bg-lavander
          rounded-full
          border-gray-700 border border-opacity-25
        "
        :class="{
          'top-2': !!options.icon && isImageValid
        }"
      >
        <img
          v-if="options.icon && isImageValid"
          :src="options.icon"
          :alt="options.name || value"
          :title="options.name"
          width="35"
          height="35"
          class="object-contain absolute w-full h-full"
          @error="imgError"
        />

        <template v-else>
          <small>{{ (options.value || '').substring(0, 1) }}</small>
          <small v-if="(options.value || '').includes(' ')">
            {{ (options.value || '').split(' ').pop().substring(0, 1) }}
          </small>
        </template>
      </picture>

      <span
        class="relative mt-px break-words"
        :class="[
          options.class,
          {
            'text-darksilver': options.style === 'secondary',
            'top-1.5': !!options.icon && isImageValid
          }
        ]"
      >
        {{ options.value }}

        <small v-if="options.suffix" class="text-2xs text-red">
          {{ options.suffix }}
        </small>
      </span>
    </span>
  </span>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import BaseCell from './DataGridCellBase'

export default defineComponent({
  name: 'DataGridCellAvatar',

  extends: BaseCell,

  data: () => ({
    isImageValid: true
  }),

  methods: {
    imgError(event) {
      event.target.style.visibility = 'hidden'
      this.isImageValid = false
    }
  }
})
</script>
