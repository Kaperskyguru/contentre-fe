<template>
  <div
    v-if="error"
    class="grid justify-center content-center items-center h-screen bg-white"
  >
    <NoData message="Portfolio not found">
      <Button
        type="link"
        href="https://app.contentre.io/auth/register?source=portfolio"
        class="mt-4"
        appearance="secondary"
        size="small"
      >
        {{ 'Create new portfolio' }}
      </Button>
    </NoData>
  </div>

  <main v-else class="bg-white">
    <section class="pt-3 my-8">
      <h1 class="text-3xl font-bold text-gray-900">{{ portfolio.name }}</h1>
    </section>

    <section class="text-center text-white">
      <div class="flex flex-col pt-5 pb-8 mx-auto md:flex-row">
        <div class="mb-2 w-full rounded-lg">
          <div class="relative w-80 h-80">
            <img
              class="object-cover object-center rounded-full"
              alt="profile image"
              :src="computedProfileImage(portfolio.profileImage)"
            />
          </div>
        </div>
        <div
          class="
            flex flex-col
            py-4
            px-10
            mb-2
            text-center
            md:ml-2 md:w-1/2
            lg:grow
          "
          style="background: #13142b"
        >
          <h2
            class="
              mt-8
              mb-4
              text-2xl
              font-bold
              text-white
              uppercase
              sm:text-2xl
            "
          >
            About Me
          </h2>
          <p class="mb-8 text-xs">
            {{ portfolio.about || 'About me not provided' }}
          </p>
          <div class="flex justify-center pb-8">
            <button
              class="
                py-2
                px-12
                mr-2
                text-sm
                font-bold
                text-white
                rounded
                shadow
                form-btn
              "
              style="background: #00aeff"
            >
              Contact me
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-4">
      <div class="container mx-auto">
        <div class="flex justify-between items-center py-2">
          <h2 class="pt-4 text-3xl font-bold text-gray-900 uppercase">
            Portfolio
          </h2>
        </div>

        <section
          class="
            flex flex-col
            justify-between
            my-6
            space-y-6 space-x-0
            md:flex-row md:space-y-0 md:space-x-5
          "
        >
          <div>
            <ContentFilter
              :filter-columns="columns"
              :clients="portfolio.clients"
              :categories="portfolio.categories"
              :topics="portfolio.topics"
              :tags="portfolio.tags"
              :remove="remove"
              @filters="onFilters"
            />
          </div>

          <div class="w-full">
            <SearchField
              id="search"
              v-model="filters.terms"
              placeholder="Search by name..."
            />
          </div>
        </section>

        <div>
          <!-- Column -->
          <div v-if="noData" class="justify-center">
            <NoData message="No content added yet">
              <Button
                type="link"
                href="https://app.contentre.io/contents/add?source=portfolio"
                class="mt-4"
                appearance="secondary"
                size="small"
              >
                {{ 'Add your content now' }}
              </Button>
            </NoData>
          </div>

          <div v-else class="grid gap-4 lg:grid-cols-4">
            <!-- Card -->
            <div
              v-for="content in getContents"
              :key="content.id"
              class="mb-2 max-w-md rounded-lg shadow-lg"
            >
              <div class="w-full">
                <div class="block overflow-hidden w-full h-32">
                  <div class="w-full">
                    <img
                      :alt="content.title"
                      class="w-full h-full"
                      style="object-fit: cover; max-width: 100%"
                      :src="computedImage(content.featuredImage)"
                    />
                  </div>
                </div>
                <div class="p-5 pt-3">
                  <div class="py-4 leading-tight">
                    <h3 class="text-lg font-bold text-gray-500">
                      <a
                        :href="content.url"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {{ content.title }}
                      </a>
                    </h3>
                  </div>
                  <p class="text-lg font-normal text-gray-600">
                    <span v-html="content.excerpt"></span>
                  </p>
                </div>
              </div>
            </div>

            <!-- End Card -->
          </div>
          <!-- END Column -->
        </div>
      </div>
    </section>

    <section class="pb-10 mb-10">
      <div
        class="
          flex flex-col
          justify-between
          pt-2
          mb-6
          space-y-4 space-x-0
          md:flex-row md:space-y-0 md:space-x-4
        "
      >
        <Button @click.prevent="previous"> Previous </Button>

        <Button :disabled="portfolio.total" @click.prevent="next">
          Next
        </Button>
      </div>
    </section>
  </main>
</template>

<script>
import ImageBG from 'assets/img/cover_image.png'
import { GET_PORTFOLIO_CONTENT } from '~/graphql'
export default {
  layout: 'portfolio',
  data: () => ({
    image: ImageBG,
    username: '',
    portfolio: {},
    filters: {},
    remove: ['amount'],
    columns: [],
    error: false,
    total: 0,
    size: 12,
    skip: 0
  }),
  apollo: {
    portfolio: {
      query: GET_PORTFOLIO_CONTENT,
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          size: this.size,
          skip: this.skip,
          filters: {
            username: this.username,
            terms: this.filters?.terms,
            ...this.filters
          }
        }
      },
      update(data) {
        return {
          ...data.getPortfolioContent,
          total: data.getPortfolioContent?.contents?.meta?.total ?? 0,
          contents: data.getPortfolioContent.contents.contents
        }
      },
      skip() {
        return !this.username
      },
      error(e) {
        this.error = true
      }
    }
  },
  computed: {
    getContents() {
      return this.portfolio?.contents ?? []
    },
    noData() {
      return !this.portfolio?.contents?.length
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler(params) {
        this.username = params.portfolio
      }
    }
  },
  methods: {
    previous() {},

    next() {
      const len = this.portfolio?.contents?.length
      if (
        !this.$apollo.queries.portfolio.loading &&
        len !== 0 &&
        len !== (this.portfolio?.total ?? 0)
      ) {
        this.size = this.size ?? 12
        this.skip = len
      }

      // return this.fetchMore({
      //   size: this.size ?? 12,
      //   skip: len,
      // })
    },

    fetchMore(sizeAndSkip) {
      const itemsKey = 'contents'
      const queryName = 'getPortfolioContent'
      this.$apollo.queries.portfolio.fetchMore({
        // New variables
        variables: {
          ...sizeAndSkip,
          filters: this.filters
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newItems =
            ((fetchMoreResult ?? {})[queryName] ?? {})[itemsKey] ?? []
          const oldItems =
            ((previousResult ?? {})[queryName] ?? {})[itemsKey] ?? []

          return {
            [queryName]: {
              ...fetchMoreResult[queryName],
              [itemsKey]: [...oldItems, ...newItems]
            }
          }
        }
      })
    },

    onFilters(data) {
      if (this.deleteFilter('amount')) {
        delete data.fromAmount
        delete data.toAmount
      }
      this.filters = {
        ...this.filters,
        ...data,
        tags: data.tags.length ? data.tags.map((tag) => tag.name) : undefined
      }
    },

    getProfile(client) {
      return client.profile ? client.profile : '#'
    },

    deleteFilter(name) {
      return this.remove.includes(name)
    },
    computedImage(image) {
      return image ?? require('~/assets/img/portfolio-pic1.png')
    },
    computedProfileImage(image) {
      return image ?? require('~/assets/img/temp-pic2.png')
    },
    displayedCategoryStyle(category) {
      return category?.color
        ? { background: `#${category.color}80` }
        : '#75b97080'
    }
  }
}
</script>

<style>
</style>