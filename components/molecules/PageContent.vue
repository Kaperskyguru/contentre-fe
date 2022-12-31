<template>
  <main
    class="
      flex flex-col flex-1
      px-4
      pb-2
      space-y-6
      h-full
      md:overflow-hidden
      md:overflow-y-hidden
      md:flex-row
      md:px-6
      md:space-y-0
      md:space-x-6
      no-scrollbar
    "
    :class="{
      'md:pl-0': allowCollapseSidebar && isSidebarCollapsed
    }"
  >
    <aside
      class="flex flex-col space-y-6 drop-shadow transition-all"
      :class="{
        'md:w-60 lg:w-64 xl:w-68': allowCollapseSidebar && !isSidebarCollapsed,
        'w-12': allowCollapseSidebar && isSidebarCollapsed
      }"
    >
      <Aside />
      <slot name="sidebar" />
    </aside>

    <div class="flex-1 h-full md:overflow-y-hidden no-scrollbar">
      <div
        class="
          flex
          overflow-hidden
          flex-col
          space-y-6
          w-full
          drop-shadow
          md:overflow-y-auto md:h-full
          no-scrollbar
        "
        :class="{ 'items-center justify-center': waiting }"
      >
        <Loading v-if="waiting" class="opacity-20" />
        <slot v-else />
      </div>
    </div>

    <hr class="block grow-0 shrink-0 h-10 md:hidden" />
  </main>
</template>

<script>
import Loading from '~/components/molecules/Loading.vue'
import { uiState } from '~/components/mixins'

export default {
  name: 'PageContent',

  components: {
    Loading
  },

  mixins: [uiState],

  props: {
    waiting: {
      type: Boolean,
      default: false
    },

    allowCollapseSidebar: {
      type: Boolean,
      default: true
    }
  }
}
</script>
