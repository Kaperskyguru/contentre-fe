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
        <Button @click.prevent="onAddPortfolio">Add Portfolio</Button>
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

    <section class="z-10 mt-8 w-full">
      <UserPortfolios
        :portfolios="portfolios"
        @create="onAddPortfolio"
        @edit="onEditPortfolio"
        @delete="onDeletePortfolio"
      />
    </section>

    <LazyPortfolioEdit
      v-model="isConfirmModalVisible"
      :portfolio-id="portfolioId"
      @toggle="refetch"
    />

    <Dialog v-model="isUpgradeModalVisible" :is-large="true">
      <UpgradeModal @back="back">You've hit your portfolio limit</UpgradeModal>
    </Dialog>

    <Dialog v-model="isCreateNewModalVisible" :is-large="true">
      <CreateNew :portfolios="portfolios" />
    </Dialog>

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
    isUpgradeModalVisible: false,
    isCreateNewModalVisible: false,
    activePortfolioId: null,
    menu: false,
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
    back() {
      this.isUpgradeModalVisible = false
    },
    onAddPortfolio() {
      if (this.hasExceededPortfolio) {
        this.isUpgradeModalVisible = true
        return
      }
      this.portfolioId = null
      this.isCreateNewModalVisible = true
    },

    onEditPortfolio(id) {
      this.portfolioId = id
      this.isConfirmModalVisible = true
    },

    onDeletePortfolio(id) {
      this.portfolioId = id
      this.isDeletePortfolioVisible = !this.isDeletePortfolioVisible
    },

    onOpenSubMenu(id = '') {
      this.menu = !this.menu

      if (this.menu) this.activePortfolioId = id
      else this.activePortfolioId = null
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
.trans-enter-active {
  transition: all 1s ease;
}

.trans-leave-active {
  transition: all 1s ease;
}
</style>