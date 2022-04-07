<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Analytics</PageTitle>
    </div>

    <!-- calender -->
    <section class="mb-6">
      <ContentFilter :show-sort-by="false" @filters="onFilters" />
    </section>
    <!-- end of calender -->

    <section class="container mx-auto">
      <StatOverview :stats="stats" />
    </section>

    <!-- Charts -->
    <div class="pt-6">
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

    <!-- end of footer Articles -->

    <section class="container px-4 mx-auto mt-4">
      <OverallStatTable :checked.sync="checked" />
    </section>
    <!-- end of table -->

    <!-- footer Articles -->
    <section class="container px-4 mx-auto">
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
              :selector-data="{
                data: getCategories,
                title: 'Categories',
                placeholder: getCategoryPlaceholder
              }"
              @selected="selectCategory"
            />
          </div>
        </div>
        <div class="w-full md:w-1/2 lg:px-2 lg:my-2 lg:w-1/3">
          <div class="p-2 bg-white rounded-lg sm:p-3 xl:p-5">
            <Column
              :show-selector="true"
              :selector-data="{
                data: getCategories,
                title: 'Topics',
                placeholder: getCategoryPlaceholder
              }"
            />
          </div>
        </div>
        <div class="w-full md:w-1/2 lg:px-2 lg:my-2 lg:w-1/3">
          <div class="p-2 bg-white rounded-lg sm:p-3 xl:p-5">
            <Loading
              v-if="$apollo.queries.getTagStats.loading"
              class="flex flex-1 items-center"
            />
            <Column
              v-else
              type="bar"
              :chart-data="getTagStats"
              :show-selector="true"
              :selector-data="{
                data: getTags,
                title: 'Tags',
                placeholder: getTagPlaceholder
              }"
              @selected="selectTag"
            />
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import {
  GET_CATEGORIES,
  GET_CATEGORY_STATS,
  GET_OVERALL_STATS,
  GET_TAGS,
  GET_TAG_STATS
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
    getTagStats: {
      labels: [],
      title: '',
      datasets: []
    },
    filters: {
      tags: [],
      categories: []
    },
    tagFilters: [],
    categoryFilters: [],
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

    chartData: []
  }),

  computed: {
    getTagPlaceholder() {
      return this.filters?.tags[0] ?? 'Select a tag'
    },

    getCategoryPlaceholder() {
      return this.filters?.categories[0] ?? 'Select a category'
    }
  },

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
          filters: { ...this.categoryFilters }
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

    getTagStats: {
      query: GET_TAG_STATS,
      variables() {
        return {
          filters: { ...this.tagFilters }
        }
      },
      update(data) {
        const tag = data.getTagStats

        return tag && tag.name
          ? {
              labels: ['Views', 'Clicks', 'Likes', 'Comments'],
              title: tag.name,
              datasets: [
                {
                  backgroundColor: '#fff',
                  barPercentage: 1,
                  borderWidth: 700,
                  barThickness: 6,
                  maxBarThickness: 8,
                  minBarLength: 2,
                  tagPercentage: 1,
                  label: '',
                  data: [
                    tag.totalShares,
                    tag.totalContents,
                    tag.totalLikes,
                    tag.totalComments
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
    },

    getTags: {
      query: GET_TAGS,
      update(data) {
        return data.getTags
      }
    }
  },

  mounted() {
    this.tagFilters = this.filters
    this.categoryFilters = this.filters
  },

  methods: {
    onFilters(data) {
      this.filters = {
        ...data,
        categories: data.categories.length
          ? data.categories.map((cat) => cat.name)
          : data.categories,
        tags: data.tags.length ? data.tags.map((tag) => tag.name) : data.tags
      }

      this.tagFilters = this.filters
      this.categoryFilters = this.filters
    },

    selectCategory(name) {
      this.categoryFilters = {
        ...this.filters,
        categories: name ? [name] : null
      }

      this.$apollo.queries.getCategoryStats.refetch()
    },

    selectTag(name) {
      this.tagFilters = {
        ...this.filters,
        tags: name ? [name] : null
      }

      this.$apollo.queries.getTagStats.refetch()
    }
  }
}
</script>

<style>
</style>