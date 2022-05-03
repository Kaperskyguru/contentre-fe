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

  <main v-else class="container bg-white">
    <section
      class="container items-start mb-8 lg:container lg:pt-6 lg:mx-auto xl:flex"
    >
      <section class="w-full">
        <div class="py-4">
          <div class="container m-auto text-gray-600">
            <div class="grid gap-12 lg:grid-cols-2">
              <div class="p-5 pl-0">
                <div class="space-y-2">
                  <div class="space-y-4">
                    <p class="text-gray-900">
                      Hi! I'am
                      <span class="text-brand">{{ portfolio.name }}</span
                      >,
                    </p>
                    <h4 class="text-3xl font-semibold text-gray-900">
                      {{ portfolio.job }}
                    </h4>
                    <p class="text-gray-600">
                      {{ portfolio.about }}
                    </p>
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
              </div>

              <div class="rounded-lg">
                <div class="p-1">
                  <img
                    :src="computedProfileImage(portfolio.profileImage)"
                    alt="art cover"
                    loading="lazy"
                    width="1000"
                    height="667"
                    class="
                      object-cover object-top
                      w-full
                      h-56
                      rounded-lg
                      group-hover:rounded-xl
                      transition
                      duration-500
                      sm:h-full
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>

    <section class="container mb-4">
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
                <div class="block overflow-hidden w-full h-full">
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
                    <a
                      :href="content.url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h2 class="text-lg font-bold text-gray-700">
                        {{ content.title }}
                      </h2>
                    </a>
                  </div>
                  <article class="font-normal text-md">
                    <!--  eslint-disable-next-line vue/no-v-html -->
                    <span v-html="content.excerpt"></span>
                  </article>
                </div>
              </div>
            </div>

            <!-- End Card -->
          </div>
          <!-- END Column -->
        </div>
      </div>
    </section>

    <section class="container pb-10 mb-10">
      <div
        class="
          flex flex-col
          justify-between
          mt-2
          mb-6
          space-y-4 space-x-0
          md:flex-row md:space-y-0 md:space-x-4
        "
      >
        <Button appearance="outline-red" @click.prevent="previous"
          >Previous</Button
        >

        <Button
          appearance="outline-red"
          :disabled="portfolio.total <= 1"
          @click.prevent="next"
        >
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
  name: 'CodePage',
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
        console.log(e)
        this.error = true
      }
    }
  },

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

.get-intouch {
  padding-top: 5rem;
  padding-bottom: 4rem;
}
</style>