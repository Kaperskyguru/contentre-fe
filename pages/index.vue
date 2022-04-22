<template>
  <PageContent>
    <section class="px-3 h-full md:px-12">
      <div class="flex justify-between items-center py-4">
        <PageTitle>Dashboard</PageTitle>
      </div>
      <section class="container mx-auto">
        <StatOverview :columns="boxColumns" :stats="metadata.stats" />
      </section>

      <!-- Chart -->

      <section class="pt-6">
        <div
          class="
            grid grid-cols-1
            gap-4
            w-full
            md:grid-cols-2
            lg:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-3
          "
        >
          <!-- Chart 1 -->
          <div
            class="p-4 bg-white rounded-lg shadow sm:p-6 md:col-span-2 xl:p-8"
          >
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
          <!-- Chart 2-->
          <div class="p-2 bg-white rounded-lg shadow sm:p-3 xl:p-5">
            <div class="overflow-hidden">
              <header class="px-2 leading-tight">
                <span class="text-2xl font-bold text-gray-900 sm:text-2xl"
                  >Client Overview</span
                >
                <h3 class="pb-4 font-normal text-gray-500">
                  Yearly Content Impact
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
        </div>
      </section>

      <!-- Chart End -->

      <!-- table -->

      <section class="container px-4 my-8 mx-auto bg-white">
        <div class="flex justify-between items-center py-4">
          <h2 class="font-gilroy text-2xl font-semibold leading-tight">
            Clients
          </h2>
        </div>
        <ClientOverview :checked.sync="checked" />
      </section>

      <!-- End of table -->
    </section>
  </PageContent>
</template>

<script>
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

  computed: {
    getRevenueChartData() {
      return this.metadata?.revenue ?? []
    },
    getPercentAmount() {
      return parseFloat(this.metadata?.stats?.amountPercent).toFixed(2)
    },
    getStats() {
      return this.metadata?.box ?? {}
    }
  }
}
</script>

<style>
</style>
