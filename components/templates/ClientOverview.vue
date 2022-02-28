<template>
  <div class="mb-5">
    <div class="flex justify-between items-center py-4">
      <h2 class="font-gilroy text-2xl font-semibold leading-tight">Clients</h2>
    </div>
    <div class="overflow-x-auto font-sans rounded-lg">
      <div class="inline-block overflow-hidden min-w-full rounded-lg">
        <div class="bg-white rounded">
          <DataGrid
            :columns="columns"
            :checked.sync="computedChecked"
            :items="clients.items"
            :total="clients.total"
            :loading="$apollo.queries.clients.loading"
            :item-clickable="true"
            @load-more-data="fetchMore"
            @item-click="onItemClick"
          />
        </div>
      </div>
    </div>

    <ClientEdit v-model="clientId"></ClientEdit>
  </div>
</template>

<script>
import fragment from 'vue-frag'
// import DownloadIcon from '~/assets/icons/download.svg'
import { GET_CLIENTS } from '~/graphql'
export default {
  directives: {
    fragment
  },
  props: {
    checked: {
      type: Array,
      default: () => []
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
        return { items: data.getClients, total: data.getClients.length }
      },
      variables: {
        size: 10,
        skip: 0
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
          title: 'Amount',
          key: 'amount',
          component: () => {
            return 'DataGridCellMoney'
          },
          componentOptions: this.getAmountComponentOptions
        }
      ]
    }
  },

  methods: {
    onItemClick({ id }) {
      this.clientId = id
    },

    getNameComponentOptions({ name, website, icon }) {
      return name
        ? {
            icon,
            url: `https://${website}`,
            style: !name ? 'secondary' : undefined,
            value: name || 'No name provided'
          }
        : {}
    },

    fetchMore(sizeAndSkip) {
      const itemsKey = 'clients'
      const queryName = 'getClients'
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
            // file: IconTransactionDateClock,
            size: 14,
            name: 'Scheduled',
            value: new Date(createdAt).toLocaleDateString() // this.$d(new Date(lastUpdated), 'dateShorter')
          }
        : {
            value: new Date(createdAt).toLocaleDateString() // this.$d(new Date(lastUpdated), 'dateShorter')
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

    getAmountComponentOptions({ amount }) {
      return amount
        ? {
            style: !amount ? 'secondary' : undefined,
            value: amount === null ? 'No payment provided' : amount,
            name: 'Amount',
            currency: 'USD',
            currencyBefore: true
          }
        : {
            style: !amount ? 'secondary' : undefined,
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
            value: totalContents || 'No Client provided'
          }
        : {}
    }
  }
}
</script>

<style>
</style>
