<template>
  <div class="inline-block overflow-hidden min-w-full rounded-lg">
    <div class="p-4">
      <h2 class="font-gilroy text-2xl font-semibold leading-tight">Clients</h2>
    </div>
    <DataGrid
      :columns="columns"
      :checked.sync="computedChecked"
      :items="clients.items"
      :total="clients.total"
      :loading="$apollo.queries.clients.loading"
      :item-clickable="true"
      @load-more-data="fetchMore"
    />

    <ClientEdit v-model="clientId"></ClientEdit>
  </div>
</template>

<script>
import fragment from 'vue-frag'
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
        size: 2,
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
          title: 'Website',
          key: 'website',
          component: ({ website }) =>
            website ? 'DataGridCellIcon' : 'DataGridCellBlur',
          componentOptions: this.getWebsiteComponentOptions
        },
        {
          title: 'Profile Link',
          key: 'profile',
          component: ({ profile }) => {
            return profile ? 'DataGridCellIcon' : 'DataGridCellBlur'
          },
          componentOptions: this.getProfileComponentOptions
        },
        {
          title: 'Total Contents',
          key: 'totalContents',
          titleClass: 'lg:w-36 xl:w-50 2xl:w-70',
          dataClass: ({ totalContents }) => {
            return `${totalContents ? 'xs:py-2' : 'xs:py-2'} lg:py-0`
          },
          component: ({ totalContents }) => {
            return totalContents ? 'DataGridCellIcon' : 'DataGridCellBlur'
          },
          componentOptions: this.getTotalContentsComponentOptions
        },
        {
          title: 'Created',
          key: 'createdAt',
          titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: ({ createdAt }) =>
            createdAt ? 'DataGridCellIcon' : 'DataGridCellBlur',
          componentOptions: this.getCreatedAtComponentOptions
        }
      ]
    }
  },

  methods: {
    openPane(id) {
      this.clientId = id
    },
    getWebsiteComponentOptions({ website }) {
      return website
        ? {
            style: !website ? 'secondary' : undefined,
            value: website || 'No title provided'
          }
        : {}
    },

    fetchMore(sizeAndSkip) {
      console.log(sizeAndSkip)
      const itemsKey = 'clients'
      const queryName = 'getClients'
      this.$apollo.queries.clients.fetchMore({
        // New variables
        variables: {
          ...sizeAndSkip
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          console.log(fetchMoreResult)
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
            value: new Date(createdAt) // this.$d(new Date(lastUpdated), 'dateShorter')
          }
        : {
            value: new Date(createdAt) // this.$d(new Date(lastUpdated), 'dateShorter')
          }
    },

    getProfileComponentOptions({ profile }) {
      return profile
        ? {
            style: !profile ? 'secondary' : undefined,
            value: profile || 'No title provided'
          }
        : {}
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
