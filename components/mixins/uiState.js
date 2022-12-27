export const uiState = {
  data: () => ({
    isSidebarCollapsed: false
  }),

  methods: {
    toggleSidebarCollapsed() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed
    }
  }
}
