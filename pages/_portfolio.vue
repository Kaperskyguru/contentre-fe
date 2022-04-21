<template>
  <div
    v-if="error"
    class="
      grid
      justify-center
      content-center
      items-center
      h-screen
      bg-white
      -auto
      l-24
    "
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

  <div v-else class="bg-white l-24">
    <section class="pt-3 my-8">
      <h1 class="text-3xl font-bold text-gray-900">{{ portfolio.name }}</h1>
    </section>

    <!-- <div class="relative bg-teal-100">
      <div
        class="py-40 bg-center bg-cover"
        :style="{ backgroundImage: `url(${image})` }"
      >
        <div class="container relative px--auto">
          <div class="items-center lg:flex">
            <section>
              <div class="text-black">
                <div class="containe-auto">
                  <div
                    class="
                      flex flex-col
                      justify-center
                      items-start
                      p-8
                      w-full
                      lg:w-1/2
                    "
                  >
                    <h1 class="mb-4 text-xl font-bold text-white md:text-xl">
                      {{ portfolio.about || 'About me not provided' }}
                    </h1>
                    <a
                      href="#"
                      class="
                        py-2
                        px-12
                        text-sm text-white
                        rounded
                        shadow
                        form-btn
                      "
                      style="background: #00aeff"
                    >
                      Writing Services</a
                    >
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div> -->

    <section class="text-center text-white">
      <div class="container flex flex-col pt-5 pb-8 mx-auto md:flex-row">
        <div
          class="mb-2 w-full rounded-lg md:mr-2 md:w-1/2 lg:w-full lg:max-w-lg"
        >
          <img
            class="object-cover object-center rounded"
            alt="profile image"
            :src="computedProfileImage(portfolio.profileImage)"
          />
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
          <h1
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
          </h1>
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
          <h1 class="pt-4 text-3xl font-bold text-gray-900 uppercase">
            Portfolio
          </h1>
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

        <div class="">
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
              v-for="(content, i) in [
                ...portfolio.contents,
                ...portfolio.contents
              ]"
              :key="i"
              class="mb-2 max-w-sm rounded-lg shadow-lg"
            >
              <article class="w-full">
                <div class="overflow-hidden relative w-full h-32">
                  <div class="w-full">
                    <img
                      :alt="content.title"
                      class="block w-full"
                      style="object-fit: auto; max-width: 100%"
                      :src="computedImage(content.featuredImage)"
                    />
                  </div>
                </div>
                <div class="p-5 pt-3">
                  <div class="py-4 leading-tight">
                    <div class="flex justify-between py-4">
                      <div class="flex space-x-1">
                        <Avatar
                          :name="content.client.name"
                          :src="content.client.icon"
                          size="small"
                        />
                        <a :href="getProfile(content.client)">{{
                          content.client.name
                        }}</a>
                      </div>

                      <div v-if="content.category" class="border-r"></div>
                      <div
                        class="px-2"
                        :style="displayedCategoryStyle(content.category)"
                      >
                        <p class="p-1">
                          {{ content.category ? content.category.name : '' }}
                        </p>
                      </div>
                    </div>
                    <a
                      :href="content.url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h2 class="text-lg font-bold text-gray-500">
                        {{ content.title }}
                      </h2>
                    </a>
                    <div
                      class="
                        flex
                        justify-between
                        pt-2
                        text-sm
                        font-normal
                        text-gray-600
                      "
                    >
                      <div class="">
                        <strong>Topics:</strong>
                        <a
                          v-for="(tag, index) in content.tags"
                          :key="index"
                          href="#"
                          ><em class="text-gray-500">{{ tag }}</em
                          >,
                        </a>
                      </div>
                    </div>
                  </div>
                  <p class="font-normal text-gray-600 text-md">
                    {{ content.excerpt }}
                  </p>

                  <div
                    class="
                      flex
                      py-5
                      text-sm
                      font-normal
                      leading-tight
                      text-gray-600
                    "
                  >
                    <div>
                      <strong>Tags:</strong>
                      <a
                        v-for="(tag, index) in content.tags"
                        :key="index"
                        href="#"
                        class="text-btn-green"
                        >{{ tag }}{{ content.tags - 1 === tag ? '' : ',' }}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <!-- End Card -->
          </div>
          <!-- END Column -->
        </div>
      </div>
    </section>

    <section class="pb-10 mb-10">
      <div class="flex justify-between space-x-1">
        <Button
          class="
            flex
            justify-start
            items-center
            py-2
            px-4
            text-gray-500
            bg-gray-300
            rounded-md
          "
          @click.prevent="previous"
        >
          Previous
        </Button>

        <Button
          :disabled="portfolio.total"
          class="
            justify-end
            py-2
            px-4
            font-bold
            text-gray-500
            hover:text-white
            bg-gray-300
            hover:bg-btn-green
            rounded-md
          "
          @click.prevent="next"
        >
          Next
        </Button>
      </div>
    </section>
  </div>
</template>

<script>
import ImageBG from 'assets/img/cover_image.png'
import { GET_PORTFOLIO_CONTENT } from '~/graphql'
import Avatar from '~/components/atoms/Avatar.vue'
export default {
  components: { Avatar },
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

      return this.fetchMore({
        size: this.size ?? 12,
        skip: len
      })
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