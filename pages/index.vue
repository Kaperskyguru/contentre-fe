<template>
  <PageContent>
    <Card class="flex flex-row gap-2 justify-between items-center">
      <PageTitle>Dashboard</PageTitle>

      <div>
        <Button appearance="primary" @click.prevent="onAddContent">
          Add Content
        </Button>
      </div>
    </Card>

    <Card>
      <StatOverview :columns="boxColumns" :stats="metadata.stats" />
    </Card>

    <Card class="pb-6 min-h-96">
      <ClientOverview :checked.sync="checked" placement="dashboard" />
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
        const box = data.getIndexMetadata?.box
        return {
          stats: {
            ...box,
            amount: box?.amount > 0 ? box.amount : 0
          },
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
