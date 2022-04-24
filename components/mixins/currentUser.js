import { GET_CURRENT_USER } from '~/graphql'

export const currentUser = {
  data: () => ({
    currentUser: null
  }),

  apollo: {
    currentUser: {
      query: GET_CURRENT_USER,
      update: (data) => {
        console.log(data.getCurrentUser, 'mixins')
        return {
          ...data.getCurrentUser,
          subscription: data.getCurrentUser.subscription
        }
      }
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
