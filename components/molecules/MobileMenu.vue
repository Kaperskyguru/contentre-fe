<template>
  <div class="flex flex-col flex-1">
    <div class="flex-1">
      <ul class="py-4 space-y-2">
        <li class="mb-3" @click="$emit('onMenuClick')">
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
        <li @click="$emit('onMenuClick')">
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
        <li @click="$emit('onMenuClick')">
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

        <li @click="$emit('onMenuClick')">
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

        <li @click="$emit('onMenuClick')">
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
            <ClientIcon />
            <span class="flex-1 ml-3 whitespace-nowrap">Clients</span>
          </Hyperlink>
        </li>

        <li
          id="dropdownDividerButton"
          class="dropdown"
          data-dropdown-toggle="dropdownDivider"
          @click="$emit('onMenuClick')"
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
            <ClientIcon />
            <span class="flex-1 ml-3 whitespace-nowrap">Grouping</span>
          </Hyperlink>
          <div
            id="dropdownDivider"
            class="hidden z-10 divide-y divide-gray-100 dropdown-menu"
          >
            <ul aria-labelledby="dropdownDividerButton">
              <li @click="$emit('onMenuClick')">
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
                  <ClientIcon />

                  <span class="flex-1 ml-3 whitespace-nowrap">Categories</span>
                </Hyperlink>
              </li>

              <li @click="$emit('onMenuClick')">
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
                  <ClientIcon />

                  <span class="flex-1 ml-3 whitespace-nowrap">Topics</span>
                </Hyperlink>
              </li>

              <li @click="$emit('onMenuClick')">
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
                  <ClientIcon />

                  <span class="flex-1 ml-3 whitespace-nowrap">Tags</span>
                </Hyperlink>
              </li>
            </ul>
          </div>
        </li>

        <div
          class="
            overflow-hidden
            p-2
            mx-4
            mt-4
            rounded-lg
            shadow-lg
            aside-footer
          "
        >
          <Upgrade :contents="currentUser.totalContents" />
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { currentUser } from '../mixins/currentUser'
import DashboardIcon from '~/assets/icons/dashboard.svg?inline'
import AnalyticIcon from '~/assets/icons/analytic.svg?inline'
import ContentIcon from '~/assets/icons/content.svg?inline'
import PortfolioIcon from '~/assets/icons/porfolio.svg?inline'
import ClientIcon from '~/assets/icons/client.svg?inline'
export default {
  components: {
    DashboardIcon,
    AnalyticIcon,
    ContentIcon,
    PortfolioIcon,
    ClientIcon
  },

  mixins: [currentUser]
}
</script>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}

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