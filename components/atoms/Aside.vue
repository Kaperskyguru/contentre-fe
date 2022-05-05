<template>
  <aside
    id="sidebar"
    class="
      flex
      z-30
      flex-col
      shrink-0
      pt-16
      h-full
      duration-75
      sm:w-0
      lg:flex lg:w-64
    "
    aria-label="Sidebar"
  >
    <div class="flex relative flex-col flex-1 pt-0 min-h-0">
      <div class="flex overflow-y-auto flex-col flex-1 pt-5 pb-4">
        <div class="flex-1 px-3 space-y-1">
          <ul class="py-4 space-y-2 border-t border-gray-500">
            <div class="absolute aside-header">
              <Hyperlink to="/" class="flex items-center font-bold lg:ml-2.5">
                <img
                  src="~/assets/img/Concentre.io-iconpng.png"
                  class="h-12"
                  alt="contentre logo"
                />
                <span class="self-center whitespace-nowrap">Contentre</span>
              </Hyperlink>
            </div>

            <li>
              <Hyperlink
                :to="{ name: 'index' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  font-roboto
                  text-base
                  font-normal
                  text-gray-500
                  hover:text-white
                  rounded-lg
                "
              >
                <span class="text-white">
                  <DashboardIcon />
                </span>
                <span class="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
              </Hyperlink>
            </li>
            <li>
              <Hyperlink
                :to="{ name: 'contents' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  font-roboto
                  text-base
                  font-normal
                  text-gray-500
                  hover:text-white
                  rounded-lg
                "
              >
                <ContentIcon />
                <span class="flex-1 ml-3 whitespace-nowrap">Contents</span>
              </Hyperlink>
            </li>
            <li>
              <Hyperlink
                :to="{ name: 'analytics' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  font-roboto
                  text-base
                  font-normal
                  text-gray-500
                  hover:text-white
                  rounded-lg
                "
              >
                <AnalyticIcon />
                <span class="flex-1 ml-3 whitespace-nowrap">Analytics</span>
              </Hyperlink>
            </li>

            <li>
              <Hyperlink
                :to="{ name: 'portfolios' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  font-roboto
                  text-base
                  font-normal
                  text-gray-500
                  hover:text-white
                  rounded-lg
                "
              >
                <PortfolioIcon />
                <span class="flex-1 ml-3 whitespace-nowrap">Portfolio</span>
              </Hyperlink>
            </li>

            <li>
              <Hyperlink
                :to="{ name: 'clients' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  font-roboto
                  text-base
                  font-normal
                  text-gray-500
                  hover:text-white
                  rounded-lg
                "
              >
                <ProfileIcon />
                <span class="flex-1 ml-3 whitespace-nowrap">Clients</span>
              </Hyperlink>
            </li>

            <li
              id="dropdownDividerButton"
              class="dropdown"
              data-dropdown-toggle="dropdownDivider"
            >
              <Hyperlink
                to="#"
                class="
                  group
                  flex
                  items-center
                  p-2
                  font-roboto
                  text-base
                  font-normal
                  text-gray-500
                  hover:text-white
                  rounded-lg
                "
              >
                <GroupingIcon />
                <span class="flex-1 ml-3 whitespace-nowrap">Grouping</span>
              </Hyperlink>
              <div
                id="dropdownDivider"
                class="
                  hidden
                  absolute
                  z-10
                  divide-y divide-gray-100
                  dropdown-menu
                "
              >
                <ul aria-labelledby="dropdownDividerButton">
                  <li>
                    <Hyperlink
                      :to="{ name: 'categories' }"
                      class="
                        group
                        flex
                        items-center
                        p-2
                        font-roboto
                        text-base
                        font-normal
                        text-gray-500
                        hover:text-white
                        rounded-lg
                      "
                    >
                      <span class="flex-1 ml-3 whitespace-nowrap"
                        >Categories</span
                      >
                    </Hyperlink>
                  </li>

                  <li>
                    <Hyperlink
                      :to="{ name: 'clients' }"
                      class="
                        group
                        flex
                        items-center
                        p-2
                        font-roboto
                        text-base
                        font-normal
                        text-gray-500
                        hover:text-white
                        rounded-lg
                      "
                    >
                      <span class="flex-1 ml-3 whitespace-nowrap">Topics</span>
                    </Hyperlink>
                  </li>

                  <li>
                    <Hyperlink
                      :to="{ name: 'tags' }"
                      class="
                        group
                        flex
                        items-center
                        p-2
                        font-roboto
                        text-base
                        font-normal
                        text-gray-500
                        hover:text-white
                        rounded-lg
                      "
                    >
                      <span class="flex-1 ml-3 whitespace-nowrap">Tags</span>
                    </Hyperlink>
                  </li>
                </ul>
              </div>
            </li>

            <div
              class="
                overflow-hidden
                absolute
                right-4
                bottom-10
                left-5
                p-2
                rounded-lg
                shadow-lg
                aside-footer
              "
            >
              <Upgrade
                :contents="getTotalContents"
                :max="$utils.getFeatureValue(getSubscription, 'TOTAL_CONTENTS')"
              />
            </div>
            <!-- End -->
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { currentUser } from '../mixins/currentUser'
import DashboardIcon from '~/assets/icons/dashboard.svg?inline'
import AnalyticIcon from '~/assets/icons/analytic.svg?inline'
import ContentIcon from '~/assets/icons/content.svg?inline'
import PortfolioIcon from '~/assets/icons/porfolio.svg?inline'
import GroupingIcon from '~/assets/icons/client.svg?inline'

export default {
  name: 'AsideBar',
  components: {
    DashboardIcon,
    AnalyticIcon,
    ContentIcon,
    PortfolioIcon,
    GroupingIcon,
    ProfileIcon: () => import('~/assets/icons/profile.svg?inline')
  },
  mixins: [currentUser],

  data: () => ({
    isSidebarCollapsed: false
  }),

  computed: {
    getSubscription() {
      return this.currentUser.subscription
    },
    getTotalContents() {
      return this.currentUser?.totalContents ?? 0
    }
  },
  methods: {
    onCollapsed(collapse) {
      this.isSidebarCollapsed = collapse
      this.$emit('onCollapse', this.isSidebarCollapsed)
    }
  }
}
</script>

<style scoped>
ul svg {
  fill: #6b8583;
}

ul svg#settings-icon {
  fill: none;
  color: #6b8583;
}

ul li > a:hover svg {
  fill: white;
}

ul li > a:hover svg#settings-icon {
  fill: none;
  color: white;
}

.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
