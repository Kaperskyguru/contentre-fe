<template>
  <span>
    <DataGrid
      :columns="columns"
      :checked.sync="computedChecked"
      :items="categories.items"
      :total="categories.total"
      :loading="$apollo.queries.categories.loading"
      :item-clickable="true"
      @load-more-data="fetchMore"
      @item-click="onItemClick"
    >
      <template slot="data-name" slot-scope="{ item }">
        <Chip
          class="-my-2"
          :appearance="item.name ? 'primary' : 'secondary'"
          :value="item.name || $t('cashFlow.categories.uncategorized')"
          :style="{ background: item.color ? `#${item.color}80` : undefined }"
        />
      </template>
    </DataGrid>

    <CategoryEdit
      v-model="isEditPanelVisible"
      :category-id="categoryId"
      @deleted="onDeleteSuccess"
    ></CategoryEdit>
  </span>
</template>

<script>
// import fragment from 'vue-frag'
import { GET_CATEGORIES } from '~/graphql'
export default {
  // directives: {
  //   fragment
  // },
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
    categoryId: null,
    isEditPanelVisible: false,
    categories: {
      items: [],
      total: 0
    }
  }),
  apollo: {
    categories: {
      query: GET_CATEGORIES,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return { items: data.getCategories, total: data.getCategories.length }
      },
      variables() {
        return {
          size: 10,
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
          key: 'name'
        },

        {
          title: 'Created',
          key: 'createdAt',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getCreatedAtComponentOptions
        },
        {
          title: 'Amount',
          key: 'totalAmount',
          component: () => {
            return 'DataGridCellMoney'
          },
          componentOptions: this.getAmountComponentOptions
        },

        {
          title: 'Total Content',
          key: 'totalContents',
          component: () => {
            return 'DataGridCellIcon'
          },
          componentOptions: this.getTotalContentsComponentOptions
        }
      ]
    }
  },

  methods: {
    onDeleteSuccess() {
      this.$apollo.queries.categories.refetch()
    },
    onItemClick({ id }) {
      this.categoryId = id
      this.isEditPanelVisible = true
    },

    fetchMore(sizeAndSkip) {
      const itemsKey = 'categories'
      const queryName = 'getCategories'
      this.$apollo.queries.clients.fetchMore({
        // New variables
        variables: {
          ...sizeAndSkip
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

    getTotalContentsComponentOptions({ totalContents }) {
      return totalContents
        ? {
            style: !totalContents ? 'secondary' : undefined,
            value: totalContents ?? 0,
            name: 'total content'
          }
        : {
            value: 0
          }
    },

    getAmountComponentOptions({ totalAmount }) {
      return totalAmount
        ? {
            style: !totalAmount ? 'secondary' : undefined,
            value: totalAmount === null ? 0 : Number(totalAmount),
            name: 'Amount',
            currency: 'USD',
            currencyBefore: true
          }
        : {
            style: !totalAmount ? 'secondary' : undefined,
            value: 0,
            name: 'Amount',
            currency: 'USD',
            currencyBefore: true
          }
    }
  }
}
</script>

<style>
</style>
