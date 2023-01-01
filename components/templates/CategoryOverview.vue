<template>
  <PageContent>
    <Card
      class="flex flex-col gap-2 md:flex-row md:justify-between md:items-center"
    >
      <div class="w-full">
        <PageTitle>Categories</PageTitle>
      </div>
      <div class="flex-1">
        <div
          class="
            flex flex-col
            items-center
            space-y-4 space-x-0
            w-full
            md:flex-row md:space-y-0 md:space-x-4
          "
        >
          <Button class="w-full" @click.prevent="onAddCategory"
            >Add Category</Button
          >
          <Button
            v-if="checked.length"
            class="w-full"
            appearance="secondary"
            @click.prevent="onDeleteBulkCategory"
            >Delete Categor{{ checked.length > 1 ? 'ies' : 'y' }}</Button
          >
        </div>
      </div>
    </Card>

    <Card class="flex flex-row gap-2 justify-between items-center">
      <ContentFilter
        :remove="remove"
        :filter-columns="sortColumns"
        @filters="onFilters"
      />

      <SearchField
        id="search"
        v-model="filters.terms"
        placeholder="Search by name..."
      />
    </Card>

    <Card class="min-h-96">
      <!--  -->

      <DataGrid
        :columns="columns"
        :checked.sync="computedChecked"
        :items="categories.items"
        :total="categories.total"
        class="h-96 md:h-full"
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
            :style="{
              background: item.color ? `#${item.color}80` : undefined
            }"
          />
        </template>
      </DataGrid>
    </Card>

    <LazyCategoryEdit
      v-model="isEditPanelVisible"
      :category-id="categoryId"
      @deleted="onDeleteSuccess"
      @created="onCreated"
      @updated="onUpdated"
    ></LazyCategoryEdit>

    <Dialog
      v-model="isBulkDeleteCategoryVisible"
      primary-text="Confirm"
      secondary-text="Cancel"
      @answer="deleteBulkCategory"
    >
      <template #icon>
        <IconInformationCircle class="w-20 h-20" />
      </template>
      <p>
        Are you sure you want to delete {{ checked.length }} categor{{
          checked.length > 1 ? 'ies' : 'y'
        }}?
      </p>
    </Dialog>
  </PageContent>
</template>

<script>
// import fragment from 'vue-frag'
import { DELETE_BULK_CATEGORY, GET_CATEGORIES } from '~/graphql'
export default {
  // directives: {
  //   fragment
  // },

  components: {
    IconInformationCircle: () =>
      import('~/assets/icons/information-circle.svg?inline')
  },
  props: {
    checked: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    remove: ['client', 'category', 'topic', 'tag'],
    categoryId: null,
    filters: {},
    searchedTerm: '',
    isBulkDeleteCategoryVisible: false,
    sortColumns: [
      { name: 'Name', key: 'name' },
      { name: 'Total Contents', key: 'totalContents' },
      { name: 'Created', key: 'createdAt' },
      { name: 'Amount', key: 'amount' }
    ],
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
        return {
          items: data.getCategories.categories,
          total: data.getCategories.meta.total
        }
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
    onDeleteBulkCategory() {
      this.isBulkDeleteCategoryVisible = true
    },
    async deleteBulkCategory(answer) {
      if (!answer) return
      try {
        await this.$apollo.mutate({
          mutation: DELETE_BULK_CATEGORY,
          refetchQueries: ['getCategories'],
          variables: {
            input: {
              ids: this.checked
            }
          }
        })

        this.$emit('deleted')
        this.sending = false
        this.$toast.positive('Categories deleted successfully')
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    },
    onDeleteSuccess() {
      this.refetch()
    },
    onItemClick({ id }) {
      this.categoryId = id
      this.isEditPanelVisible = true
    },

    onAddCategory() {
      this.isEditPanelVisible = !this.isEditPanelVisible
    },

    onCreated() {
      this.refetch()
    },

    onUpdated() {
      this.refetch()
    },

    refetch() {
      this.$apollo.queries.categories.refetch()
    },

    onFilters(v) {
      this.filters = {
        ...this.filters,
        ...v
      }
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
