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
        <ContentFilter :filter-columns="sortColumns" @filters="onFilters" />
      </div>

      <div class="basis-4/5">
        <SearchField
          id="search"
          v-model="filters.terms"
          placeholder="Search by name..."
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
              :items="contents.items"
              :total="contents.total"
              :loading="$apollo.queries.contents.loading"
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
    sortColumns: [
      { name: 'Title', key: 'title' },
      { name: 'Updated', key: 'lastUpdated' }
    ],
    contents: {
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

        // {
        //   title: 'Category',
        //   key: 'category.name',
        //   isGrid: true,
        //   dataClass: ({ category }) =>
        //     `${category ? 'xs:py-2' : 'xs:py-2'} lg:py-0`,
        //   component: () => {
        //     return 'DataGridCellCategory'
        //   },
        //   componentOptions: this.getCategoryComponentOptions
        // },

        {
          title: 'Updated',
          key: 'lastUpdated',
          titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getLastUpdatedComponentOptions
        },

        {
          title: 'Status',
          key: 'status',
          titleClass: 'lg:w-36 xl:w-50 2xl:w-70',
          dataClass: ({ status }) => {
            return `${status ? 'xs:py-2' : 'xs:py-2'} lg:py-0`
          },
          component: () => {
            return 'DataGridCellStatus'
          },
          componentOptions: this.getStatusComponentOptions
        }
      ]
    }
  },

  apollo: {
    contents: {
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
        const netTotal = data.getOutlines.meta.netTotal
        this.$store.commit('subscription/updateTotalContents', netTotal)
        return {
          items: data.getOutlines.outlines,
          total: data.getOutlines.meta.total
        }
      }
    }
  },

  methods: {
    onFilters(v) {
      this.filters = {
        ...this.filters,
        ...v
      }
    },
    fetchMore(sizeAndSkip) {
      const itemsKey = 'contents'
      const queryName = 'getContents'
      this.$apollo.queries.contents.fetchMore({
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

    getLastUpdatedComponentOptions({ lastUpdated }) {
      return !lastUpdated
        ? {
            style: 'secondary',
            value: 'No date provided'
          }
        : new Date(lastUpdated) > new Date()
        ? {
            name: 'Scheduled',
            value: this.$d(new Date(lastUpdated), 'dateShorter')
          }
        : {
            value: this.$d(new Date(lastUpdated), 'dateShorter')
          }
    },

    getStatusComponentOptions({ status }) {
      return status
        ? {
            style: !status ? 'secondary' : undefined,
            value: status || 'No status provided'
          }
        : {}
    }
    // getCategoryComponentOptions({ category }) {
    //   return category
    //     ? {
    //         style: !category ? 'secondary' : undefined,
    //         class: 'capitalize',

    //         isGrid: true,
    //         value: category.name || 'No category provided'
    //       }
    //     : {
    //         style: 'secondary',

    //         isGrid: true,
    //         class: 'capitalize',
    //         value: 'No category provided'
    //       }
    // }
  }
}
</script>
  
  <style>
</style>