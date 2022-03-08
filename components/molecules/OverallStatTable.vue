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
            :items="stats.items"
            :loading="$apollo.queries.stats.loading"
            :total="stats.total"
            :item-clickable="false"
            @load-more-data="fetchMore"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_OVERALL_STATS } from '~/graphql'
export default {
  props: {
    checked: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    stats: {
      items: [],
      total: 0
    }
  }),

  apollo: {
    stats: {
      query: GET_OVERALL_STATS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return {
          items: data.getOverallStats.stats,
          total: data.getOverallStats.stats.length
        }
      }
      // variables: {
      //   size: 10,
      //   skip: 0
      // }
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
          title: 'Client',
          key: 'name',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getClientComponentOptions
        },

        {
          title: 'Total Contents',
          key: 'totalContents',
          // titleClass: 'lg:w-36 xl:w-50 2xl:w-70',
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
          title: 'Comments',
          key: 'totalComments',
          // titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getCommentsComponentOptions
        },

        {
          title: 'Shares',
          key: 'totalShares',
          // titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getSharesComponentOptions
        },

        {
          title: 'Likes',
          key: 'totalLikes',
          // titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getLikesComponentOptions
        },

        {
          title: 'Interactions',
          key: 'interactions',
          // titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellPercent',
          componentOptions: this.getInteractionsComponentOptions
        },

        {
          title: 'Growths',
          key: 'growth',
          // titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellPercent',
          componentOptions: this.getGrowthsComponentOptions
        },

        {
          title: 'Status',
          key: 'status',
          // titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: () => 'DataGridCellStatus',
          componentOptions: this.getStatusComponentOptions
        }
      ]
    }
  },

  methods: {
    getClientComponentOptions({ name }) {
      return name
        ? {
            style: !name ? 'secondary' : undefined,
            value: name || 'No title provided'
          }
        : {}
    },

    getViewsComponentOptions({ views }) {
      return views
        ? {
            style: !views ? 'secondary' : undefined,
            value: views || 'No view provided'
          }
        : {
            value: views ?? 0
          }
    },

    getCommentsComponentOptions({ totalComments }) {
      return totalComments
        ? {
            style: !totalComments ? 'secondary' : undefined,
            value: totalComments || 'No Comments provided'
          }
        : {
            value: totalComments || 0
          }
    },

    getSharesComponentOptions({ totalShares }) {
      return totalShares
        ? {
            style: !totalShares ? 'secondary' : undefined,
            value: totalShares || 'No Share provided'
          }
        : {
            value: totalShares || 0
          }
    },

    getInteractionsComponentOptions({ interactions }) {
      return interactions
        ? {
            style: !interactions ? 'secondary' : undefined,
            value:
              parseFloat(interactions).toFixed(2) || 'No interactions provided'
          }
        : {
            value: interactions || 0.0
          }
    },

    getLikesComponentOptions({ totalLikes }) {
      return totalLikes
        ? {
            style: !totalLikes ? 'secondary' : undefined,
            value: totalLikes || 'No likes provided'
          }
        : {
            value: totalLikes ?? 0
          }
    },

    getGrowthsComponentOptions({ growth }) {
      return growth
        ? {
            style: !growth ? 'secondary' : undefined,
            value: parseFloat(growth).toFixed(2) || 'No growth provided'
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