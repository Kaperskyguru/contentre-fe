<template>
  <div>
    <div class="flex justify-between items-center py-4">
      <h1 class="pt-4 text-3xl font-bold text-gray-900">Overall Stats</h1>
    </div>
    <div class="overflow-x-auto font-sans bg-gray-100 rounded-lg">
      <div class="inline-block overflow-hidden min-w-full rounded-lg shadow">
        <div class="bg-white rounded shadow-md">
          <DataGrid
            :columns="columns"
            :items="analytics.items"
            :loading="false"
            :total="analytics.total"
            :item-clickable="false"
            @load-more-data="fetchMore"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    analytics: {
      items: [
        {
          client: 'medium',
          totalContents: 8,
          views: 30000,
          clicks: 60000,
          interactions: -9,
          likes: 80000,
          growth: 18,
          status: 'online'
        },
        {
          client: 'Writersstage',
          comments: 2760,
          totalContents: 2900,
          views: 12320,
          clicks: 400,
          interactions: 12,
          likes: '7m',
          growth: -25,
          status: 'offline'
        }
      ],
      total: 2
    }
  }),
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
          title: 'Client',
          key: 'client.name',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getClientComponentOptions
        },

        {
          title: 'Total Contents',
          key: 'totalContents',
          titleClass: 'lg:w-36 xl:w-50 2xl:w-70',
          dataClass: ({ totalContents }) => {
            return `${totalContents ? 'xs:py-2' : 'xs:py-2'} lg:py-0`
          },
          component: () => {
            return 'DataGridCellIcon'
          },
          componentOptions: this.getTotalContentsComponentOptions
        },

        {
          title: 'Views',
          key: 'views',
          component: () => {
            return 'DataGridCellIcon'
          },
          componentOptions: this.getViewsComponentOptions
        },
        {
          title: 'Clicks',
          key: 'clicks',
          titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getClicksComponentOptions
        },

        {
          title: 'Interactions',
          key: 'interactions',
          titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellPercent',
          componentOptions: this.getInteractionsComponentOptions
        },

        {
          title: 'Likes',
          key: 'likes',
          titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getLikesComponentOptions
        },

        {
          title: 'Growths',
          key: 'growths',
          titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellPercent',
          componentOptions: this.getGrowthsComponentOptions
        },

        {
          title: 'Status',
          key: 'status',
          titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellStatus',
          componentOptions: this.getStatusComponentOptions
        }
      ]
    }
  },

  methods: {
    getClientComponentOptions({ client }) {
      return client
        ? {
            style: !client ? 'secondary' : undefined,
            value: client || 'No title provided'
          }
        : {}
    },

    getViewsComponentOptions({ views }) {
      return views
        ? {
            style: !views ? 'secondary' : undefined,
            value: views || 'No view provided'
          }
        : {}
    },

    getClicksComponentOptions({ clicks }) {
      return clicks
        ? {
            style: !clicks ? 'secondary' : undefined,
            value: clicks || 'No clicks provided'
          }
        : {}
    },

    getInteractionsComponentOptions({ interactions }) {
      return interactions
        ? {
            style: !interactions ? 'secondary' : undefined,
            value: interactions || 'No interactions provided'
          }
        : {}
    },

    getLikesComponentOptions({ likes }) {
      return likes
        ? {
            style: !likes ? 'secondary' : undefined,
            value: likes || 'No likes provided'
          }
        : {}
    },

    getGrowthsComponentOptions({ growth }) {
      return growth
        ? {
            style: !growth ? 'secondary' : undefined,
            value: growth || 'No growth provided'
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
    getTotalContentsComponentOptions({ totalContents }) {
      return totalContents
        ? {
            style: !totalContents ? 'secondary' : undefined,
            value: totalContents || 'No Client provided'
          }
        : {}
    },
    fetchMore(sizeAndSkip) {
      // console.log(sizeAndSkip)
      const itemsKey = 'clients'
      const queryName = 'getClients'
      this.$apollo.queries.analytics.fetchMore({
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
    }
  }
}
</script>

<style>
</style>