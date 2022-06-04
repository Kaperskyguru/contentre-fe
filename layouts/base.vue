

<script>
import { currentUser } from '~/components/mixins'
export default {
  name: 'LayoutBase',
  mixins: [currentUser],
  methods: {
    async onLogout() {
      await this.$logoutUser()
    }
  }
}
</script>

<style>
</style>