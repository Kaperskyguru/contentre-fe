<template>
  <aside
    id="sidebar"
    class="
      flex
      fixed
      top-0
      left-0
      z-30
      flex-col
      shrink-0
      pt-16
      w-64
      h-full
      duration-75
      lg:flex
      aside
    "
    aria-label="Sidebar"
    :class="{
      'md:w-60 lg:w-64 xl:w-68': !isSidebarCollapsed,
      'w-14': isSidebarCollapsed
    }"
  >
    <div
      class="
        relative
        pt-0
        min-h-0
        flex-1 flex flex-col
        border-r border-gray-200
      "
    >
      <div class="flex overflow-y-auto flex-col flex-1 pt-5 pb-4">
        <div class="flex-1 px-3 space-y-1">
          <ul class="py-4 space-y-2 border-t border-gray-500">
            <div class="absolute aside-header">
              <Hyperlink
                v-if="!isSidebarCollapsed"
                to="/"
                class="flex items-center font-bold lg:ml-2.5"
              >
                <img
                  src="~/assets/img/dashboard_logo.svg"
                  class="img-fluid"
                  alt="contentre logo"
                />
                <!-- <span class="self-center whitespace-nowrap">contentr</span> -->
              </Hyperlink>

              <Tooltip v-else>
                <Hyperlink to="/" class="flex items-center font-bold">
                  <img src="/logo.png" class="img-fluid" alt="contentre logo" />
                </Hyperlink>
              </Tooltip>
            </div>
            <CollapseSidebarButton @onCollapse="onCollapsed" />
            <li>
              <Hyperlink
                :to="{ name: 'index' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  hover:text-white
                  rounded-lg
                  text-base text-gray-500
                  font-normal font-roboto
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
                :to="{ name: 'analytics' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  hover:text-white
                  rounded-lg
                  text-base text-gray-500
                  font-normal font-roboto
                "
              >
                <AnalyticIcon />
                <span class="flex-1 ml-3 whitespace-nowrap">Analytics</span>
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
                  hover:text-white
                  rounded-lg
                  text-base text-gray-500
                  font-normal font-roboto
                "
              >
                <ClientIcon />
                <span class="flex-1 ml-3 whitespace-nowrap">Clients</span>
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
                  hover:text-white
                  rounded-lg
                  text-base text-gray-500
                  font-normal font-roboto
                "
              >
                <ClientIcon />
                <span class="flex-1 ml-3 whitespace-nowrap">Grouping</span>
              </Hyperlink>

              <ul>
                <li>
                  <Hyperlink
                    :to="{ name: 'clients' }"
                    class="
                      group
                      flex
                      items-center
                      p-2
                      hover:text-white
                      rounded-lg
                      text-base text-gray-500
                      font-normal font-roboto
                    "
                  >
                    <ClientIcon />

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
                      hover:text-white
                      rounded-lg
                      text-base text-gray-500
                      font-normal font-roboto
                    "
                  >
                    <ClientIcon />

                    <span class="flex-1 ml-3 whitespace-nowrap">Topics</span>
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
                      hover:text-white
                      rounded-lg
                      text-base text-gray-500
                      font-normal font-roboto
                    "
                  >
                    <ClientIcon />

                    <span class="flex-1 ml-3 whitespace-nowrap">Tags</span>
                  </Hyperlink>
                </li>
              </ul>
            </li>

            <li>
              <Hyperlink
                :to="{ name: 'portfolios' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  hover:text-white
                  rounded-lg
                  text-base text-gray-500
                  font-normal font-roboto
                "
              >
                <PortfolioIcon />
                <span class="flex-1 ml-3 whitespace-nowrap">Portfolio</span>
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
                  hover:text-white
                  rounded-lg
                  text-base text-gray-500
                  font-normal font-roboto
                "
              >
                <ContentIcon />
                <span class="flex-1 ml-3 whitespace-nowrap">Content</span>
              </Hyperlink>
            </li>

            <!-- Aside Footer -->

            <div
              class="
                overflow-hidden
                relative
                bottom-0
                p-2
                rounded-lg
                shadow-lg
                aside-footer
              "
            >
              <ul class="py-2 space-y-2">
                <li>
                  <Hyperlink
                    :to="{ name: 'index' }"
                    class="
                      group
                      flex
                      items-center
                      p-2
                      hover:text-white
                      rounded-lg
                      text-base text-gray-500
                      font-normal font-roboto
                    "
                  >
                    <span class="text-white">
                      <DashboardIcon />
                    </span>
                    <span class="flex-1 ml-3 whitespace-nowrap"
                      >Upload Content</span
                    >
                  </Hyperlink>
                </li>

                <li>
                  <Hyperlink
                    :to="{ name: 'index' }"
                    class="
                      group
                      flex
                      items-center
                      p-2
                      hover:text-white
                      rounded-lg
                      text-base text-gray-500
                      font-normal font-roboto
                    "
                  >
                    <span class="text-white">
                      <DashboardIcon />
                    </span>
                    <span class="flex-1 ml-3 whitespace-nowrap"
                      >Create new portfolio</span
                    >
                  </Hyperlink>
                </li>

                <li>
                  <Hyperlink
                    :to="{ name: 'index' }"
                    class="
                      group
                      flex
                      items-center
                      p-2
                      hover:text-white
                      rounded-lg
                      text-base text-gray-500
                      font-normal font-roboto
                    "
                  >
                    <span class="text-white">
                      <DashboardIcon />
                    </span>
                    <span class="flex-1 ml-3 whitespace-nowrap"
                      >Generate Statements</span
                    >
                  </Hyperlink>
                </li>

                <li>
                  <Hyperlink
                    :to="{ name: 'index' }"
                    class="
                      group
                      flex
                      items-center
                      p-2
                      hover:text-white
                      rounded-lg
                      text-base text-gray-500
                      font-normal font-roboto
                    "
                  >
                    <span class="text-white">
                      <DashboardIcon />
                    </span>
                    <span class="flex-1 ml-3 whitespace-nowrap"
                      >Make a payment</span
                    >
                  </Hyperlink>
                </li>
              </ul>
              <!-- <div class="flex justify-between items-center p-2">
                <div class="">
                  <p class="font-roboto text-base text-white">Storage</p>
                </div>
                <div class="">
                  <p class="font-roboto">Upgrade</p>
                </div>
              </div>

              <div class="px-2 pb-2 aside-footer-footer">
                <p class="pb-4 font-roboto text-white">
                  3.4 GB <span class="text-light">of 15 GB</span>
                </p>
                <div class="w-full h-2 rounded-full progress-bg">
                  <div class="w-1/6 h-full rounded-full progress"></div>
                </div>
              </div> -->
            </div>
            <!-- End -->
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import DashboardIcon from '~/assets/icons/dashboard.svg?inline'
import AnalyticIcon from '~/assets/icons/analytic.svg?inline'

import ContentIcon from '~/assets/icons/content.svg?inline'
import PortfolioIcon from '~/assets/icons/porfolio.svg?inline'
import ClientIcon from '~/assets/icons/client.svg?inline'

export default {
  name: 'AsideBar',
  components: {
    DashboardIcon,
    AnalyticIcon,
    ContentIcon,
    PortfolioIcon,
    ClientIcon
  },

  data: () => ({
    isSidebarCollapsed: false
  }),

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
</style>
