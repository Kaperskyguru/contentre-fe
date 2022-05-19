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

  <main v-else class="container p-5 mx-auto">
    <section class="w-full">
      <div class="py-4">
        <div class="container mx-auto" style="max-width: 1000px">
          <div class="flex flex-col justify-between mt-10 md:flex-row">
            <div class="items-center w-full">
              <div class="w-full">
                <Avatar
                  :src="computedProfileImage(portfolio.profileImage)"
                  :name="portfolio.name"
                  :size="'medium'"
                />
              </div>

              <div class="flex flex-row py-6">
                <div class="container flex m-auto">
                  <a
                    href="#"
                    class="py-3 border-b-4 text-brand border-text-brand"
                  >
                    Connect with me →</a
                  >
                  <div class="justify-center py-4 ml-5"></div>
                </div>
              </div>
            </div>

            <div class="flex justify-end px-5 pb-5 pl-0 w-full">
              <div class="space-y-2">
                <div class="pt-3">
                  <h2 class="text-3xl text-gray-900">
                    {{ portfolio.name }}
                  </h2>
                  <h4 class="font-semibold text-gray-900">
                    {{ portfolio.job }}
                  </h4>
                </div>
                <div class="space-y-4">
                  <!-- <h3>About Me</h3> -->
                  <article class="mt-4 text-lg text-justify">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <p class="text-gray-500" v-html="portfolio.about"></p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto">
      <div class="mt-14 mb-10 text-center">
        <h1 class="text-4xl font-bold">Latest Contents</h1>
        <p class="text-lg text-gray-600">
          All {{ portfolio.name }}'s latest contents right here
        </p>
      </div>

      <div class="container mx-auto">
        <section
          class="
            flex flex-col
            justify-between
            my-6
            space-y-6 space-x-0
            md:flex-row md:space-y-0 md:space-x-5
          "
        >
          <div class="flex items-center space-x-3">
            <p>Filter by:</p>
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

          <div class="flex items-center bg-white rounded-lg">
            <SearchField
              id="search"
              v-model="filters.terms"
              class="text-xl focus:outline-none"
              placeholder="Search by name..."
            />
          </div>
        </section>

        <div>
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

          <div v-else class="grid gap-5 mb-4 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="content in getContents" :key="content.id">
              <div
                id="card"
                class="
                  bg-white
                  rounded-lg
                  shadow
                  hover:shadow-2xl
                  transition
                  duration-300
                  ease-in
                  hover:-translate-y-2
                "
              >
                <a
                  :href="content.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    :alt="content.title"
                    :src="computedImage(content.featuredImage)"
                    class="w-full"
                    style="object-fit: cover; max-width: 100%"
                  />
                  <div class="p-4">
                    <h2 class="text-xl font-bold">{{ content.title }}</h2>

                    <article class="overflow-auto mt-4 h-40 text-base">
                      <!--  eslint-disable-next-line vue/no-v-html -->
                      <span v-html="content.excerpt"></span>
                    </article>

                    <!-- <div class="flex justify-end mb-4">
                      <p>{{ content.datePublished }}</p>
                    </div> -->
                  </div>
                </a>
              </div>
            </div>

            <!-- End Card -->
          </div>
          <!-- END Column -->
        </div>
      </div>
    </section>

    <section class="container pb-10 mt-10">
      <div class="flex justify-center">
        <Button
          appearance="outline"
          :disabled="portfolios.total === getContents.length"
          @click.prevent="next"
        >
          View more
        </Button>
      </div>
    </section>
  </main>
</template>

<script>
import ImageBG from 'assets/img/cover_image.png'
import { GET_PORTFOLIO_DETAIL, GET_PORTFOLIO_CONTENT } from '~/graphql'

