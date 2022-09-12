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

  computed: {
    reference() {
      let text = ''
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

      return text
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
    if (['development', 'staging'].includes(process.env.NODE_ENV)) {
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
          path: '/settings/subscription',
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

    async payWithPaystack(data) {
      await this.$paystack({
        key: process.env.PAYSTACK_KEY,
        email: this.currentUser?.email ?? '',
        ref: this.reference,
        plan: data.plan,
        // currency: 'USD',
        // start_date: '2022-09-11T21:00:02.000Z',
        channels: [
          'card',
          'bank',
          'ussd',
          'qr',
          'mobile_money',
          'bank_transfer'
        ],
        metadata: { ...data },
        callback: (d) => {
          this.$toast.positive('Payment processing')

          const queries = d.redirecturl.split('?')[1]

          this.$router.push({
            path: '/settings/subscription?' + queries
          })
        },
        onClose: () => {
          this.$toast.negative('Payment failed, please try again')
        }
      })
    },

    async onMakePayment(data) {
      switch (data.channel) {
        case 'PADDLE':
          await this.paddle(data)
          break
        case 'PAYSTACK':
          await this.payWithPaystack(data)
          break
      }
    }
  }
}
</script>

<style>
</style>