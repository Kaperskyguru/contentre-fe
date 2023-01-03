<template>
  <PageContent>
    <Card class="flex flex-row gap-2 justify-between items-center">
      <PageTitle>Snippets</PageTitle>

      <Button
        appearance="primary"
        type="link"
        :to="{ name: 'contents/add', query: { type: 'snippet' } }"
      >
        Create Snippet
      </Button>
    </Card>
    <Card class="flex flex-row gap-2 justify-between items-center">
      <ContentFilter
        :remove="removeFilters"
        :filter-columns="sortColumns"
        @filters="onFilters"
      />

      <SearchField
        id="search"
        v-model="filters.terms"
        placeholder="Search by title..."
      />
    </Card>

    <Card class="min-h-96">
      <DataGrid
        :columns="columns"
        :checked.sync="computedChecked"
        :items="snippets.items"
        :total="snippets.total"
        class="h-96 md:h-full"
        :loading="$apollo.queries.snippets.loading"
        :item-clickable="true"
        @load-more-data="fetchMore"
        @item-click="onItemClick"
      />
    </Card>

    <Dialog v-model="isUpgradeModalVisible" :is-large="true">
      <UpgradeModal @back="back">You've hit your content limit</UpgradeModal>
    </Dialog>
  </PageContent>
</template>
      
      <script>
import fragment from 'vue-frag'
import { mapState } from 'vuex'
import { currentUser } from '~/components/mixins'
import { GET_SNIPPETS } from '~/graphql'
export default {
  name: 'BriefOverview',
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
      { name: 'Updated', key: 'updatedAt' }
    ],
    snippets: {
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
    snippets: {
      query: GET_SNIPPETS,
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
          items: data.getSnippets.snippets,
          total: data.getSnippets.meta.total
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
      const itemsKey = 'snippets'
      const queryName = 'getSnippets'
      this.$apollo.queries.snippets.fetchMore({
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
    }
  }
}
</script>
      
      <style>
</style>