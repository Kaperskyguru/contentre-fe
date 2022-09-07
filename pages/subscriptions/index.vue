<template>
  <section>
    <Header @onTab="generateName" />
    <span>
      <component
        :is="$utils.checkCallback(`${tab}`)"
        :user="currentUser"
        @getAddress="onGetAddress"
        @makePayment="onMakePayment"
      />
    </span>
  </section>
</template>

<script>
import { currentUser } from '~/components/mixins'
import { GET_SUBSCRIPTION_URL } from '~/graphql'
export default {
  name: 'NewPayment',

  mixins: [currentUser],
  layout: 'Payment',
  data: () => ({
    tab: 'Plan',
    address: {}
  }),

  head() {
    return {
      title: 'Subscription'
    }
  },

  watch: {
    '$route.query': {
      immediate: true,
      deep: true,
      handler(query) {
        this.tab = query?.tab
      }
    }
  },

  mounted() {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-undef
      Paddle.Environment.set('sandbox')
    }
    // eslint-disable-next-line no-undef
    Paddle.Setup({
      vendor: Number(process.env.PADDLE_VENDOR)
    })
  },

  methods: {
    onGetAddress(address) {
      this.address = address
    },
    generateName(name = 'Plan') {
      const query = this.$route.query
      this.$router.push({
        path: '/subscriptions',
        query: { ...query, tab: name }
      })

      name = query?.tab ?? name
      this.tab = name
    },

    checkoutComplete(data) {
      if (data.checkout.completed) {
        this.$toast.positive('Payment successfully')

        return this.$router.push({
          path: '/',
          query: { ...this.$route.query }
        })
      }
    },
    checkoutClosed(data) {
      this.$toast.negative('Payment failed, please try again')
    },

    async paddle(data) {
      if (!data?.plan) return
      // eslint-disable-next-line no-undef
      await Paddle.Checkout.open({
        product: data.plan,
        allowQuantity: false,
        email: this.currentUser?.email ?? '',
        disableLogout: true,
        frameInitialHeight: 416,
        country: this.address?.country ?? this.currentUser.country,
        postcode: this.address?.code ?? '',
        successCallback: (data) => this.checkoutComplete(data),
        closeCallback: (data) => this.checkoutClosed(data),
        passthrough: { ...data }
      })
    },

    async paystack(data) {
      try {
        const {
          data: { getSubscriptionUrl: subscriptionURL }
        } = await this.$apollo.query({
          query: GET_SUBSCRIPTION_URL,
          variables: {
            plan: data.plan,
            service: data.channel
          },
          skip() {
            return !data.plan && !data.channel
          }
        })
        // redirect(subscriptionURL.url)
        return { subscriptionURL }
      } catch (e) {
        // console.log(e)
        return false
      }
    },

    async onMakePayment(data) {
      switch (data.channel) {
        case 'PADDLE':
          await this.paddle(data)
          break
        // case 'Paystack':
        //   await this.paystack(data)
        //   break
      }
    }
  }
}
</script>

<style>
</style>