export default {
  name: 'CodePage',

  layout: 'portfolio',
  async asyncData(context) {
    const client = context.app.apolloProvider.defaultClient
    const url = `${process.env.FE_URL ?? 'https://contentre.io'}`
    try {
      const {
        data: { getPortfolioDetail: portfolioDetail }
      } = await client.query({
        query: GET_PORTFOLIO_DETAIL,
        variables: {
          filters: {
            username: context.params.portfolio,
            code: context.params.code,
            url: `${url}${context.route.fullPath}`
          }
        },
        skip() {
          return !context.params.portfolio && !context.params.code
        }
      })
      return {
        portfolio: {
          ...portfolioDetail
        }
      }
    } catch (e) {
      return {
        error: true
      }
    }
  },
  data: () => ({
    image: ImageBG,
    username: '',
    portfolio: {},
    portfolios: {},
    filters: {},
    remove: ['amount'],
    columns: [],
    error: false,
    total: 0,
    size: 9,
    skip: 0
  }),
  head() {
    if (!this.error) {
      return {
        title: `${this.portfolio.name}'s writing portfolio`,
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: `${this.portfolio?.job}`
          },
          {
            hid: 'description',
            name: 'description',
            content: `${this.portfolio?.about}`
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: `${this.portfolio.name} writing portfolio`
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: this.portfolio?.about
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: this.portfolio?.profileImage
          },
          {
            hid: 'og:url',
            property: 'og:url',
            content: this.$route?.fullPath
          },
          {
            hid: 'og:image:width',
            property: 'og:image:width',
            content: '800'
          },
          {
            hid: 'og:image:height',
            property: 'og:image:height',
            content: '800'
          },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary_large_image'
          }
        ]
      }
    }
  },
  apollo: {
    portfolios: {
      query: GET_PORTFOLIO_CONTENT,
      fetchPolicy: 'cache-and-network',
      variables() {
        const url = `${process.env.FE_URL ?? 'https://contentre.io'}`
        return {
          size: 9,
          skip: 0,
          filters: {
            ...this.filters,
            username: this.username,
            code: this.code,
            url: `${url}${this.$route.fullPath}`
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
        return !this.username && !this.code
      }
    }
  },
  computed: {
    getContents() {
      return this.portfolios?.contents ?? []
    },
    noData() {
      return !this.portfolios?.contents?.length
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler(params) {
        this.username = params.portfolio
        this.code = params.code
      }
    }
  },
  methods: {
    previous() {},
    next() {
      const len = this.portfolios?.contents?.length
      if (
        !this.$apollo.queries.portfolios.loading &&
        len !== 0 &&
        len !== (this.portfolios?.total ?? 0)
      ) {
        this.size = this.size ?? 9
        this.skip = len
      }
      this.fetchMore({
        size: this.size ?? 12,
        skip: len
      })
    },
    fetchMore(sizeAndSkip) {
      const itemsKey = 'contents'
      const queryName = 'getPortfolioContent'
      const url = `${process.env.FE_URL ?? 'https://contentre.io'}`
      this.$apollo.queries.portfolios.fetchMore({
        // New variables
        variables: {
          ...sizeAndSkip,
          filters: {
            username: this.username,
            code: this.code,
            url: `${url}${this.$route.fullPath}`
          }
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newItems =
            ((fetchMoreResult ?? {})[queryName] ?? {})[itemsKey][itemsKey] ?? []
          const oldItems =
            ((previousResult ?? {})[queryName] ?? {})[itemsKey][itemsKey] ?? []

          return {
            [queryName]: {
              ...fetchMoreResult[queryName],
              [itemsKey]: {
                [itemsKey]: [...oldItems, ...newItems],
                meta: fetchMoreResult[queryName][itemsKey].meta
              }
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
      return (
        image ??
        'https://tailus.io/sources/blocks/twocards/preview/images/man.jpg'
      ) // require('~/assets/img/temp-pic2.png')
    },
    displayedCategoryStyle(category) {
      return category?.color
        ? { background: `#${category.color}80` }
        : '#75b97080'
    }
  }
}
</script>

<style scoped>
.text-brand {
  color: rgba(255, 53, 101);
}
.border-text-brand {
  border-bottom: 4px solid rgba(255, 53, 101);
}
.nav-links {
  color: #000;
}

.nav-links a:hover {
  color: rgba(255, 53, 101);
}

.bg-800 {
  background-color: rgba(31, 41, 55, 1);
}

.card-text {
  margin-left: 8rem;
  margin-right: 8rem;
}

#card {
  height: 500px;
  min-height: 300px;
}

.get-intouch {
  padding-top: 5rem;
  padding-bottom: 4rem;
}

@media only screen and (min-device-width: 768px) and (max-device-width: 992px) and (-webkit-min-device-pixel-ratio: 1) {
  #card {
    height: 600px;
    min-height: 300px;
  }
}
</style>