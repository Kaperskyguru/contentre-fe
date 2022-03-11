<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center">
      <PageTitle>Analytics</PageTitle>
    </div>

    <!-- calender -->
    <section>
      <ContentFilter @filters="onFilters" />
    </section>
    <!-- end of calender -->

    <section class="container mx-auto">
      <StatOverview :stats="stats" />
    </section>

    <!-- Charts -->
    <div class="pt-6">
      <div
        class="
          gap-4
          w-full
          md:grid-cols-2
          lg:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-3
          grid grid-cols-1
        "
      >
        <div
          class="p-4 bg-white rounded-lg shadow-lg sm:p-6 md:col-span-2 xl:p-8"
        >
          <ChartOverview :data="chartData" :title="stats.chartTitle" />
        </div>

        <div
          class="
            pt-4
            w-full
            bg-white
            rounded-lg
            shadow-lg
            sm:col-span-2
            md:col-span-1
            lg:px-2
          "
        >
          <!-- Card -->
          <div class="overflow-hidden">
            <header class="px-2 leading-tight">
              <span class="text-2xl font-bold text-gray-900 sm:text-2xl"
                >Overall Performance</span
              >
              <h3 class="pb-4 font-normal text-gray-500 text-normal">
                Weekly Content Impact
              </h3>
            </header>

            <div class="">
              <Loading
                v-if="$apollo.queries.metadata.loading"
                class="flex flex-1 items-center"
              />
              <Column
                v-else
                type="doughnut"
                :chart-data="metadata.performance"
              />
            </div>
          </div>
          <!-- END Card -->
        </div>
      </div>
    </div>

    <!-- End of Charts -->

    <!-- footer Articles -->
    <section class="container mx-auto">
      <div class="flex justify-between items-center py-4">
        <h1 class="pt-4 text-3xl font-bold text-gray-900">Top Articles</h1>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 lg:px-2 lg:my-2 lg:w-1/3">
          <div class="p-2 bg-white rounded-lg sm:p-3 xl:p-5">
            <Loading
              v-if="$apollo.queries.getCategoryStats.loading"
              class="flex flex-1 items-center"
            />
            <Column
              v-else
              :chart-data="getCategoryStats"
              type="bar"
              :show-selector="true"
              :selector-data="{ data: getCategories, title: 'Select Category' }"
              @selected="selectCategory"
            />
          </div>
        </div>
        <div class="w-full md:w-1/2 lg:px-2 lg:my-2 lg:w-1/3">
          <div class="p-2 bg-white rounded-lg sm:p-3 xl:p-5">
            <Column
              :show-selector="true"
              :selector-data="{ data: getCategories, title: 'Select Topic' }"
            />
          </div>
        </div>
        <div class="w-full md:w-1/2 lg:px-2 lg:my-2 lg:w-1/3">
          <div class="p-2 bg-white rounded-lg sm:p-3 xl:p-5">
            <Column
              :show-selector="true"
              :selector-data="{ data: getCategories, title: 'Select Tag' }"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- end of footer Articles -->

    <section class="container mx-auto mt-4">
      <OverallStatTable :checked.sync="checked" />
    </section>
    <!-- end of table -->
  </section>
</template>

<script>
import {
  GET_CATEGORIES,
  GET_CATEGORY_STATS,
  GET_OVERALL_STATS
} from '~/graphql'
export default {
  name: 'AnalyticPage',
  layout: 'Dashboard',

  data: () => ({
    metadata: {
      performance: {},
      categoryStat: {}
    },
    getCategoryStats: {
      labels: [],
      title: '',
      datasets: []
    },
    filters: [],
    checked: [],
    stats: {
      shares: 0.0,
      sharePercent: 0.0,
      likes: 0.0,
      likePercent: 0.0,
      comments: 0.0,
      commentPercent: 0.0,
      chartTitle: 'Content Overview'
    },

    chartData: {}
  }),

  apollo: {
    metadata: {
      query: GET_OVERALL_STATS,
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          filters: { ...this.filters }
        }
      },
      update(data) {
        const stat = data.getOverallStats?.performance

        return {
          performance: stat
            ? {
                labels: ['Views', 'Clicks', 'Likes', 'Comments'],
                title: '',
                datasets: [
                  {
                    label: '',
                    data: [
                      stat.totalShares,
                      stat.totalContents,
                      stat.totalLikes,
                      stat.totalComments
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

    getCategoryStats: {
      query: GET_CATEGORY_STATS,
      variables() {
        return {
          filters: { ...this.filters }
        }
      },
      update(data) {
        const category = data.getCategoryStats

        return category
          ? {
              labels: ['Views', 'Clicks', 'Likes', 'Comments'],
              title: category.name,
              datasets: [
                {
                  backgroundColor: '#fff',
                  barPercentage: 1,
                  borderWidth: 700,
                  barThickness: 6,
                  maxBarThickness: 8,
                  minBarLength: 2,
                  categoryPercentage: 1,
                  label: '',
                  data: [
                    category.totalShares,
                    category.totalContents,
                    category.totalLikes,
                    category.totalComments
                  ]
                }
              ]
            }
          : []
      }
    },

    getCategories: {
      query: GET_CATEGORIES,
      update(data) {
        return data.getCategories
      }
    }
  },

  methods: {
    onFilters(data) {
      this.filters = {
        ...data,
        categories: data.categories
      }
    },

    selectCategory(name) {
      this.filters = {
        ...this.filters,
        categories: name ? [name] : null
      }

      this.$apollo.queries.getCategoryStats.refetch()
    }
  }
}
</script>

<style>
</style>