<template>
  <span>
    <DataGrid
      :columns="columns"
      :checked.sync="computedChecked"
      :items="clients.items"
      class="h-96 md:h-full"
      :total="clients.total"
      :loading="$apollo.queries.clients.loading"
      :item-clickable="true"
      @load-more-data="fetchMore"
      @item-click="onItemClick"
    />

    <ClientEdit v-model="clientId" @deleted="refetch"></ClientEdit>
  </span>
</template>

<script>
import { GET_CLIENTS } from '~/graphql'
export default {
  props: {
    placement: {
      type: String,
      default: 'clients'
    },
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
    clientId: null,
    clients: {
      items: [],
      total: 0
    }
  }),
  apollo: {
    clients: {
      query: GET_CLIENTS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return {
          items: data.getClients.clients,
          total: data.getClients.meta.total
        }
      },
      variables() {
        return {
          size: this.placement === 'clients' ? 30 : 15,
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
          title: 'Payment',
          key: 'paymentType',
          component: () => {
            return 'DataGridCellIcon'
          },
          componentOptions: this.getPaymentComponentOptions
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
          title: 'Created',
          key: 'createdAt',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getCreatedAtComponentOptions
        },
        {
          title: 'Amount Spent',
          key: 'totalAmount',
          component: () => {
            return 'DataGridCellMoney'
          },
          componentOptions: this.getTotalAmountComponentOptions
        },

        {
          title: 'Status',
          key: 'status',
          component: () => {
            return 'DataGridCellStatus'
          },
          componentOptions: this.getStatusComponentOptions
        }
      ]
    }
  },

  methods: {
    refetch() {
      this.$apollo.queries.clients.refetch()
    },
    onItemClick({ id }) {
      this.clientId = id
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
      const itemsKey = 'clients'
      const queryName = 'getClients'

      this.$apollo.queries.clients.fetchMore({
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

    getPaymentComponentOptions({ paymentType }) {
      return paymentType
        ? {
            style: !paymentType ? 'secondary' : undefined,
            value: paymentType === null ? 'No payment provided' : paymentType,
            name: 'Payment'
          }
        : {}
    },

    getStatusComponentOptions({ status }) {
      return status
        ? {
            style: !status ? 'secondary' : undefined,
            value: status ?? 'No status provided',
            name: 'Status'
          }
        : {}
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
            value: totalContents || 'No Client provided'
          }
        : {}
    }
  }
}
</script>

<style>
</style>
