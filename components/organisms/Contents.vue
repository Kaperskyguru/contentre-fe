<template>
  <DataGrid
    :columns="columns"
    :checked.sync="computedChecked"
    :items="contents.items"
    :total="contents.total"
    :loading="$apollo.queries.contents.loading"
    :item-clickable="true"
  />
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
    }
  },

  data: () => ({
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
          skip: 0
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
          component: ({ title }) =>
            title ? 'DataGridCellIcon' : 'DataGridCellBlur',
          componentOptions: this.getTitleComponentOptions
        },
        {
          title: 'Client',
          key: 'client.name',
          component: ({ client }) => {
            return client ? 'DataGridCellIcon' : 'DataGridCellBlur'
          },
          componentOptions: this.getClientComponentOptions
        },

        {
          title: 'Visibility',
          key: 'visibility',
          titleClass: 'lg:w-36 xl:w-50 2xl:w-70',
          dataClass: ({ visibility }) => {
            return `${visibility ? 'xs:py-2' : 'xs:py-2'} lg:py-0`
          },
          component: ({ visibility }) => {
            return visibility ? 'DataGridCellIcon' : 'DataGridCellBlur'
          },
          componentOptions: this.getVisibilityComponentOptions
        },
        {
          title: 'Last Updated',
          key: 'lastUpdated',
          titleClass: 'lg:w-20 xl:w-28 2xl:w-36',
          component: ({ lastUpdated }) =>
            lastUpdated ? 'DataGridCellIcon' : 'DataGridCellBlur',
          componentOptions: this.getLastUpdatedComponentOptions
        }
      ]
    }
  },

  methods: {
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
            value: new Date(lastUpdated) // this.$d(new Date(lastUpdated), 'dateShorter')
          }
        : {
            value: new Date(lastUpdated) // this.$d(new Date(lastUpdated), 'dateShorter')
          }
    },

    getVisibilityComponentOptions({ visibility }) {
      return visibility
        ? {
            style: !visibility ? 'secondary' : undefined,
            value: visibility || 'No title provided'
          }
        : {}
    },

    getClientComponentOptions({ client }) {
      return client
        ? {
            style: !client ? 'secondary' : undefined,
            class: 'capitalize',
            value: client.name || 'No Client provided'
          }
        : {}
    }
  }
}
</script>

<style>
</style>