<template>
  <span>
    <Card
      class="flex flex-col flex-1 space-y-3"
      :class="{ '!py-3 !px-1 space-y-1.5': isSidebarCollapsed }"
      :rounded="isSidebarCollapsed ? 'right' : true"
    >
      <!-- <CollapseSidebarButton /> -->
      <Hyperlink
        :to="{ name: 'index' }"
        class="
          group
          flex
          items-center
          p-2
          font-gilroy
          text-lg
          font-medium
          text-gray-500
          rounded-lg
        "
      >
        <span class="text-white">
          <DashboardIcon />
        </span>
        <span class="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
      </Hyperlink>

      <div
        id="dropdownDividerButton"
        class="dropdown"
        data-dropdown-toggle="dropdownDivider"
        @mouseover="contentOpen = true"
        @mouseleave="contentOpen = false"
      >
        <Hyperlink
          to="#"
          class="
            group
            flex
            items-center
            p-2
            text-lg
            font-medium
            text-gray-500
            rounded-lg
          "
        >
          <ContentIcon />
          <span class="flex-1 ml-3 whitespace-nowrap">Contents</span>

          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            :class="{
              'rotate-180': contentOpen,
              'rotate-0': !contentOpen
            }"
            class="
              inline
              mt-1
              ml-1
              w-4
              h-4
              transition-transform
              duration-200
              md:-mt-1
            "
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              c
              lip-rule="evenodd"
            ></path>
          </svg>
        </Hyperlink>

        <div
          id="dropdownDivider"
          class="hidden divide-y divide-gray-100 dropdown-menu"
        >
          <ul aria-labelledby="dropdownDividerButton">
            <li>
              <Hyperlink
                :to="{ name: 'contents' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  font-gilroy
                  text-base
                  font-medium
                  text-gray-500
                  rounded-lg
                "
              >
                <!-- <ContentIcon /> -->
                <span class="flex-1 ml-3 whitespace-nowrap">All Contents</span>
              </Hyperlink>
            </li>

            <li>
              <Hyperlink
                :to="{ name: 'contents/add', query: { type: 'note' } }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  font-gilroy
                  text-base
                  font-medium
                  text-gray-500
                  rounded-lg
                "
              >
                <!-- <AddIcon /> -->
                <span class="flex-1 ml-3 whitespace-nowrap"
                  >Write an article</span
                >
              </Hyperlink>
            </li>

            <li>
              <Hyperlink
                :to="{ name: 'contents/outlines' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  font-gilroy
                  text-base
                  font-medium
                  text-gray-500
                  rounded-lg
                "
              >
                <!-- <OutlineIcon /> -->
                <span class="flex-1 ml-3 whitespace-nowrap">Outlines</span>
              </Hyperlink>
            </li>

            <li>
              <Hyperlink
                :to="{ name: 'contents/briefs' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  font-gilroy
                  text-base
                  font-medium
                  text-gray-500
                  rounded-lg
                "
              >
                <!-- <BriefIcon /> -->
                <span class="flex-1 ml-3 whitespace-nowrap">Briefs</span>
              </Hyperlink>
            </li>

            <li>
              <Hyperlink
                :to="{ name: 'contents/snippets' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  font-gilroy
                  text-base
                  font-medium
                  text-gray-500
                  rounded-lg
                "
              >
                <!-- <SnippetIcon /> -->
                <span class="flex-1 ml-3 whitespace-nowrap">Snippets</span>
              </Hyperlink>
            </li>

            <li>
              <Hyperlink
                :to="{ name: 'notebooks' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  font-gilroy
                  text-base
                  font-medium
                  text-gray-500
                  rounded-lg
                "
              >
                <!-- <NoteIcon /> -->
                <span class="flex-1 ml-3 whitespace-nowrap">Notes</span>
              </Hyperlink>
            </li>
          </ul>
        </div>
      </div>

      <Hyperlink
        :to="{ name: 'analytics' }"
        class="
          group
          flex
          items-center
          p-2
          font-gilroy
          text-lg
          font-medium
          text-gray-500
          rounded-lg
        "
      >
        <AnalyticIcon />
        <span class="flex-1 ml-3 whitespace-nowrap">Analytics</span>
      </Hyperlink>

      <Hyperlink
        :to="{ name: 'portfolios' }"
        class="
          group
          flex
          items-center
          p-2
          font-gilroy
          text-lg
          font-medium
          text-gray-500
          rounded-lg
        "
      >
        <PortfolioIcon />
        <span class="flex-1 ml-3 whitespace-nowrap">Portfolios</span>
      </Hyperlink>

      <Hyperlink
        :to="{ name: 'clients' }"
        class="
          group
          flex
          items-center
          p-2
          font-gilroy
          text-lg
          font-medium
          text-gray-500
          rounded-lg
        "
      >
        <ProfileIcon />
        <span class="flex-1 ml-3 whitespace-nowrap">Clients</span>
      </Hyperlink>

      <div
        id="dropdownDividerButton"
        class="dropdown"
        data-dropdown-toggle="dropdownDivider"
        @mouseover="groupingOpen = true"
        @mouseleave="groupingOpen = false"
      >
        <Hyperlink
          to="#"
          class="
            group
            flex
            items-center
            p-2
            text-lg
            font-medium
            text-gray-500
            rounded-lg
          "
        >
          <GroupingIcon />
          <span class="flex-1 ml-3 whitespace-nowrap">Groupings</span>

          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            :class="{
              'rotate-180': groupingOpen,
              'rotate-0': !groupingOpen
            }"
            class="
              inline
              mt-1
              ml-1
              w-4
              h-4
              transition-transform
              duration-200
              md:-mt-1
            "
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              c
              lip-rule="evenodd"
            ></path>
          </svg>
        </Hyperlink>
        <div
          id="dropdownDivider"
          class="hidden divide-y divide-gray-100 dropdown-menu"
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
                  font-gilroy
                  text-base
                  font-medium
                  text-gray-500
                  rounded-lg
                "
              >
                <span class="flex-1 ml-3 whitespace-nowrap">Categories</span>
              </Hyperlink>
            </li>

            <li>
              <Hyperlink
                :to="{ name: 'topics' }"
                class="
                  group
                  flex
                  items-center
                  p-2
                  font-gilroy
                  text-base
                  font-medium
                  text-gray-500
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
                  font-gilroy
                  text-base
                  font-medium
                  text-gray-500
                  rounded-lg
                "
              >
                <span class="flex-1 ml-3 whitespace-nowrap">Tags</span>
              </Hyperlink>
            </li>
          </ul>
        </div>
      </div>
    </Card>
    <Card class="hidden mt-6 md:block">
      <div class="overflow-hidden rounded-lg shadow-lg aside-footer">
        <Upgrade
          :contents="totalNumber ? totalNumber : 0"
          :max="$utils.getFeatureValue(subscription, 'TOTAL_CONTENTS')"
        />
      </div>

      <!-- End -->
    </Card>
  </span>
