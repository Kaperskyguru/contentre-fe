<template>
  <span>
    <Card
      class="flex flex-row gap-2 justify-between items-center py-4 mb-6 md:p-5"
    >
      <PageTitle>Contents</PageTitle>

      <Button appearance="primary" @click.prevent="onAddContent">
        Add Content
      </Button>
    </Card>

    <Card
      class="
        flex flex-col
        justify-between
        items-center
        py-4
        mb-6
        space-y-6 space-x-0
        md:flex-row md:p-5 md:space-y-0 md:space-x-5
      "
    >
      <div>
        <ContentFilter :filter-columns="sortColumns" @filters="onFilters" />
      </div>

      <SearchField
        id="search"
        v-model="filters.terms"
        class="flex-1 w-full h-10"
        placeholder="Search by name..."
      />

      <div>
        <FavouriteField :selected="checked" @deleted="onDeleteSuccess" />
      </div>
    </Card>

    <!-- table -->
    <Card class="h-full md:h-[750px]">
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
    </Card>
    <!-- end of table -->

    <Dialog v-model="isAddContent">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <LazyAddContent @created="onCreatedContent" />
        </div>
      </div>
      <div class="flex justify-center pt-5 text-xs font-bold text-btn-green">
        <div @click.prevent="onMultipleUpload">Or bulk import URLs</div>
      </div>
    </Dialog>

    <Dialog v-model="isAddMultipleContent">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <LazyUploadMultipleContents @created="onCreatedContent" />
        </div>
      </div>
    </Dialog>

    <LazyContentEdit
      v-model="contentId"
      @deleted="onDeleteSuccess"
    ></LazyContentEdit>

    <Dialog v-model="isUpgradeModalVisible" :is-large="true">
      <UpgradeModal @back="back">You've hit your content limit</UpgradeModal>
    </Dialog>
  </span>
</template>

<script>
import fragment from 'vue-frag'
import { mapState } from 'vuex'
import { currentUser } from '~/components/mixins'
import DownloadIcon from '~/assets/icons/download.svg'
import { GET_CONTENTS } from '~/graphql'
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
    isAddMultipleContent: false,
    isUpgradeModalVisible: false,
    searchedTerm: '',
    num: 0,
    isAddCategory: false,
    isAddContent: false,
    filters: {},
    sortColumns: [
      { name: 'Title', key: 'title' },
      { name: 'Client', key: 'client' },
      { name: 'Category', key: 'category' },
      { name: 'Visibility', key: 'visibility' },
      { name: 'Updated', key: 'lastUpdated' },
      { name: 'Amount', key: 'amount' }
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
        {
          title: 'Client',
          key: 'client.name',
          component: () => {
            return 'DataGridCellAvatar'
          },
          componentOptions: this.getClientComponentOptions
        },
        {
          title: 'Category',
          key: 'category.name',
          isGrid: true,
          dataClass: ({ category }) =>
            `${category ? 'xs:py-2' : 'xs:py-2'} lg:py-0`,
          component: () => {
            return 'DataGridCellCategory'
          },
          componentOptions: this.getCategoryComponentOptions
        },

        {
          title: 'Visibility',
          key: 'visibility',
          titleClass: 'lg:w-36 xl:w-50 2xl:w-70',
          dataClass: ({ visibility }) => {
            return `${visibility ? 'xs:py-2' : 'xs:py-2'} lg:py-0`
          },
          component: () => {
            return 'DataGridCellIcon'
          },
          componentOptions: this.getVisibilityComponentOptions
        },
        // {
        //   title: 'Interactions',
        //   key: 'interactions',
        //   titleClass: 'lg:w-36 xl:w-50 2xl:w-70',
        //   dataClass: ({ visibility }) => {
        //     return `${visibility ? 'xs:py-2' : 'xs:py-2'} lg:py-0`
        //   },
        //   component: () => {
        //     return 'DataGridCellIcon'
        //   },
        //   componentOptions: this.getInteractionsComponentOptions
        // },
        {
          title: 'Updated',
          key: 'lastUpdated',
          titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getLastUpdatedComponentOptions
        },
        {
          title: 'Amount',
          key: 'amount',
          titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellMoney',
          componentOptions: this.getAmountComponentOptions
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

  watch: {
    onBoarded: {
      handler(done) {
        if (!done) return
        this.onCreatedContent(done)
      },
      immediate: true,
      deep: true
    }
  },

  apollo: {
    contents: {
      query: GET_CONTENTS,
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
        const netTotal = data.getContents.meta.netTotal
        this.$store.commit('subscription/updateTotalContents', netTotal)
        return {
          items: data.getContents.contents,
          total: data.getContents.meta.total
        }
      }
    }
  },

  methods: {
    back() {
      this.isUpgradeModalVisible = false
    },
    onMultipleUpload() {
      this.isAddMultipleContent = true
    },
    onAddContent() {
      if (this.hasExceededContent) {
        this.isUpgradeModalVisible = true
        return
      }
      this.isAddContent = true
    },

    onCreatedContent(done) {
      if (!done) {
        this.$toast.positive('Content failed')
        return
      }
      this.isAddContent = false
      this.isAddMultipleContent = false
      this.$toast.positive('Content created successfully')
      this.$apollo.queries.contents.refetch()
    },
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

    onDeleteSuccess() {
      this.$apollo.queries.contents.refetch()
      this.$emit('deleted')
    },

    onItemClick({ id }) {
      this.contentId = id
    },
    getTitleComponentOptions({ title, url }) {
      return title
        ? {
            size: 20,
            link: !!url,
            type: 'icon',
            url,
            tooltip: true,
            file: DownloadIcon,
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

    getVisibilityComponentOptions({ visibility }) {
      return visibility
        ? {
            style: !visibility ? 'secondary' : undefined,
            value: visibility || 'No visibility provided'
          }
        : {}
    },

    getStatusComponentOptions({ status }) {
      return status
        ? {
            style: !status ? 'secondary' : undefined,
            value: status || 'No status provided'
          }
        : {}
    },

    // getInteractionsComponentOptions({ interactions }) {
    //   return {
    //     style: !interactions ? 'secondary' : undefined,
    //     value: interactions ?? 0
    //   }
    // },

    getAmountComponentOptions({ amount }) {
      return amount
        ? {
            style: !amount ? 'secondary' : undefined,
            value: amount || 'No amount provided',
            currency: 'USD',
            currencyBefore: true
          }
        : {
            value: amount || 0.0,
            currency: 'USD',
            currencyBefore: true
          }
    },

    getClientComponentOptions({ client }) {
      return client
        ? {
            style: !client ? 'secondary' : undefined,
            class: 'capitalize',
            icon: client.icon,
            url: client.website,
            value: client.name || 'No Client provided'
          }
        : {
            style: !client ? 'secondary' : undefined,
            class: 'capitalize',
            value: 'Personal'
          }
    },

    getCategoryComponentOptions({ category }) {
      return category
        ? {
            style: !category ? 'secondary' : undefined,
            class: 'capitalize',

            isGrid: true,
            value: category.name || 'No category provided'
          }
        : {
            style: 'secondary',

            isGrid: true,
            class: 'capitalize',
            value: 'No category provided'
          }
    }
  }
}
</script>

<style>
</style>