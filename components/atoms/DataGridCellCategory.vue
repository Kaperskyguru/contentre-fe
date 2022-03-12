<template>
  <div
    v-click-outside="onClickOutside"
    :class="{
      'inline-flex lg:w-full': !options.fakeInput
    }"
    class="cursor-default"
    @click="onStopPropagation($event)"
  >
    <span
      v-if="!showAutoComplete && displayCategory && !options.fakeInput"
      class="
        py-2.5
        px-3
        -my-1
        whitespace-nowrap
        bg-gray-100
        hover:bg-linen
        rounded
        cursor-pointer
        overflow-hidden overflow-ellipsis
      "
      :style="displayedCategoryStyle"
      @click="onClickShowAutoComplete"
    >
      {{ displayCategory }}
    </span>

    <CategoriesAutocomplete
      v-if="!displayCategory || showAutoComplete || options.fakeInput"
      :id="uid"
      v-model="selectedCategory"
      :chip-style="displayedCategoryStyle"
      :disabled="options.disabled"
      :show-border="true"
      :hide-pencil-icon="hidePencilIcon"
      class="-my-1 lg:w-full"
      :class="{
        'lg:w-32': !showAutoComplete && !options.fakeInput
      }"
      :should-update="shouldUpdate"
      :transaction="item"
      :placeholder="defaultCategoryName"
      :field-class="{
        'placeholder-black': displayCategory !== 'Choose a category'
      }"
      :fake-input="options.isGrid"
      :is-input-border-enabled="options.isGrid"
      @update:value="onUpdateCategory"
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
  name: 'DataGridCellCategory',

  directives: {
    clickOutside: vClickOutside.directive
  },

  extends: BaseCell,

  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    shouldUpdate: {
      type: Boolean,
      default: true
    },

    hidePencilIcon: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    selectedCategory: null,
    showAutoComplete: false
  }),

  computed: {
    uid() {
      return this.$utils.uidGenerator()
    },
    defaultCategoryName() {
      if (this.options.fakeInput) {
        return this.item?.name ?? 'Choose a category'
      }

      return this.item?.name ?? 'No category provided'
    },
    displayedCategoryStyle() {
      return this.item?.category?.color
        ? { background: `#${this.item.category.color}80` }
        : null
    },

    displayCategory() {
      return (
        this.selectedCategory?.name ??
        this.selectedCategory ??
        this.defaultCategoryName ??
        ''
      )
    }
  },

  watch: {
    item: {
      handler(newItem) {
        this.selectedCategory = newItem?.category
      },
      deep: true
    }
  },

  mounted() {
    this.selectedCategory = this.item?.name ?? this.options?.value ?? null
  },

  methods: {
    onClickShowAutoComplete() {
      if (this.disabled) return

      this.showAutoComplete = true
      this.selectedCategory = this.displayCategory

      nextTick(() => {
        const input = this.$el.querySelector('input')
        input?.focus()
      })
    },

    onUpdateCategory(category) {
      if (category) {
        this.showAutoComplete = false
      } else {
        this.selectedCategory = category
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