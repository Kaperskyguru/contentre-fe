<template>
  <span>
    <Card
      class="flex flex-row gap-2 justify-between items-center py-4 mb-6 md:p-5"
    >
      <PageTitle>Portfolios</PageTitle>
      <ContentFilter
        :remove="remove"
        :options="{
          isFullCalendar: filters.unit === 'year' ? false : true
        }"
        :filter-columns="columns"
        :show-sort-by="false"
        @filters="onFilters"
        @reset="onClearFilters"
      >
        <div class="flex mb-6 space-x-4">
          <DropdownField
            v-model="filters.portfolioId"
            placeholder="Portfolios"
            class="flex-1"
            label="Portfolios"
          >
            <option
              v-for="(column, i) in portfolios.items"
              :key="i"
              :value="column.id"
            >
              {{ column.title }}
            </option>
          </DropdownField>
        </div>

        <div class="flex mb-6 space-x-4">
          <DropdownField v-model="filters.period" label="Period" class="flex-1">
            <option value="1day">Today</option>
            <option value="24hour">Last 24 hours</option>
            <option value="-1day">Yesterday</option>
            <option value="1week">This week</option>
            <option value="7day">Last 7 days</option>

            <option value="1month">This month</option>
            <option value="30day">Last 30 days</option>
            <option value="90day">Last 90 days</option>

            <option value="1year">This year</option>
            <!-- <option value="all">All time</option> -->
          </DropdownField>
        </div>
      </ContentFilter>
    </Card>

    <Card class="mb-6">
      <StatOverview :columns="boxColumns" :stats="portfoliosStats.stats" />

      <div
        class="p-4 mt-6 bg-white rounded-lg sm:p-6 md:col-span-2 xl:p-8"
        :class="{
          'bg-gray-100': isUnderDevelopment
        }"
      >
        <Loading
          v-if="$apollo.queries.portfoliosStats.loading"
          class="flex flex-1 items-center"
        />
        <ChartOverview
          v-else
          hide-percent
          title="Traffic Overview"
          is-traffic
          :records="records('day')"
          :data="portfoliosStats.analytics"
        />
      </div>
    </Card>

    <Card>
      <UserPortfolios
        :portfolios="portfolios"
        @create="onAddPortfolio"
        @edit="onEditPortfolio"
        @delete="onDeletePortfolio"
      />
    </Card>

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
  </span>
</template>

