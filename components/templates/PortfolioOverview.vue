<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Portfolios</PageTitle>
    </div>

    <section
      class="
        flex flex-col
        justify-between
        mb-6
        space-y-6
        md:flex-row md:space-y-0
      "
    >
      <div>
        <ContentFilter :filter-columns="columns" @filters="onFilters" />
      </div>

      <div>
        <Button @click.prevent="onAddPortfolio">Add Portfolio</Button>
      </div>
    </section>

    <div class="p-4 bg-white rounded-lg shadow-lg sm:p-6 md:col-span-2 xl:p-8">
      <ChartOverview title="Traffic Overview" />
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
              <div class="w-full">
                <a href="#">
                  <img
                    alt="Placeholder"
                    class="block w-full h-auto"
                    src="~/assets/img/portfolio-pic2.png"
                  />
                </a>
              </div>
              <header class="py-4 leading-tight">
                <span class="font-bold text-gray-900">
                  {{ portfolio.title }}
                </span>
              </header>

              <div
                class="
                  flex flex-col
                  mb-5
                  space-y-2 space-x-0
                  text-center
                  md:flex-row md:space-y-0 md:space-x-2
                "
              >
                <Button type="link" target="_blank" :href="portfolio.url"
                  >Preview</Button
                >
                <Button
                  type="link"
                  :to="{ path: `/portfolios/${portfolio.templateId}` }"
                  >Edit</Button
                >
                <Button
                  type="link"
                  target="_blank"
                  :to="{ path: `/portfolios/c/${portfolio.templateId}` }"
                  >Customize</Button
                >
                <Button class="bg-red" @click.prevent="onDeletePortfolio"
                  >Delete</Button
                >
              </div>
            </article>
          </div>
          <!-- End Portfolio 1 -->
        </div>
      </div>
    </section>

    <Dialog v-model="isConfirmModalVisible">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <AddPortfolio @create:success="onAddPortfolio" />
        </div>
      </div>
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
import { GET_PORTFOLIOS } from '~/graphql'
export default {
  components: {
    IconInformationCircle: () =>
      import('~/assets/icons/information-circle.svg?inline')
  },
  data: () => ({
    isConfirmModalVisible: false,
    isDeletePortfolioVisible: false,
    checked: [],
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
        return { items: data.getPortfolios, total: data.getPortfolios.length }
      },
      variables: {
        size: 10,
        skip: 0
      }
    }
  },

  methods: {
    onAddPortfolio() {
      this.isConfirmModalVisible = !this.isConfirmModalVisible
    },

    onDeletePortfolio() {
      this.isDeletePortfolioVisible = !this.isDeletePortfolioVisible
    },

    deletePortfolio(answer) {
      if (!answer) return
      alert('done')
    }
  }
}
</script>

<style>
</style>