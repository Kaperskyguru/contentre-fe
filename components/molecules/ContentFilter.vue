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
      :filter-columns="filterColumns"
      :show-sort-by="showSortBy"
      @close-panel="onChangeFilters"
    />
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

      delete filter.expense
      delete filter.legalEntityIds

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