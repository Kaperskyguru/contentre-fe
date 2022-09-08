<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Portfolios</PageTitle>
    </div>

    <section
      class="flex flex-col justify-end mb-6 space-y-6 md:flex-row md:space-y-0"
    >
      <!-- <div>
        <ContentFilter :filter-columns="columns" @filters="onFilters" />
      </div> -->

      <div>
        <Button
          :is-pro-feature="hasExceededPortfolio"
          :message="
            hasExceededPortfolio
              ? 'You have exceeded this plan, upgrade now'
              : ''
          "
          @click.prevent="onAddPortfolio"
          >Add Portfolio</Button
        >
      </div>
    </section>

    <section class="container mx-auto">
      <StatOverview
        :columns="boxColumns"
        :stats="getBoxStats"
        :is-under-development="true"
      />
    </section>

    <div
      class="p-4 mt-6 bg-white rounded-lg shadow-lg sm:p-6 md:col-span-2 xl:p-8"
      :class="{
        'bg-gray-100': isUnderDevelopment
      }"
    >
      <ChartOverview
        :is-under-development="isUnderDevelopment"
        title="Traffic Overview"
        :data="{}"
      />
    </div>

    <section class="container mx-auto mt-8">
      <div class="mb-5">
        <div class="flex justify-between items-center py-4">
          <h2 class="font-gilroy text-2xl font-semibold leading-tight">
            Portfolios
          </h2>
        </div>
        <div class="flex flex-wrap">
          <!-- Portfolio 1 -->
          <div
            v-for="(portfolio, i) in portfolios.items"
            :key="i"
            class="p-4 mb-4 w-full md:w-1/2 lg:px-2 lg:my-2 lg:w-1/3"
          >
            <article class="overflow-hidden p-4 bg-white rounded-lg shadow">
              <!-- <div class="w-full">
                <a href="#">
                  <img
                    alt="Placeholder"
                    class="block w-full h-auto"
                    src="~/assets/img/portfolio-pic2.png"
                  />
                </a>
              </div> -->
              <header class="py-4 leading-tight">
                <span class="font-bold text-gray-900">
                  {{ portfolio.title }}
                </span>
              </header>

              <div class="py-4 w-full">
                <p>{{ portfolio.description }}</p>
              </div>

              <div
                class="
                  flex flex-col
                  mb-5
                  space-y-2 space-x-0
                  text-center
                  md:flex-row md:space-y-0 md:space-x-2
                "
              >
                <Button
                  class="w-full"
                  appearance="secondary"
                  @click.prevent="onDeletePortfolio(portfolio.id)"
                  >Delete</Button
                >
                <Button
                  class="w-full"
                  @click.prevent="onEditPortfolio(portfolio.id)"
                  >Edit</Button
                >
              </div>
              <a target="_blank" class="text-red-700" :href="portfolio.url"
                >Preview as new page</a
              >
            </article>
          </div>
          <!-- End Portfolio 1 -->
        </div>
      </div>
    </section>

    <LazyPortfolioEdit
      v-model="isConfirmModalVisible"
      :portfolio-id="portfolioId"
      @toggle="refetch"
    />

    <Dialog
      v-model="isDeletePortfolioVisible"
      primary-text="Confirm"
      secondary-text="Cancel"
      @answer="deletePortfolio"
    >
      <template #icon>
        <IconInformationCircle class="w-20 h-20" />
      </template>
      <p>Are you sure you want to delete your portfolio?</p>
    </Dialog>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Rocket from '~/assets/icons/rocket.svg'
import Show from '~/assets/icons/show.svg'
import Chat from '~/assets/icons/chat.svg'
import { DELETE_PORTFOLIO, GET_PORTFOLIOS } from '~/graphql'
import { currentUser } from '~/components/mixins'
export default {
  components: {
    IconInformationCircle: () =>
      import('~/assets/icons/information-circle.svg?inline')
  },

  mixins: [currentUser],
  data: () => ({
    isConfirmModalVisible: false,
    isDeletePortfolioVisible: false,
    isUnderDevelopment: true,
    checked: [],
    columns: [],
    boxColumns: [
      {
        text: 'Users',
        key: 'users',
        icon: Rocket
      },
      {
        text: 'Unique Users',
        key: 'newUser',
        icon: Show
      },
      {
        text: 'Page Views',
        key: 'views',
        icon: Chat
      }
    ],
    getBoxStats: {},
    portfolioId: null,
    portfolios: {
      items: [],
      total: 0
    }
  }),

  apollo: {
    portfolios: {
      query: GET_PORTFOLIOS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        const netTotal = data.getPortfolios.meta.netTotal
        this.$store.commit('subscription/updateTotalPortfolios', netTotal)
        return {
          items: data.getPortfolios.portfolios,
          total: data.getPortfolios.meta.total
        }
      },
      variables: {
        size: 10,
        skip: 0
      }
    }
  },

  computed: {
    hasExceededPortfolio() {
      const subValue = this.$utils.getFeatureValue(
        this.subscription,
        'TOTAL_PORTFOLIOS'
      )
      if (subValue === 0) return false
      return this.totalNumber >= subValue
    },
    ...mapState({
      totalNumber: (state) => {
        return state.subscription.numberOfPortfolios ?? 0
      },
      subscription: (state) => {
        return state.subscription.subscription
      }
    })
  },
  methods: {
    onFilters() {},
    onAddPortfolio() {
      this.portfolioId = null
      this.isConfirmModalVisible = true
    },

    onEditPortfolio(id) {
      this.portfolioId = id
      this.isConfirmModalVisible = true
    },

    onDeletePortfolio(id) {
      this.portfolioId = id
      this.isDeletePortfolioVisible = !this.isDeletePortfolioVisible
    },

    async refetch() {
      await this.$apollo.queries.portfolios.refetch()
    },

    async deletePortfolio(answer) {
      if (!answer) return

      try {
        this.$emit(
          'deleted',
          await this.$apollo.mutate({
            mutation: DELETE_PORTFOLIO,
            variables: {
              id: this.portfolioId
            }
          })
        )
        this.$toast.positive('Portfolio deleted successfully')
        this.sending = false
        await this.refetch()
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    }
  }
}
</script>

<style>
</style>