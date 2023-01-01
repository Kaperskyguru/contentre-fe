<template>
  <!-- Right Side -->
  <div class="w-full bg-white rounded-xl shadow md:w-10/12 md:h-64">
    <!-- Profile tab -->
    <!-- About Section -->
    <div class="bg-white rounded-xl shadow-sm">
      <div class="flex flex-col justify-between border-b-2 md:flex-row">
        <div
          class="
            flex
            items-center
            py-6
            px-4
            w-full
            font-semibold
            leading-8
            text-gray-900
          "
        >
          <span class="tracking-wide">Subscription Info</span>
        </div>
        <div class="flex justify-end items-end px-3 my-6 w-full">
          <Button
            :appearance="isPremium ? 'outline-red' : 'secondary'"
            @click.prevent="subscribe"
          >
            {{ btnText }}
          </Button>
        </div>
      </div>
    </div>
    <!-- End of about section -->

    <!-- connected apps -->
    <div class="py-2 px-4 bg-white rounded-sm shadow-sm">
      <div class="block w-full text-gray-700 bg-white">
        <div class="block pb-2 text-gray-500">
          <p class="mb-4 text-base">
            View your most active subscription information
          </p>
        </div>
      </div>

      <div class="flex flex-wrap -mx-2 w-full">
        <div class="px-4 w-full md:w-1/2 xl:w-1/2">
          <div class="mb-6">
            <TextField
              v-model="subscription.name"
              class="w-full text-sm"
              label="Plan"
              :disabled="true"
            />
          </div>

          <div class="mb-6">
            <TextField
              v-model="channel"
              class="w-full text-sm"
              label="Payment Channel"
              :disabled="true"
            />
          </div>

          <div class="mb-6">
            <TextField
              :value="formatDate(subscription.updatedAt)"
              class="w-full text-sm"
              label="Subscription Date"
              :disabled="true"
            />
          </div>
        </div>

        <div class="px-4 w-full md:w-1/2 xl:w-1/2">
          <div class="overflow-hidden mb-10 bg-teal-100 rounded-lg shadow">
            <div class="p-4 text-sm sm:p-9 md:p-7 xl:p-9">
              <p class="block pb-5 text-4xl font-bold text-center text-black">
                {{ subscription.name }} Active
              </p>
              <p class="mb-7 leading-relaxed text-center text-gray-900">
                {{ formatNextPayment(subscription.expiry) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_CURRENT_USER } from '~/graphql'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Subscription',

  data: () => ({
    getUser: {
      subscription: {},
      isPremium: false
    }
  }),
  head() {
    return {
      title: 'Settings | Subscriptions'
    }
  },

  computed: {
    channel() {
      return this.subscription?.channel ?? 'NONE'
    },
    btnText() {
      return this.getUser.isPremium ? 'Renew' : 'Upgrade'
    },
    subscription() {
      return this.getUser.subscription
    },
    isPremium() {
      return this.getUser.isPremium
    }
  },

  apollo: {
    getUser: {
      query: GET_CURRENT_USER,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return {
          subscription: data.getCurrentUser.activeSubscription,
          isPremium: data.getCurrentUser.isPremium
        }
      }
    }
  },

  methods: {
    async subscribe() {
      await this.$segment({
        operation: 'identify'
      })
      await this.$segment({
        eventName: 'Viewed Subscriptions Page',
        data: {
          from: this.max ? 'Upgrade' : 'Renew',
          user: this.currentUser
        }
      })
      this.$router.push('/subscriptions?tab=Plan')
    },
    formatDate(date) {
      if (!date) return ''
      return this.$d(new Date(date), 'dateLong')
    },
    formatNextPayment(date) {
      return this.isPremium
        ? `Your next payment will be: ${this.formatDate(date)}`
        : "You're on the limited-free-forever plan"
    }
  }
}
</script>

<style>
</style>