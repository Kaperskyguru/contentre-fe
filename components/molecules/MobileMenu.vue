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

        <li
          id="dropdownDividerButton"
          class="dropdown"
          data-dropdown-toggle="dropdownDivider"
          @mouseover="contentOpen = true"
          @click="contentOpen = !contentOpen"
          @mouseleave="contentOpen = false"
        >
          <Hyperlink
            to="#"
            class="
              group
              flex
              items-center
              p-2
              text-base
              font-normal
              text-gray-500
              hover:text-white
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
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="contentOpen"
              id="dropdownDivider"
              class="divide-y divide-gray-100 dropdown-menu"
            >
              <ul aria-labelledby="dropdownDividerButton">
                <li @click="$emit('onMenuClick')">
                  <Hyperlink
                    :to="{ name: 'contents' }"
                    class="
                      group
                      flex
                      items-center
                      p-2
                      text-base
                      font-normal
                      text-gray-500
                      hover:text-white
                      rounded-lg
                    "
                  >
                    <ContentIcon />
                    <span class="flex-1 ml-3 whitespace-nowrap"
                      >All Contents</span
                    >
                  </Hyperlink>
                </li>

                <li @click="$emit('onMenuClick')">
                  <Hyperlink
                    :to="{ name: 'contents/add', query: { type: 'note' } }"
                    class="
                      group
                      flex
                      items-center
                      p-2
                      text-base
                      font-normal
                      text-gray-500
                      hover:text-white
                      rounded-lg
                    "
                  >
                    <AddIcon />
                    <span class="flex-1 ml-3 whitespace-nowrap"
                      >Write an article</span
                    >
                  </Hyperlink>
                </li>

                <li @click="$emit('onMenuClick')">
                  <Hyperlink
                    :to="{ name: 'contents/outlines' }"
                    class="
                      group
                      flex
                      items-center
                      p-2
                      text-base
                      font-normal
                      text-gray-500
                      hover:text-white
                      rounded-lg
                    "
                  >
                    <OutlineIcon />
                    <span class="flex-1 ml-3 whitespace-nowrap"
                      >Create Outlines</span
                    >
                  </Hyperlink>
                </li>

                <li @click="$emit('onMenuClick')">
                  <Hyperlink
                    :to="{ name: 'contents/briefs' }"
                    class="
                      group
                      flex
                      items-center
                      p-2
                      text-base
                      font-normal
                      text-gray-500
                      hover:text-white
                      rounded-lg
                    "
                  >
                    <BriefIcon />
                    <span class="flex-1 ml-3 whitespace-nowrap"
                      >Create Briefs</span
                    >
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
                      text-base
                      font-normal
                      text-gray-500
                      hover:text-white
                      rounded-lg
                    "
                  >
                    <SnippetIcon />
                    <span class="flex-1 ml-3 whitespace-nowrap"
                      >Create Snippets</span
                    >
                  </Hyperlink>
                </li>

                <li @click="$emit('onMenuClick')">
                  <Hyperlink
                    :to="{ name: 'notebooks' }"
                    class="
                      group
                      flex
                      items-center
                      p-2
                      text-base
                      font-normal
                      text-gray-500
                      hover:text-white
                      rounded-lg
                    "
                  >
                    <NoteIcon />
                    <span class="flex-1 ml-3 whitespace-nowrap">Notes</span>
                  </Hyperlink>
                </li>
              </ul>
            </div>
          </transition>
        </li>
        <li @click="$emit('onMenuClick')">
          <Hyperlink
            :to="{ name: 'analytics' }"
            class="
              group
              flex
              items-center
              p-2
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
          @mouseover="groupingOpen = true"
          @click="groupingOpen = !groupingOpen"
          @mouseleave="groupingOpen = false"
        >
          <Hyperlink
            to="#"
            class="
              group
              flex
              items-center
              p-2
              text-base
              font-normal
              text-gray-500
              hover:text-white
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
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="groupingOpen"
              id="dropdownDivider"
              class="divide-y divide-gray-100 dropdown-menu"
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

                <li @click="$emit('onMenuClick')">
                  <Hyperlink
                    :to="{ name: 'topics' }"
                    class="
                      group
                      flex
                      items-center
                      p-2
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

                <li @click="$emit('onMenuClick')">
                  <Hyperlink
                    :to="{ name: 'tags' }"
                    class="
                      group
                      flex
                      items-center
                      p-2
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
          </transition>
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
          <Upgrade
            :max="$utils.getFeatureValue(subscription, 'TOTAL_CONTENTS')"
            :contents="totalNumber"
          />
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DashboardIcon from '~/assets/icons/dashboard.svg?inline'
import AnalyticIcon from '~/assets/icons/analytic.svg?inline'
import ContentIcon from '~/assets/icons/content.svg?inline'
import PortfolioIcon from '~/assets/icons/portfolio.svg?inline'
import ClientIcon from '~/assets/icons/client.svg?inline'
import GroupingIcon from '~/assets/icons/client.svg?inline'
export default {
  components: {
    DashboardIcon,
    AnalyticIcon,
    ContentIcon,
    PortfolioIcon,
    GroupingIcon,
    ClientIcon,
    NoteIcon: () => import('~/assets/icons/note.svg?inline'),
    SnippetIcon: () => import('~/assets/icons/editor/snippet.svg?inline'),
    OutlineIcon: () => import('~/assets/icons/editor/outline.svg?inline'),
    AddIcon: () => import('~/assets/icons/editor/add.svg?inline'),
    BriefIcon: () => import('~/assets/icons/editor/brief.svg?inline')
  },

  data: () => ({
    groupingOpen: false,
    contentOpen: false
  }),

  computed: {
    ...mapState({
      totalNumber: (state) => {
        return state.content.numberOfContents ?? 0
      },
      subscription: (state) => {
        return state.subscription.subscription
      }
    })
  }
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