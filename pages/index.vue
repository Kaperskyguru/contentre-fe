<template>
  <PageContent>
    <Card class="flex flex-row gap-2 justify-between items-center">
      <PageTitle>Dashboard</PageTitle>

      <div>
        <Button appearance="primary" @click.prevent="onAddContent">
          Add Content
        </Button>
      </div>
      <!-- </div> -->
    </Card>

    <Card>
      <StatOverview :columns="boxColumns" :stats="metadata.stats" />
    </Card>

    <!-- Chart -->
    <!-- <Card
      class="
        grid grid-cols-1
        2xl:grid-cols-3
        gap-4
        w-full
        md:grid-cols-2
        lg:grid-cols-2
        xl:grid-cols-3
      "
    >
      <div class="p-4 bg-white rounded-lg shadow sm:p-6 md:col-span-2 xl:p-8">
        <Loading
          v-if="$apollo.queries.metadata.loading"
          class="flex flex-1 items-center"
        />
        <ChartOverview
          v-else
          :data="metadata.revenue"
          :percent="getPercentAmount"
        />
      </div>

      <div class="p-2 bg-white rounded-lg shadow sm:p-3 xl:p-5">
        <div class="overflow-hidden">
          <header class="px-2 leading-tight">
            <span class="text-2xl font-bold text-gray-900 sm:text-2xl"
              >Client Overview</span
            >

            <h3 class="pb-4 font-normal text-gray-500">
              Yearly Account Overview
            </h3>
          </header>

          <div class="">
            <Loading
              v-if="$apollo.queries.contentImpact.loading"
              class="flex flex-1 items-center"
            />
            <Column
              v-else
              type="doughnut"
              :show-header="false"
              :chart-data="contentImpact"
            />
          </div>
        </div>
      </div>
    </Card> -->

    <!-- table -->
    <Card class="pb-6 h-full md:h-[750px]">
      <!-- <section class="container px-4 my-8 mx-auto bg-white">
        <div class="flex justify-between items-center py-4">
          <h2 class="font-gilroy text-2xl font-semibold leading-tight">
            Clients
          </h2>
        </div> -->
      <ClientOverview :checked.sync="checked" placement="dashboard" />
      <!-- </section> -->
    </Card>
    <Dialog v-model="isAddContent">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <LazyAddContent @created="onCreatedContent" />
        </div>
      </div>
      <div class="flex justify-center pt-5 text-xs font-bold text-btn-green">
        <div @click.prevent="onMultipleUpload">Or bulk import URLs</div>
      </div>
    </Dialog>

    <Dialog v-model="isAddMultipleContent">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <LazyUploadMultipleContents @created="onCreatedContent" />
        </div>
      </div>
    </Dialog>

    <Dialog v-model="isUpgradeModalVisible" :is-large="true">
      <UpgradeModal @back="back">You've hit your content limit</UpgradeModal>
    </Dialog>
  </PageContent>
</template>

<script>
import { mapState } from 'vuex'
import { GET_INDEX_METADATA, GET_OVERALL_STATS } from '~/graphql'
import Rocket from '~/assets/icons/rocket.svg'
import Show from '~/assets/icons/show.svg'
import Heart from '~/assets/icons/heart.svg'
import Chat from '~/assets/icons/chat.svg'
export default {
  name: 'HomePage',
  layout: 'Dashboard',
  middleware: ['isOnboardingCompleted'],
  data: () => ({
    metadata: {
      stats: [],
      revenue: {}
    },
    isAddContent: false,
    isAddMultipleContent: false,

    isUpgradeModalVisible: false,
    checked: [],
    contentImpact: {
      labels: [],
      title: '',
      datasets: []
    },
    boxColumns: [
      {
        text: 'Total Revenue',
        key: 'amounts',
        icon: Rocket
      },
      {
        text: 'Total Contents',
        key: 'contents',
        icon: Show
      },
      {
        text: 'Total Clients',
        key: 'clients',
        icon: Heart
      },
      {
        text: 'Interactions',
        key: 'interactions',
        icon: Chat
      }
    ]
  }),

  apollo: {
    metadata: {
      query: GET_INDEX_METADATA,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return {
          stats: data.getIndexMetadata?.box,
          revenue: {
            labels: data.getIndexMetadata?.revenue?.months,
            current: data.getIndexMetadata?.revenue?.data?.current,
            last: data.getIndexMetadata?.revenue?.data?.last
          }
        }
      }
    },

    contentImpact: {
      query: GET_OVERALL_STATS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        const stat = data.getOverallStats?.performance
        return stat
          ? {
              labels: ['Interactions', 'Contents', 'Amount'],
              title: '',
              datasets: [
                {
                  label: '',
                  data: [
                    stat.totalInteractions,
                    stat.totalContents,
                    stat.totalAmount
                  ],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                }
              ]
            }
          : []
      }
    }
  },
  head() {
    return {
      title: 'Dashboard'
    }
  },

  computed: {
    ...mapState({
      subscription: (state) => {
        return state.subscription.subscription
      },
      totalNumber: (state) => {
        return state.subscription.numberOfContents ?? 0
      }
    }),
    hasExceededContent() {
      const subValue = this.$utils.getFeatureValue(
        this.subscription,
        'TOTAL_CONTENTS'
      )
      if (subValue === 0) return false
      return this.totalNumber >= subValue //! (this.totalNumber >= subValue)
    },
    getRevenueChartData() {
      return this.metadata?.revenue ?? []
    },
    getPercentAmount() {
      return parseFloat(this.metadata?.stats?.amountPercent).toFixed(2)
    },
    getStats() {
      return this.metadata?.box ?? {}
    }
  },

  methods: {
    back() {
      this.isUpgradeModalVisible = false
    },
    onAddContent() {
      if (this.hasExceededContent) {
        this.isUpgradeModalVisible = true
        return
      }
      this.isAddContent = true
    },
    onMultipleUpload() {
      this.isAddMultipleContent = true
    },

    onCreatedContent(done) {
      if (!done) {
        this.$toast.positive('Content failed')
        return
      }
      this.isAddContent = false
      this.isAddMultipleContent = false
      this.$toast.positive('Content created successfully')
      this.$router.push({
        path: '/contents'
      })
    }
  }
}
</script>

<style>
</style>
