<template>
  <span v-fragment>
    <DataGrid
      :columns="columns"
      :checked.sync="computedChecked"
      :items="tags.items"
      :total="tags.total"
      :loading="$apollo.queries.tags.loading"
      :item-clickable="true"
      @load-more-data="fetchMore"
      @item-click="onItemClick"
    />

    <TagEdit v-model="tagId"></TagEdit>
  </span>
</template>

<script>
import fragment from 'vue-frag'
import { GET_TAGS } from '~/graphql'
export default {
  directives: {
    fragment
  },
  props: {
    checked: {
      type: Array,
      default: () => []
    },
    filters: {
      type: [Array, Object],
      default: () => {}
    }
  },
  data: () => ({
    tagId: null,
    tags: {
      items: [],
      total: 0
    }
  }),
  apollo: {
    tags: {
      query: GET_TAGS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return { items: data.getTags.tags, total: data.getTags.meta.total }
      },
      variables() {
        return {
          size: 30,
          skip: 0,
          filters: { ...this.filters }
        }
      }
    }
  },

  computed: {
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
          title: 'Name',
          key: 'name',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getNameComponentOptions
        },

        {
          title: 'Total Contents',
          key: 'totalContents',

          component: () => {
            return 'DataGridCellIcon'
          },
          componentOptions: this.getTotalContentsComponentOptions
        },
        {
          title: 'Amount',
          key: 'amount',
          component: () => {
            return 'DataGridCellMoney'
          },
          componentOptions: this.getAmountComponentOptions
        },
        {
          title: 'Created',
          key: 'createdAt',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getCreatedAtComponentOptions
        }
      ]
    }
  },

  methods: {
    onDeleteSuccess() {
      this.$apollo.queries.tags.refetch()
    },
    onItemClick({ id }) {
      this.tagId = id
    },

    getNameComponentOptions({ name }) {
      return name
        ? {
            tooltip: true,
            style: !name ? 'secondary' : undefined,
            value: name || 'No name provided'
          }
        : {}
    },

    fetchMore(sizeAndSkip) {
      const itemsKey = 'tags'
      const queryName = 'getTags'
      this.$apollo.queries.tags.fetchMore({
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

    getCreatedAtComponentOptions({ createdAt }) {
      return !createdAt
        ? {
            style: 'secondary',
            value: 'No date provided'
          }
        : new Date(createdAt) > new Date()
        ? {
            type: 'icon',
            size: 14,
            name: 'Scheduled',
            value: this.$d(new Date(createdAt), 'dateShorter')
          }
        : {
            value: this.$d(new Date(createdAt), 'dateShorter')
          }
    },

    getAmountComponentOptions({ totalAmount }) {
      return totalAmount
        ? {
            style: !totalAmount ? 'secondary' : undefined,
            value: totalAmount === null ? 'No amount provided' : totalAmount,
            name: 'Amount',
            currency: 'USD',
            currencyBefore: true
          }
        : {
            style: !totalAmount ? 'secondary' : undefined,
            value: 0.0,
            name: 'Amount',
            currency: 'USD',
            currencyBefore: true
          }
    },

    getTotalContentsComponentOptions({ totalContents }) {
      return totalContents
        ? {
            style: !totalContents ? 'secondary' : undefined,
            value: totalContents || 'No content provided'
          }
        : {
            value: 0
          }
    }
  }
}
</script>

<style>
</style>
