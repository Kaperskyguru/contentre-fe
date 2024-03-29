<template>
  <div class="flex flex-wrap items-center">
    <div class="flex sm:justify-center">
      <button
        class="
          flex
          justify-between
          items-center
          px-3
          h-9
          text-darksilver
          bg-primary-teal
          rounded
        "
        @click="onClickOpenFilters"
      >
        <IconFilter fill="#fff" width="20" height="15" class="mr-2" />
        <span class="text-sm text-white">Filter</span>
        <!-- hasFilter -->
        <span
          v-if="hasFilter"
          aria-atomic="true"
          :aria-label="'filters'"
          aria-live="polite"
          role="status"
          class="
            grid
            place-items-center
            ml-2
            w-2
            h-2
            text-2xs
            tracking-tighter
            leading-none
            text-white
            bg-red-500
            rounded-full
          "
        >
        </span>
      </button>
    </div>

    <LazyContentsFilters
      v-model="filtersShowFloatingPanel"
      :options="options"
      :filter-columns="filterColumns"
      :clients="clients"
      :categories="categories"
      :topics="topics"
      :tags="tags"
      :remove="remove"
      :show-sort-by="showSortBy"
      @reset="onResetFilters"
      @close-panel="onChangeFilters"
    >
      <slot />
    </LazyContentsFilters>
  </div>
</template>

<script>
export default {
  components: {
    IconFilter: () => import('~/assets/icons/filter-sharp.svg?inline')
  },

  props: {
    filterColumns: {
      type: Array,
      default: () => []
    },
    remove: {
      type: Array,
      default: () => []
    },
    clients: {
      type: [Array, Object],
      default: null
    },
    categories: {
      type: [Array, Object],
      default: null
    },

    options: {
      type: Object,
      default: () => {}
    },

    topics: {
      type: [Array, Object],
      default: null
    },
    tags: {
      type: [Array, Object],
      default: null
    },
    showSortBy: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    filtersShowFloatingPanel: false,
    filters: {}
  }),

  computed: {
    hasFilter() {
      const filter = { ...this.filters }

      return (
        Object.values(filter).filter((elem) =>
          !elem ? false : elem !== '' ? !!elem.length : true
        ).length !== 0
      )
    }
  },

  methods: {
    onClickOpenFilters() {
      this.filtersShowFloatingPanel = !this.filtersShowFloatingPanel
    },

    onResetFilters(data) {
      if (!data) return

      this.filters = data

      this.$emit('reset', this.filters)
    },

    onChangeFilters(data) {
      if (!data) return

      this.filters = data

      this.$emit('filters', this.filters)
    }
  }
}
</script>

<style>
</style>