<template>
  <PageContent>
    <Card
      class="
        flex flex-col flex-wrap
        gap-2
        justify-between
        items-center
        py-4
        md:flex-row md:p-5
      "
    >
      <PageTitle>Topics & Niches</PageTitle>

      <div class="flex space-x-0 md:space-x-3">
        <Button @click.prevent="onAddTopic">Add Topic</Button>
        <Button
          v-if="checked.length"
          appearance="secondary"
          @click.prevent="onDeleteBulkTopic"
          >Delete Topic{{ checked.length > 1 ? 's' : '' }}</Button
        >
      </div>
    </Card>

    <Card
      class="
        flex flex-col
        justify-between
        items-center
        py-4
        space-y-6 space-x-0
        md:flex-row md:p-5 md:space-y-0 md:space-x-5
      "
    >
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
      <DataGrid
        :columns="columns"
        :checked.sync="computedChecked"
        :items="topics.items"
        :total="topics.total"
        class="h-96 md:h-full"
        :loading="$apollo.queries.topics.loading"
        :item-clickable="true"
        @load-more-data="fetchMore"
        @item-click="onItemClick"
      />
    </Card>

    <TopicEdit v-model="isConfirmModalVisible" :topic-id="topicId" />

    <Dialog
      v-model="isBulkDeleteTopicVisible"
      primary-text="Confirm"
      secondary-text="Cancel"
      @answer="deleteBulkTopic"
    >
      <template #icon>
        <IconInformationCircle class="w-20 h-20" />
      </template>
      <p>
        Are you sure you want to delete {{ checked.length }} topic{{
          checked.length > 1 ? 's' : ''
        }}?
      </p>
    </Dialog>
  </PageContent>
</template>

<script>
import { DELETE_BULK_TOPIC, GET_TOPICS } from '~/graphql'
export default {
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
    topicId: null,
    topics: {
      items: [],
      total: 0
    },
    isConfirmModalVisible: false,
    isBulkDeleteTopicVisible: false,
    remove: ['client', 'category', 'topic', 'tag'],
    searchedTerm: '',
    filters: {},

    sortColumns: [
      { name: 'Name', key: 'name' },
      { name: 'Total Contents', key: 'totalContents' },
      { name: 'Created', key: 'createdAt' },
      { name: 'Amount', key: 'amount' }
    ]
  }),
  apollo: {
    topics: {
      query: GET_TOPICS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return {
          items: data.getTopics.topics,
          total: data.getTopics.meta.total
        }
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
          component: () => 'DataGridCellAvatar',
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
          key: 'totalAmount',
          component: () => {
            return 'DataGridCellMoney'
          },
          componentOptions: this.getTotalAmountComponentOptions
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
    refetch() {
      this.$apollo.queries.topics.refetch()
    },
    onItemClick({ id }) {
      this.topicId = id
      this.isConfirmModalVisible = true
    },

    getNameComponentOptions({ name, website, icon }) {
      return name
        ? {
            icon,
            url: website,
            style: !name ? 'secondary' : undefined,
            value: name || 'No name provided'
          }
        : {}
    },

    fetchMore(sizeAndSkip) {
      if (this.placement === 'dashboard') return
      const itemsKey = 'topics'
      const queryName = 'getTopics'

      this.$apollo.queries.topics.fetchMore({
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
            // file: IconTransactionDateClock,
            size: 14,
            name: 'Scheduled',
            value: this.$d(new Date(createdAt), 'dateShorter')
          }
        : {
            value: this.$d(new Date(createdAt), 'dateShorter')
          }
    },

    getTotalAmountComponentOptions({ totalAmount }) {
      return totalAmount
        ? {
            style: !totalAmount ? 'secondary' : undefined,
            value:
              totalAmount === null
                ? 'No total amount spent provided'
                : totalAmount,
            name: 'Amount Spent',
            currency: 'USD',
            currencyBefore: true
          }
        : {
            style: !totalAmount ? 'secondary' : undefined,
            value: 0.0,
            name: 'Amount Spent',
            currency: 'USD',
            currencyBefore: true
          }
    },

    getTotalContentsComponentOptions({ totalContents }) {
      return totalContents
        ? {
            style: !totalContents ? 'secondary' : undefined,
            value: totalContents || 'No Topic provided'
          }
        : { value: 0 }
    },

    onAddTopic() {
      this.isConfirmModalVisible = !this.isConfirmModalVisible
    },

    onDeleteBulkTopic() {
      this.isBulkDeleteTopicVisible = true
    },
    async deleteBulkTopic(answer) {
      if (!answer) return
      try {
        await this.$apollo.mutate({
          mutation: DELETE_BULK_TOPIC,
          refetchQueries: ['getTopics'],
          variables: {
            input: {
              ids: this.checked
            }
          }
        })

        this.$emit('deleted')
        this.sending = false
        this.$toast.positive('Topics deleted successfully')
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    },

    onFilters(v) {
      this.filters = {
        ...this.filters,
        ...v
      }
    }
  }
}
</script>

<style>
</style>
