<template>
  <nav>
    <div class="nav-center">
      <!-- nav-header -->

      <div class="nav-header">
        <div class="">
          <Hyperlink to="/" class="flex items-center font-bold lg:ml-2.5">
            <img
              src="~/assets/img/Concentre.io-iconpng.png"
              class="h-12"
              alt="contentre logo"
            />
            <span class="self-center whitespace-nowrap">Contentre</span>
          </Hyperlink>
        </div>
        <!-- <img src="/logo.jpg" alt="logo" class="logo" /> -->
        <button class="nav-toggle">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </button>
      </div>

      <!-- ========links===== -->
      <div class="links-container">
        <ul class="lg:flex lg:space-y-0 lg:space-x-4 links">
          <li class="mb-4 lg:mb-0">
            <a
              class="flex items-center text-xs font-semibold"
              @click="setTab('Plan')"
            >
              <div
                class="
                  flex
                  justify-center
                  items-center
                  mr-2
                  w-[25px]
                  h-[25px]
                  text-white
                  rounded-[100%]
                "
                :class="[
                  tab === 'Plan' || plan ? 'bg-btn-green' : 'bg-gray-300'
                ]"
              >
                1
              </div>
              Select Plan
            </a>
          </li>
          <li class="mb-4 lg:mb-0">
            <a
              class="flex items-center text-xs font-semibold"
              @click="setTab('Address')"
            >
              <div
                class="
                  flex
                  justify-center
                  items-center
                  mr-2
                  w-[25px]
                  h-[25px]
                  text-white
                  rounded-[100%]
                "
                :class="[
                  tab === 'Address' || address ? 'bg-btn-green' : 'bg-gray-300'
                ]"
              >
                2
              </div>
              Billing Address</a
            >
          </li>
          <!-- <li class="mb-4 lg:mb-0">
            <a
              class="flex items-center text-xs font-semibold"
              @click="setTab('Domain')"
            >
              <div
                class="
                  flex
                  justify-center
                  items-center
                  mr-2
                  w-[25px]
                  h-[25px]
                  bg-gray-300
                  rounded-[100%]
                "
              >
                3
              </div>
              Choose Domain</a
            >
          </li> -->

          <li class="mb-4 lg:mb-0">
            <a
              class="flex items-center text-xs font-semibold"
              @click="setTab('Payment')"
            >
              <div
                class="
                  flex
                  justify-center
                  items-center
                  mr-2
                  w-[25px]
                  h-[25px]
                  text-white
                  rounded-[100%]
                "
                :class="[
                  tab === 'Payment' || payment ? 'bg-btn-green' : 'bg-gray-300'
                ]"
              >
                3
              </div>
              Payment Details</a
            >
          </li>
        </ul>
      </div>
      <!-- ======end==links===== -->

      <!-- ========social media============== -->
      <ul class="social-icons">
        <li>
          <a href="https://www.t">
            <i class="fab fa-facebook"></i>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/SuccessIbekwe1">
            <i class="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com">
            <i class="fab fa-behance"></i>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/success-ibekwe-94bb43226/">
            <i class="fab fa-linkedin"></i>
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com">
            <i class="fab fa-sketch"></i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SubscriptionHeader',

  data: () => ({ tab: '', plan: '', address: false, payment: false }),

  watch: {
    '$route.query': {
      immediate: true,
      deep: true,
      handler(query) {
        this.tab = query?.tab
        this.plan = query?.plan
        this.address = query?.address
        this.payment = query?.payment
      }
    }
  },

  methods: {
    setTab(name = 'Plan') {
      this.$emit('onTab', name)
    }
  }
}
</script>

<style>
</style>