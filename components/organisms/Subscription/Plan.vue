<template>
  <span>
    <div class="">
      <div
        class="pt-20 mx-auto w-[80%] text-center lg:w-[65%] lg:leading-[82px]"
      >
        <h1 class="text-2xl font-medium text-[#102A27] md:text-4xl lg:text-6xl">
          Get started now, we've got awesome price that fits your purse
        </h1>
      </div>
    </div>

    <section class="mt-20 mb-10">
      <div class="mx-auto max-w-[80%]">
        <!-- ---------------------------CARD GRID------------ -->
        <div class="grid gap-6 mt-10 lg:grid-cols-2 lg:gap-5">
          <!-- =========PREMIUM PLAN================= -->
          <div
            class="px-8 pt-8 pb-6 text-gray-300 bg-[#286963] rounded-lg border"
          >
            <div class="pb-5 border-b-2 border-[#99999966]">
              <div>
                <div>
                  <small class="text-[18px] leading-[18px]"
                    >Premium Yearly (Save 20%)</small
                  >
                  <h4
                    class="
                      mt-3
                      text-[40px]
                      font-medium
                      leading-[40px]
                      text-[#FFFFFF]
                    "
                  >
                    $99.99
                    <sub class="text-[14px] font-extralight text-gray-300"
                      >per year</sub
                    >
                  </h4>
                </div>
                <p class="mt-7 text-base">
                  Get all the unlimited benefits you need to grow your freelance
                  technical writing career.
                </p>
              </div>
            </div>
            <div class="mt-3">
              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">EVERYTHING IN BASIC, PLUS:</li>
              </ul>
              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Add Unlimited Contents</li>
              </ul>
              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Unlimited Content Backup</li>
              </ul>
              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Add Unlimited Portfolios</li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">
                  Personalized Portfolios with Portfolio Customizer
                </li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Track Portfolio Messaging</li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">
                  Track Portfolio Analytics from Google Analytics
                </li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Add Custom domain to Portfolios</li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Hiring Feature</li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Add Unlimited Integrations</li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Schedule Content for Promotion</li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Premium Portfolio templates</li>
              </ul>
            </div>

            <div class="flex justify-center items-center mt-20 mb-5">
              <nuxt-link :to="`/subscriptions?tab=Address&&plan=yearly`">
                <button
                  class="
                    py-3
                    px-10
                    text-sm text-[#286963]
                    bg-[#fff]
                    rounded-md
                    border border-[#286963]
                    md:px-20
                  "
                >
                  Get Premium Yearly
                </button>
              </nuxt-link>
            </div>
          </div>

          <!-- ==========BASIC PLAN=========== -->
          <div
            class="px-8 pt-8 pb-6 text-[#666666] bg-[#FCFCFC] rounded-lg border"
          >
            <div class="pb-5 border-b-2 border-[#99999966]">
              <div>
                <div>
                  <small class="text-[18px] leading-[18px] text-[#286963]"
                    >Premium Monthly</small
                  >
                  <h4
                    class="
                      mt-1
                      text-[40px]
                      font-medium
                      leading-[40px]
                      text-[#102A27]
                    "
                  >
                    $9.99
                    <sub class="text-[14px] font-extralight text-gray-300"
                      >per month</sub
                    >
                  </h4>
                </div>
                <p class="mt-6 text-base">
                  Get all the unlimited benefits you need to grow your freelance
                  technical writing career.
                </p>
              </div>
            </div>
            <div class="mt-3">
              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">EVERYTHING IN BASIC, PLUS:</li>
              </ul>
              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Add Unlimited Contents</li>
              </ul>
              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Unlimited Content Backup</li>
              </ul>
              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Add Unlimited Portfolios</li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">
                  Personalized Portfolios with Portfolio Customizer
                </li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Track Portfolio Messaging</li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">
                  Track Portfolio Analytics from Google Analytics
                </li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Add Custom domain to Portfolios</li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Hiring Feature</li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Add Unlimited Integrations</li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Schedule Content for Promotion</li>
              </ul>

              <ul class="flex mb-3 text-[14px]">
                <li>
                  <img src="~/assets/img/u_check-circle.png" alt="" srcset="" />
                </li>
                <li class="ml-2">Premium Portfolio templates</li>
              </ul>
            </div>

            <div class="flex justify-center items-center mt-20 mb-5">
              <nuxt-link :to="`/subscriptions?tab=Address&&plan=monthly`">
                <button
                  class="
                    py-3
                    px-10
                    text-sm text-[#286963]
                    bg-[bg-transparen]
                    rounded-md
                    border border-[#286963]
                    md:px-24
                  "
                >
                  Get Premium Monthly
                </button>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </span>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Pricing',

  data: () => ({
    showYear: true,
    showMonth: false
  }),

  head() {
    return {
      title: 'Pricing',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Get started now, we've got awesome price that fits your purse"
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Pricing'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            "Get started now, we've got awesome price that fits your purse"
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://contentre.io/pricing'
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: '800'
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '800'
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
    }
  },

  async mounted() {
    await this.$segment({
      operation: 'identify'
    })

    await this.$segment({
      eventName: 'Viewed Plan Page'
    })
  },

  methods: {
    onShowYear() {
      this.showYear = true
      this.showMonth = false
    },
    onShowMonth() {
      this.showYear = false
      this.showMonth = true
    }
  }
}
</script>

<style>
</style>