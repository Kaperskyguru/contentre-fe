export const uiState = {
  computed: {
    isSidebarCollapsed() {
      return false
    }
  },

  methods: {
    toggleSidebarCollapsed() {
      this.sidebarCollapsed = !this.isSidebarCollapsed
    }
  }
}
