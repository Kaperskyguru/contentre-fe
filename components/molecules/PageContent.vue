<template>
  <main
    class="
      flex
      overflow-y-auto
      flex-col flex-1
      p-4
      mb-5
      space-y-6
      w-full
      min-h-full
      md:flex-row md:p-6 md:space-y-0 md:space-x-6 md:min-h-0
    "
  >
    <!-- :class="{
      'md:pl-0': allowCollapseSidebar && isSidebarCollapsed
    }" -->
    <!-- <aside
      class="flex flex-col space-y-6 drop-shadow transition-all"
      :class="{
        'md:w-60 lg:w-64 xl:w-68': allowCollapseSidebar && !isSidebarCollapsed,
        'w-12': allowCollapseSidebar && isSidebarCollapsed
      }"
    >
      <slot name="sidebar" />
    </aside> -->

    <div
      class="flex flex-col flex-1 space-y-6 drop-shadow"
      :class="{ 'items-center justify-center': waiting }"
    >
      <Loading v-if="waiting" class="opacity-20" />
      <slot v-else />
    </div>

    <hr class="block grow-0 shrink-0 h-10 md:hidden" />
  </main>
</template>

<script>
import Loading from '~/components/molecules/Loading.vue'
// import { uiState } from '~/components/mixins'

export default {
  name: 'PageContent',

  components: {
    Loading
  },

  // mixins: [uiState],

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
