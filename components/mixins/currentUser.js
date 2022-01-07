import { GET_CURRENT_USER } from '~/graphql'

export const currentUser = {
  data: () => ({
    currentUser: null
  }),

  apollo: {
    currentUser: {
      query: GET_CURRENT_USER,
      update: (data) => data.getCurrentUser
    }
  },

  computed: {
    activeCompany() {
      return this.currentUser?.activeCompany ?? null
    },

    isAdmin() {
      return this.currentUser?.activeRole === 'ADMIN'
    }
  }
}

export default currentUser