<script>
import { mapState } from 'vuex'
import Rocket from '~/assets/icons/rocket.svg'
import Show from '~/assets/icons/show.svg'
import Chat from '~/assets/icons/chat.svg'
import {
  dateFormat,
  getDateArray,
  getDateLength,
  getDateRange
  // getDateRangeValues
} from '~/lib/date'
import {
  DELETE_PORTFOLIO,
  GET_PORTFOLIOS,
  GET_PORTFOLIO_STATS
} from '~/graphql'
import { currentUser } from '~/components/mixins'
export default {
  components: {
    IconInformationCircle: () =>
      import('~/assets/icons/information-circle.svg?inline')
  },

  mixins: [currentUser],
  data: () => ({
    remove: ['client', 'category', 'topic', 'tag', 'amount', 'sortby'],
    isConfirmModalVisible: false,
    isDeletePortfolioVisible: false,
    isUnderDevelopment: true,
    filters: {
      unit: 'day',
      period: '1week'
    },
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
    portfoliosStats: {
      stats: {},
      analytics: {}
    },
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
    },

    portfoliosStats: {
      query: GET_PORTFOLIO_STATS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        const { startDate, endDate, unit } = getDateRange(
          this.filters?.period ?? '1week'
        )

        const stats = data.getPortfolioStats.stats
        const analytics = data.getPortfolioStats.analytics
        return {
          stats: {
            views: stats.totalPageViews.value,
            viewsPercent: stats.totalPageViews.change,
            newUser: stats.totalUniques.value,
            newUserPercent: stats.totalUniques.change,
            users: stats.totalUsers.value,
            usersPercent: stats.totalUsers.change
          },
          analytics: {
            data: true,
            labels: this.renderXLabel(
              getDateArray(
                analytics.pageviews,
                this.filters?.startDate ?? startDate,
                this.filters?.endDate ?? endDate,
                unit
              ),
              unit
            ),
            stats: [
              {
                data: getDateArray(
                  analytics.pageviews,
                  this.filters?.startDate ?? startDate,
                  this.filters?.endDate ?? endDate,
                  unit
                ),

                pointRadius: 0,
                label: 'Page views',
                borderColor: '#4FD1C5',
                borderWidth: 3,
                backgroundColor: 'rgba(79, 209, 197, .54)',
                fill: 'start'
              },
              {
                data: getDateArray(
                  analytics.sessions,
                  this.filters?.startDate ?? startDate,
                  this.filters?.endDate ?? endDate,
                  unit
                ),
                pointRadius: 0,
                label: 'Unique visitors',
                borderColor: 'rgba(79, 209, 197, .20)',
                borderWidth: 3,
                backgroundColor: 'rgba(79, 209, 197, .20)',
                fill: 'start'
              }
            ]
          }
        }
      },
      variables() {
        let newStartDate
        let newEndDate
        let newUnit = 'year'
        if (this.filters?.period !== 'all') {
          const { startDate, endDate, unit } = getDateRange(
            this.filters?.period ?? '1week'
          )
          newStartDate = startDate
          newEndDate = endDate
          newUnit = unit
        }

        return {
          filters: {
            ...this.filters,
            fromDate: this.filters?.startDate ?? newStartDate,
            toDate: this.filters?.endDate ?? newEndDate,
            unit: newUnit
          }
        }
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
    records(unit) {
      const period =
        this.filters?.period === 'all'
          ? '1year'
          : this.filters?.period ?? '1week'

      const { startDate, endDate } = getDateRange(period)
      return getDateLength(startDate, endDate, unit ?? 'day')
    },
    renderXLabel(data, unit) {
      if (this.$apollo.queries.portfoliosStats.loading) return ''

      const d = data.map((item, index) => {
        const d = new Date(item.t)

        // const sw = this.$refs.canvas.width / window.devicePixelRatio

        switch (unit) {
          case 'minute':
            return index % 2 === 0 ? dateFormat(d, 'H:mm', this.locale) : ''
          case 'hour':
            return dateFormat(d, 'p', this.locale)
          case 'day':
            if (this.records(unit) > 25) {
              // if (sw <= 275) {
              //   return index % 10 === 0 ? dateFormat(d, 'M/d', this.locale) : ''
              // }
              // if (sw <= 550) {
              //   return index % 5 === 0 ? dateFormat(d, 'M/d', this.locale) : ''
              // }
              // if (sw <= 700) {
              //   return index % 2 === 0 ? dateFormat(d, 'M/d', this.locale) : ''
              // }

              return dateFormat(d, 'MMM d', this.locale)
            }
            // if (sw <= 375) {
            //   return index % 2 === 0 ? dateFormat(d, 'MMM d', this.locale) : ''
            // }
            // if (sw <= 425) {
            //   return dateFormat(d, 'MMM d', this.locale)
            // }

            return dateFormat(d, 'EEE M/d', this.locale)
          case 'month':
            // if (sw <= 330) {
            //   return index % 2 === 0 ? dateFormat(d, 'MMM', this.locale) : ''
            // }
            return dateFormat(d, 'MMM', this.locale)
          default:
            return dateFormat(d, 'MMM', this.locale)
        }
      })
      return d
    },

    onFilters(v) {
      this.filters = {
        ...this.filters,
        ...v
      }
    },

    onClearFilters(v) {
      this.filters = {
        ...v
      }
    },

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