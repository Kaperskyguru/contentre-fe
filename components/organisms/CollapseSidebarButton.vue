<template>
  <Tooltip :disabled="!isSidebarCollapsed" position="right">
    <button
      appearance="secondary"
      size="small"
      class="shrink-0 h-6 !border-transparent"
      :class="{ '!justify-end': !isSidebarCollapsed }"
      @click="toggleSidebarCollapsed"
    >
      <IconCollapseMenu
        class="w-6 h-6 transition-all"
        :class="{
          'mt-px': !isSidebarCollapsed,
          '-mt-0.5 rotate-180': isSidebarCollapsed
        }"
      />
    </button>
  </Tooltip>
</template>

<script>
import IconCollapseMenu from '~/assets/icons/collapse-menu.svg?inline'

export default {
  name: 'CollapseSidebarButton',

  components: {
    IconCollapseMenu
  },

  data: () => ({
    isSidebarCollapsed: false
  }),
  created() {
    this.isMobile()
  },
  methods: {
    isMobile() {
      if (!this.$device.isDesktop) {
        this.isSidebarCollapsed = true
        this.$emit('onCollapse', this.isSidebarCollapsed)
      }
    },
    toggleSidebarCollapsed() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed
      this.$emit('onCollapse', this.isSidebarCollapsed)
    }
  }
}
</script>
