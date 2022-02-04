

<script>
export default {
  name: 'LayoutBase',
  methods: {
    async onLogout() {
      await this.$logoutUser()
    }
  }
}
</script>

<style>
</style>