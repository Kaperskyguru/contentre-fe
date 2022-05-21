<template>
  <main class="container p-5 mx-auto">
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
      <div class="mt-14 mb-10 text-left border-b">
        <h1 class="text-2xl font-bold">Portfolio</h1>
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
                  <div class="h-[12rem]">
                    <div class="w-full h-full">
                      <img
                        :alt="content.title"
                        :src="computedImage(content.featuredImage)"
                        class="w-full h-full"
                        style="object-fit: cover; max-width: 100%; height: 100%"
                      />
                    </div>
                  </div>
                  <div class="my-4 border-b">
                    <p class="mx-3 mb-2 text-base font-medium">
                      {{ getClientName(content.client) }}
                    </p>
                  </div>
                  <div class="p-4">
                    <h2 class="text-xl font-bold">{{ content.title }}</h2>

                    <article class="overflow-auto mt-4 h-40 text-base">
                      <!--  eslint-disable-next-line vue/no-v-html -->
                      <span v-html="content.excerpt"></span>
                    </article>

                    <!-- <div class="flex justify-end mb-4">
                      <p>{{ getCategory(content) }}</p>
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
          :disabled="contentData.total === getContents.length"
          @click.prevent="next"
        >
          View more
        </Button>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'DefaultPortfolio',

  props: {
    portfolio: {
      type: Object,
      default: () => {}
    },
    contentData: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    filters: {},
    columns: [],
    remove: ['amount']
  }),

  computed: {
    noData() {
      return !this.contentData?.contents?.length
    },
    getContents() {
      return this.contentData?.contents ?? []
    }
  },

  watch: {
    'filters.terms': {
      immediate: true,
      handler() {
        this.$emit('filters', this.filters)
      }
    }
  },

  methods: {
    getClientName(client) {
      return client?.name ?? 'Personal'
    },
    getCategory(content) {
      return content?.category?.name || ''
    },
    next() {
      const len = this.contentData?.contents?.length
      if (len !== 0 && len !== (this.contentData?.total ?? 0)) {
        this.size = this.size ?? 9
        this.skip = len
      }

      this.$emit('next', {
        size: this.size ?? 12,
        skip: len
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

      this.$emit('filters', this.filters)
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
      )
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