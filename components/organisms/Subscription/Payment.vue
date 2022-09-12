
<template>
  <section>
    <section
      id="main"
      class="
        justify-between
        pt-10
        mx-auto
        mb-10
        max-w-[90%]
        lg:flex lg:max-w-[60%]
      "
    >
      <!-- hero section -->
      <div class="mx-auto w-[90%] md:w-[60%] lg:w-2/5">
        <h1 class="text-2xl font-bold text-center">Upgrade to Pro</h1>
        <div
          class="flex justify-between space-x-4 w-full lg:block lg:space-x-0"
        >
          <div class="w-3/5 lg:w-full">
            <h5 class="mt-4 text-xs font-bold">CANCEL ANYTIME</h5>
            <p class="text-sm">
              No fixed charges, no cancellation fees. Easily cancel your
              subscription yourself in your account at any time or contact us by
              chat or email.
            </p>
          </div>

          <div class="w-2/5 lg:w-full">
            <h5 class="mt-4 text-xs font-bold">SECURE CHECKOUT</h5>
            <p class="text-sm">
              Payments are processed securely by our authorized reseller
              Paddle.com or Paystack.com
            </p>
          </div>
        </div>
      </div>

      <div
        class="
          container
          p-5
          mx-auto
          mt-10
          w-[90%]
          bg-white
          rounded
          drop-shadow-md
          md:w-[60%]
          lg:mt-0 lg:w-[45%]
        "
      >
        <div action="">
          <div class="flex justify-between mb-5">
            <h4 class="text-sm font-bold">Total Due Today</h4>
            <div>
              <h4 class="text-sm font-bold">
                ${{ isMonthly ? '9.99' : '7.99' }}
              </h4>
            </div>
          </div>

          <p class="text-xs">Billing Frequency</p>
          <div
            class="
              flex flex-col
              justify-between
              my-5
              space-y-2 space-x-0
              w-full
              md:flex-row md:space-y-0 md:space-x-4
              lg:mt-0 lg:space-x-2
            "
          >
            <button
              class="
                py-2
                px-10
                text-sm
                bg-transparent
                rounded
                border
                md:w-2/5
                lg:w-[50%]
              "
              :class="isMonthly ? 'border-red-500 text-red-500' : ''"
              @click="onChangePlan('monthly')"
            >
              Monthly
            </button>
            <button
              class="
                py-2
                px-8
                text-sm
                bg-transparent
                rounded
                border
                md:w-2/5
                lg:w-[50%]
              "
              :class="isMonthly ? '' : 'border-red-500 text-red-500'"
              @click="onChangePlan('yearly')"
            >
              Annually
            </button>
          </div>

          <Button class="py-2 px-8 mt-4 w-full" @click="makePayment('Paddle')">
            Pay with Paddle
          </Button>

          <div class="py-2 mt-2 w-full">
            <Button
              class="w-full"
              appearance="outline"
              @click="makePayment('Paystack')"
            >
              Pay with Paystack
            </Button>
          </div>
        </div>

        <div class="p-2 mt-5 mb-2 rounded-md border border-slate-300">
          <p class="text-xs">
            By starting a Contentre membership, you agree to our
            <a
              class="text-pink-600 underline decoration-1"
              href="https://www.termsandconditionsgenerator.com/live.php?token=d7qMQzDBX2dtqge1TzZCiVEPMWanz0Pt"
            >
              Membership Terms of Service</a
            >. Your payment method will be charged a recurring $9.99 USD monthly
            fee, unless you decide to cancel. No refunds for memberships
            canceled between billing cycles.
          </p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { GET_SUBSCRIPTION_PLANS } from '~/graphql'

export default {
  name: 'SubscriptionPayment',

  data: () => ({
    plan: 'yearly',
    plans: { items: [], total: 0 }
  }),

  computed: {
    isMonthly() {
      return this.plan === 'monthly'
    }
  },

  apollo: {
    plans: {
      query: GET_SUBSCRIPTION_PLANS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return {
          items: data.getSubscriptionPlans,
          total: data.getSubscriptionPlans.length
        }
      }
    }
  },

  watch: {
    '$route.query': {
      immediate: true,
      deep: true,
      handler(query) {
        this.plan = query?.plan
      }
    }
  },

  methods: {
    getPlanCode({ channel }) {
      const channelName = channel.toUpperCase()

      const planName =
        this.plan === 'yearly' ? 'Premium Yearly' : 'Premium Monthly'

      const plan = this.plans.items.find(
        (item) => item.channel === channelName && item.plan.name === planName
      )

      return {
        plan: plan?.paymentPlanId,
        channel: plan?.channel,
        planName
      }
    },
    onChangePlan(plan) {
      this.$router.push({
        path: '/subscriptions',
        query: { ...this.$route.query, plan }
      })
    },
    makePayment(name) {
      const plan = this.getPlanCode({
        channel: name
      })

      this.$emit('makePayment', plan)
    }
  }
}
</script>

<style>
</style>