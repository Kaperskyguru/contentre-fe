import { GET_CURRENT_USER, LOGOUT_USER } from '~/graphql'

export default ({ app, redirect }, inject) => {
  const getCurrentUser = async () => {
    // if (localStorage['storybook-layout']) return null

    try {
      const apolloClient = app.apolloProvider.defaultClient
      const result = await apolloClient.query({ query: GET_CURRENT_USER })
      return result?.data?.getCurrentUser ?? null
    } catch (err) {
      if (err.message.includes('You must be logged in.')) {
        return redirect('/auth/login')
      }
    }
  }

  inject('getCurrentUser', getCurrentUser)

  inject('logoutUser', async () => {
    try {
      const apolloClient = app.apolloProvider.defaultClient
      await apolloClient.mutate({
        mutation: LOGOUT_USER,
        update: (cache) => {
          cache.writeQuery({
            query: GET_CURRENT_USER,
            data: { getCurrentUser: null }
          })
        }
      })

      await apolloClient.clearStore()
    } finally {
      if (window.$nuxt) {
        await window.$nuxt.$router.push('/auth/login')
      }
    }
  })
}
