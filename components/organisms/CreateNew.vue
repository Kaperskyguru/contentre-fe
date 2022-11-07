<template>
  <main class="w-full">
    <div class="flex justify-center items-center">
      <div class="justify-center items-center w-full text-center">
        <h3 class="mb-6 text-2xl font-semibold lg:text-4xl">
          Create New Portfolio
        </h3>
        <p class="mb-6 text-lg">Copy an existing portfolio</p>
        <div class="justify-center items-center w-full md:space-x-2 lg:flex">
          <div class="flex p-3 mb-4 w-full rounded-lg lg:mb-0 lg:w-[75%]">
            <DropdownField
              id=""
              v-model="portfolioId"
              name=""
              class="w-full"
              placeholder="Select a portfolio"
              @update:value="onPortfolioChange"
            >
              <option
                v-for="(item, i) in portfolios.items"
                :key="i"
                :value="item.id"
              >
                {{ item.title }}
              </option>
            </DropdownField>
          </div>

          <Button @click.prevent="createPortfolioFrom">Copy</Button>
        </div>
      </div>
    </div>
    <section class="mt-16">
      <p class="mb-6 text-lg text-center">
        Or choose from one of the options below
      </p>
      <div class="flex justify-center">
        <div class="p-4 bg-gray-100 rounded-xl">
          <div
            class="
              grid
              auto-rows-[minmax(320px)]
              gap-4
              md:grid-cols-2
              lg:grid-cols-2
            "
          >
            <!-- =======Card 1================== -->
            <!-- rgb(223,
              228,
              229) -->
            <!-- <div
              class="
                group
                flex
                justify-center
                items-center
                h-full
                text-black
                bg-[#dfe4e5]
                hover:bg-gray-600
                rounded-xl
                transition-all
                duration-500
                cursor-pointer
              "
            >
              <div class="mb-5">
                <div class="flex justify-center items-center">
                  <img src="~/assets/img/document-good.svg" alt="" class="" />
                </div>
                <p class="text-xl font-normal text-center">
                  Use existing portfolio
                </p>

                <div class="py-3 px-8">
                  <p class="text-center">
                    Upload your current portfolio, then customize the content
                    and design.
                  </p>
                </div>
              </div>
            </div> -->
            <!-- =====End==Card 1================== -->
            <!-- =======Card 2================== -->
            <div
              class="
                group
                flex
                justify-center
                items-center
                text-black
                hover:text-white
                bg-[#dfe4e5]
                hover:bg-gray-600
                rounded-xl
                transition-all
                duration-500
                cursor-pointer
              "
              @click.prevent="onTemplate"
            >
              <div class="mb-5">
                <div class="flex justify-center">
                  <img src="~/assets/img/document-good.svg" alt="" class="" />
                </div>
                <p class="text-xl text-center">Use sample template</p>

                <div class="py-3 px-8">
                  <p class="text-center">
                    Start with a pre-written templates to jumpstart your
                    portfolio.
                  </p>
                </div>
              </div>
            </div>
            <!-- =====End==Card 2================== -->
            <!-- =======Card 2================== -->
            <div
              class="
                group
                flex
                justify-center
                items-center
                text-black
                hover:text-white
                bg-[#dfe4e5]
                hover:bg-gray-600
                rounded-xl
                transition-all
                duration-500
                cursor-pointer
              "
              @click.prevent="onScratch"
            >
              <div class="mb-5">
                <div class="flex justify-center">
                  <img src="~/assets/img/document-good.svg" alt="" class="" />
                </div>
                <p class="text-xl text-center">Start from scratch</p>

                <div class="py-3 px-8">
                  <p class="text-center">
                    Start with a blank canvas and build your new portfolio from
                    scratch.
                  </p>
                </div>
              </div>
            </div>
            <!-- =====End==Card 2================== -->
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { CREATE_PORTFOLIO } from '~/graphql'
export default {
  props: {
    portfolios: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    portfolioId: null
  }),
  methods: {
    onTemplate() {
      this.$emit('onTemplate')
      this.$router.push('/portfolios/samples')
    },
    async onScratch() {
      this.$emit('onScratch')

      try {
        const input = {
          title: 'New Portfolio',
          shouldCustomize: true,
          templateId: undefined
        }
        const newPortfolio = await this.createPortfolio(input)

        this.$router.push(
          `/portfolios/customizer/?id=${newPortfolio?.template?.id}`
        )
      } catch (error) {
        this.$toast.negative(error.message)
      }
    },

    onPortfolioChange(portfolio) {},

    async createPortfolioFrom() {
      const portfolio = this.findPortfolio(this.portfolioId)

      try {
        if (!portfolio) return
        const input = {
          title: `Copy of ${portfolio.title}`,
          shouldCustomize: false,
          templateId: portfolio?.template?.template?.id ?? undefined
        }
        await this.createPortfolio(input)
        this.$toast.positive('Portfolio created successfully')
        this.$router.push('/portfolios')
      } catch (error) {
        this.$toast.negative(error.message)
      }
    },

    findPortfolio(id) {
      return this.portfolios?.items.find((item) => item.id === id)
    },

    async createPortfolio(input) {
      return await this.$apollo.mutate({
        mutation: CREATE_PORTFOLIO,
        variables: { input },
        update: (cache, { data: { createPortfolio: portfolio } }) => {
          return portfolio
        }
      })
    }
  }
}
</script>

<style>
</style>