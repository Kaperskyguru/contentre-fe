<template>
  <p>Redirecting to payment page in a second</p>
</template>

<script>
import { GET_SUBSCRIPTION_URL } from '~/graphql'
export default {
  name: 'NewPayment',
  // Get the type of subscription
  // If logged in, Redirect to the page

  async asyncData({ route, params, query, app, redirect }) {
    const client = app.apolloProvider.defaultClient

    try {
      const {
        data: { getSubscriptionUrl: subscriptionURL }
      } = await client.query({
        query: GET_SUBSCRIPTION_URL,
        variables: {
          plan: query.plan,
          service: query.channel
        },
        skip() {
          return !query.plan && !query.channel
        }
      })
      redirect(subscriptionURL.url)
      return { subscriptionURL }
    } catch (e) {
      console.log(e)
      return false
    }
  }
}
</script>

<style>
</style>