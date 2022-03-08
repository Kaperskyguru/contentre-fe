<template>
  <span>
    <DataGrid
      :columns="columns"
      :checked.sync="computedChecked"
      :items="contents.items"
      :total="contents.total"
      :loading="$apollo.queries.contents.loading"
      :item-clickable="true"
      @item-click="onItemClick"
    />
    <LazyContentEdit v-model="contentId"></LazyContentEdit>
  </span>
</template>

<script>
import DownloadIcon from '~/assets/icons/download.svg'
import { GET_CONTENTS } from '~/graphql'
export default {
  name: 'ContentTable',

  props: {
    checked: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    contentId: null,
    contents: {
      items: [],
      total: 0
    }
  }),

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
            sortBy: this.filters?.sortBy
          }
        }
      },
      update(data) {
        return {
          items: data.getContents,
          total: data.getContents.length
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
        {
          title: 'Interactions',
          key: 'interactions',
          titleClass: 'lg:w-36 xl:w-50 2xl:w-70',
          dataClass: ({ visibility }) => {
            return `${visibility ? 'xs:py-2' : 'xs:py-2'} lg:py-0`
          },
          component: () => {
            return 'DataGridCellIcon'
          },
          componentOptions: this.getInteractionsComponentOptions
        },
        {
          title: 'Last Updated',
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
        }
      ]
    }
  },

  methods: {
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
            // type: 'icon',
            // file: IconTransactionDateClock,
            // size: 14,
            name: 'Scheduled',
            value: new Date(lastUpdated).toLocaleDateString() // this.$d(new Date(lastUpdated), 'dateShorter')
          }
        : {
            value: new Date(lastUpdated).toLocaleDateString() // this.$d(new Date(lastUpdated), 'dateShorter')
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

    getInteractionsComponentOptions({ interactions }) {
      return {
        style: !interactions ? 'secondary' : undefined,
        value: interactions ?? 0
      }
    },

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
            url: `https://${client.website}`,
            value: client.name || 'No Client provided'
          }
        : {}
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