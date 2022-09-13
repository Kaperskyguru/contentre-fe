<template>
  <span class="w-full">
    <div
      class="
        text-sm
        font-medium
        text-center text-gray-500
        dark:text-gray-400
        border-b border-gray-200
        dark:border-gray-700
      "
    >
      <ul id="tabs" class="flex flex-wrap -mb-px">
        <li v-for="app in apps.items" :key="app.id" class="mr-2">
          <a
            :id="`${app.slug}-tab`"
            :href="`#${app.slug}`"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            :data-tabs-target="`#${app.slug}`"
            type="button"
            role="tab"
            :aria-controls="app.slug"
            aria-selected="false"
          >
            {{ app.name }}
          </a>
        </li>
      </ul>
    </div>

    <div id="myTabContent">
      <component
        :is="$utils.checkCallback(`${generateName(app.slug)}App`, [app])"
        v-for="app in apps.items"
        :key="app.id"
        :app="app"
        @add="addApp"
      />
    </div>
  </span>
</template>

<script>
import { GET_CONNECTED_APPS } from '~/graphql'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Plugins',

  data: () => ({
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
    this.$nextTick(async () => {
      await this.tabToggle()
    })
  },

  apollo: {
    apps: {
      query: GET_CONNECTED_APPS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return {
          items: data.getConnectedApps.apps.filter((app) => app.isActivated),
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
    generateName(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    addApp(data) {
      this.$emit('add', data)
    },

    async tabToggle() {
      await this.$nextTick()
      const tabsContainer = document.querySelector('#tabs')

      const tabTogglers = tabsContainer.querySelectorAll('a')

      tabTogglers.forEach(function (toggler) {
        toggler.addEventListener('click', function (e) {
          e.preventDefault()

          const tabName = this.getAttribute('href')

          const tabContents = document.querySelector('#myTabContent')

          for (let i = 0; i < tabContents.children.length; i++) {
            tabTogglers[i].parentElement.classList.remove('active')
            tabContents.children[i].classList.remove('hidden')
            if ('#' + tabContents.children[i].id === tabName) {
              continue
            }
            tabContents.children[i].classList.add('hidden')
          }
          e.target.parentElement.classList.add('active')
        })
      })

      if (tabTogglers.length) document.getElementById(tabTogglers[0].id).click()
    }
  }
}
</script>

<style scoped>
.active {
  @apply text-blue-600 dark:text-blue-500 rounded-t-lg border-b-2 border-blue-600 dark:border-blue-500;
}
</style>