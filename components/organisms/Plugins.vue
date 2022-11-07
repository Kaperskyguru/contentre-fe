<template>
  <span class="overflow-auto w-full no-scrollbar">
    <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
      <tabs
        :options="{ useUrlFragment: false, defaultTabHash: defaultSlug }"
        @changed="onTab"
      >
        <p v-if="apps.total < 1">
          Please activate a plugin
          <nuxt-link class="text-red-600" to="/settings/apps">here</nuxt-link>
        </p>
        <tab
          v-for="app in apps.total && apps.items"
          :id="app.slug"
          :key="app.id"
          :prefix="`<img class='mx-auto w-4 h-4 mx-2' src='${app.app.icon}' />`"
          :name="app.name"
        >
          <div>
            <component
              :is="$utils.checkCallback(`${slug}App`)"
              :key="app.id"
              :app="app"
              :options="options"
              @add="addApp"
            />
          </div>
        </tab>
      </tabs>
    </div>

    <div v-if="showSubmit && apps.total > 0" class="flex justify-center mt-5">
      <Button class="mt-5" appearance="outline" @click="$emit('performAction')"
        >Submit</Button
      >
    </div>
  </span>
</template>

<script>
import { GET_CONNECTED_APPS } from '~/graphql'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Plugins',

  props: {
    showSubmit: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    slug: 'devto',
    defaultSlug: '',
    apps: {
      items: [],
      total: 0
    }
  }),

  computed: {
    getActivatedApps() {
      return this.apps.items.filter((app) => app.isActivated)
    }
  },

  mounted() {
    this.defaultSlug = this.getActivatedApps[0]?.slug
    if (this.getActivatedApps.length)
      this.slug = this.generateName(this.getActivatedApps[0]?.slug)
  },

  apollo: {
    apps: {
      query: GET_CONNECTED_APPS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        const apps = data.getConnectedApps.apps.filter((app) => app.isActivated)
        this.slug = apps[0]?.slug
        return {
          items: apps,
          total: data.getConnectedApps.meta.total
        }
      },
      variables() {
        return {
          filters: { ...this.filters }
        }
      }
    }
  },

  methods: {
    onTab(tab) {
      this.slug = this.generateName(tab.tab.id)
    },
    generateName(str) {
      if (str) return str.charAt(0).toUpperCase() + str.slice(1)
    },
    addApp(data) {
      this.$emit('add', data)
    }
  }
}
</script>

<style scoped>
</style>