</template>

<script>
import { mapState } from 'vuex'
import { currentUser } from '../mixins/currentUser'
import { uiState } from '../mixins/uiState'
import DashboardIcon from '~/assets/icons/dashboard.svg?inline'
import AnalyticIcon from '~/assets/icons/analytic.svg?inline'
import ContentIcon from '~/assets/icons/content.svg?inline'
import PortfolioIcon from '~/assets/icons/portfolio.svg?inline'
import GroupingIcon from '~/assets/icons/client.svg?inline'

export default {
  name: 'AsideBar',
  components: {
    DashboardIcon,
    AnalyticIcon,
    ContentIcon,
    PortfolioIcon,
    GroupingIcon,
    //   NoteIcon: () => import('~/assets/icons/note.svg?inline'),
    ProfileIcon: () => import('~/assets/icons/profile.svg?inline')
    //   SnippetIcon: () => import('~/assets/icons/editor/snippet.svg?inline'),
    //   OutlineIcon: () => import('~/assets/icons/editor/outline.svg?inline'),
    //   AddIcon: () => import('~/assets/icons/editor/add.svg?inline'),
    //   BriefIcon: () => import('~/assets/icons/editor/brief.svg?inline')
  },
  mixins: [currentUser, uiState],

  data: () => ({
    groupingOpen: false,
    contentOpen: false
  }),

  computed: {
    // getTotalContents() {
    //   return this.currentUser?.totalContents ?? 0
    // },

    ...mapState({
      totalNumber: (state) => {
        return state.subscription.numberOfContents ?? 0
      },
      subscription: (state) => {
        return state.subscription.subscription
      }
    })
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
  /* fill: white; */
}

ul li > a:hover svg#settings-icon {
  fill: none;
  /* color: white; */
}

.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
