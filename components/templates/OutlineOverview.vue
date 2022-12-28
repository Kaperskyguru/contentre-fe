<template>
  <span v-fragment>
    <section
      class="
        flex flex-col
        justify-between
        mb-6
        space-y-6 space-x-0
        md:flex-row md:space-y-0 md:space-x-5
      "
    >
      <div>
        <ContentFilter
          :remove="removeFilters"
          :filter-columns="sortColumns"
          @filters="onFilters"
        />
      </div>

      <div class="basis-4/5">
        <SearchField
          id="search"
          v-model="filters.terms"
          placeholder="Search by title..."
        />
      </div>

      <div>
        <Button
          appearance="primary"
          type="link"
          :to="{ name: 'contents/add', query: { type: 'outline' } }"
        >
          Create Outline
        </Button>
      </div>
    </section>

    <!-- table -->
    <section class="mt-5">
      <div class="bg-white">
        <div class="container px-4 mx-auto">
          <div class="overflow-x-auto px-4 -mx-4 h-screen sm:-mx-8">
            <DataGrid
              :columns="columns"
              :checked.sync="computedChecked"
              :items="outlines.items"
              :total="outlines.total"
              :loading="$apollo.queries.outlines.loading"
              :item-clickable="true"
              @load-more-data="fetchMore"
              @item-click="onItemClick"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- end of table -->

    <Dialog v-model="isUpgradeModalVisible" :is-large="true">
      <UpgradeModal @back="back">You've hit your content limit</UpgradeModal>
    </Dialog>
  </span>
</template>
  
  <script>
import fragment from 'vue-frag'
import { mapState } from 'vuex'
import { currentUser } from '~/components/mixins'
import { GET_OUTLINES } from '~/graphql'
export default {
  name: 'ContentOverview',
  directives: {
    fragment
  },
  mixins: [currentUser],
  props: {
    onBoarded: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    contentId: null,
    isUpgradeModalVisible: false,
    searchedTerm: '',
    num: 0,
    filters: {},
    removeFilters: ['client', 'category', 'amount'],
    sortColumns: [
      { name: 'Title', key: 'title' },
      { name: 'Updated', key: 'lastUpdated' }
    ],
    outlines: {
      items: [],
      total: 0
    }
  }),

  computed: {
    ...mapState({
      subscription: (state) => {
        return state.subscription.subscription
      },
      totalNumber: (state) => {
        return state.subscription.numberOfContents ?? 0
      }
    }),
    hasExceededContent() {
      const subValue = this.$utils.getFeatureValue(
        this.subscription,
        'TOTAL_CONTENTS'
      )
      if (subValue === 0) return false
      return this.totalNumber >= subValue
    },
    computedChecked: {
      get() {
        return this.checked
      },
      set(value) {
        this.$emit('update:checked', value)
      }
    },
    columns() {
      return [
        {
          title: 'Title',
          key: 'title',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getTitleComponentOptions
        },

        {
          title: 'Updated',
          key: 'lastUpdated',
          titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getLastUpdatedComponentOptions
        }
      ]
    }
  },

  apollo: {
    outlines: {
      query: GET_OUTLINES,
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          size: 30,
          skip: 0,
          filters: {
            terms: this.filters?.terms,
            ...this.filters
          }
        }
      },
      update(data) {
        return {
          items: data.getOutlines.outlines,
          total: data.getOutlines.meta.total
        }
      }
    }
  },

  methods: {
    back() {
      this.isUpgradeModalVisible = false
    },
    onItemClick({ id }) {
      return this.$router.push({
        path: `/contents/add`,
        query: {
          id,
          type: 'outline'
        }
      })
    },
    onFilters(v) {
      this.filters = {
        ...this.filters,
        ...v
      }
    },
    fetchMore(sizeAndSkip) {
      const itemsKey = 'outlines'
      const queryName = 'getOutlines'
      this.$apollo.queries.outlines.fetchMore({
        // New variables
        variables: {
          ...sizeAndSkip,
          filters: this.filters
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newItems =
            ((fetchMoreResult ?? {})[queryName] ?? {})[itemsKey] ?? []
          const oldItems =
            ((previousResult ?? {})[queryName] ?? {})[itemsKey] ?? []

          return {
            [queryName]: {
              ...fetchMoreResult[queryName],
              [itemsKey]: [...oldItems, ...newItems]
            }
          }
        }
      })
    },

    getTitleComponentOptions({ title, url }) {
      return title
        ? {
            size: 20,
            tooltip: true,
            style: !title ? 'secondary' : undefined,
            class: 'capitalize',
            value: title || 'No title provided'
          }
        : {}
    },

    getLastUpdatedComponentOptions({ updatedAt }) {
      return !updatedAt
        ? {
            style: 'secondary',
            value: 'No date provided'
          }
        : new Date(updatedAt) > new Date()
        ? {
            name: 'Scheduled',
            value: this.$d(new Date(updatedAt), 'dateShorter')
          }
        : {
            value: this.$d(new Date(updatedAt), 'dateShorter')
          }
    }
  }
}
</script>
  
  <style>
</style>