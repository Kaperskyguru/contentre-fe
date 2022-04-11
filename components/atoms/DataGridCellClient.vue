<template>
  <div
    v-click-outside="onClickOutside"
    :class="{
      'inline-flex lg:w-full': !options.fakeInput
    }"
    @click="onStopPropagation($event)"
  >
    <span
      v-if="!showAutoComplete && displayClient && !options.fakeInput"
      class="
        overflow-hidden
        py-2.5
        px-3
        -my-1
        leading-snug
        text-ellipsis
        whitespace-nowrap
        rounded
        cursor-pointer
      "
      :class="[
        {
          'text-darksilver': !displayClient
        }
      ]"
      @click="onClickShowAutoComplete"
    >
      {{ displayClient }}
    </span>

    <ClientsAutocomplete
      v-if="!displayedCategory || showAutoComplete || options.fakeInput"
      :id="uid"
      v-model="selectedClient"
      :show-border="true"
      :hide-pencil-icon="hidePencilIcon"
      class="z-30 -my-2 lg:w-full"
      :class="{
        'lg:w-32': !showAutoComplete && !options.fakeInput
      }"
      :disabled="options.disabled"
      :transaction="item"
      :fake-input="options.fakeInput"
      :placeholder="defaultClientName"
      :field-class="{
        'placeholder-black': displayClient !== 'Choose a client'
      }"
      :is-input-border-enabled="options.fakeInput"
      @update:value="onUpdateClient"
      @focus="onFocusAutocomplete"
      @blur="onBlurAutocomplete"
    />
  </div>
</template>


<script>
import { nextTick } from '@nuxtjs/composition-api'
import { defineComponent } from '@vue/composition-api'
import vClickOutside from 'v-click-outside'
import BaseCell from './DataGridCellBase'

export default defineComponent({
  name: 'DataGridCellClient',

  directives: {
    clickOutside: vClickOutside.directive
  },

  extends: BaseCell,

  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    hidePencilIcon: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    selectedClient: null,
    showAutoComplete: false
  }),

  computed: {
    uid() {
      return this.$utils.uidGenerator()
    },
    defaultClientName() {
      if (this.options.fakeInput) {
        return this.item?.name ?? 'Choose a client'
      }

      return this.item?.name ?? ''
    },

    ignoreCounterparties() {
      return this.item?.name ? [this.item?.name] : null
    },

    displayClient() {
      return (
        this.selectedClient?.name ??
        this.selectedClient ??
        this.defaultClientName ??
        ''
      )
    }
  },

  watch: {
    'item.manualCounterparty'(manualCounterparty) {
      this.selectedClient = manualCounterparty
    }
  },

  mounted() {
    this.selectedClient = this.item?.name ?? this.options?.value ?? null
  },

  methods: {
    onClickShowAutoComplete() {
      if (this.disabled) return

      this.showAutoComplete = true
      this.selectedClient = this.displayClient

      nextTick(() => {
        const input = this.$el.querySelector('input')
        input?.focus()
      })
    },

    onUpdateClient(client) {
      if (client) {
        this.showAutoComplete = false
      } else {
        this.selectedClient = client
      }
    },

    onClickOutside() {
      this.showAutoComplete = false
    },

    onStopPropagation(event) {
      if (this.disabled) return
      event.preventDefault()
      event.stopPropagation()
    },

    onFocusAutocomplete() {
      this.showAutoComplete = true
    },

    onBlurAutocomplete() {
      setTimeout(() => {
        this.showAutoComplete = false
      }, 150)
    }
  }
})
</script>