<template>
  <main>
    <header class="pt-5">
      <div class="container mx-auto">
        <div class="mt-20">
          <div
            class="flex justify-center items-center"
            style="flex-direction: column"
          >
            <span class="text-center">
              <p class="text-3xl text-[#859492] md:text-4xl">Hello, I'm</p>
              <h1 class="mt-2 text-4xl text-[#102A27] md:text-6xl">
                {{ portfolio.name }}
              </h1>
            </span>
            <div class="mt-14">
              <Avatar
                :src="computedProfileImage(portfolio.profileImage)"
                :name="portfolio.name"
                :size="'medium'"
              />
            </div>
            <div class="mx-auto w-2/3">
              <h4 class="mt-6 text-lg text-center text-[#859492] md:text-2xl">
                {{ portfolio.job }}
              </h4>
            </div>
            <Button class="mt-5" type="link" href="#contact"> Hire Me </Button>
            <div
              class="
                flex
                justify-between
                p-1
                mt-9
                text-base
                bg-[#DCF6F3]
                rounded-full
              "
            >
              <button
                class="py-3 px-10 text-base rounded-full"
                :class="{ 'bg-white text-[#859492]': showContent }"
                @click.prevent="onShowContent"
              >
                My Contents
              </button>

              <button
                class="py-3 px-10 ml-5 text-base rounded-full"
                :class="{ 'bg-white text-[#859492]': showAbout }"
                @click.prevent="onShowAbout"
              >
                About
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="mb-10">
      <div>
        <div v-if="showContent" class="px-4">
          <div class="flex flex-col justify-between my-10 md:flex-row">
            <div>
              <h1 class="text-2xl text-black">My Portfolio</h1>
            </div>
            <div>
              <div
                class="
                  flex flex-col
                  my-4
                  space-y-3 space-x-0
                  md:my-0 md:space-y-0 md:space-x-3
                  lg:flex-row
                "
              >
                <div
                  class="
                    flex
                    items-center
                    text-sm
                    font-medium
                    bg-white
                    rounded-lg
                  "
                >
                  <SearchField
                    id="search"
                    v-model="filters.terms"
                    class="text-xl focus:outline-none"
                    placeholder="Search by name..."
                  />
                </div>

                <div class="flex items-center space-x-3">
                  <p>Filter by:</p>
                  <ContentFilter
                    :filter-columns="columns"
                    :clients="contentData.clients"
                    :categories="contentData.categories"
                    :topics="contentData.topics"
                    :tags="contentData.tags"
                    :remove="remove"
                    @filters="onFilters"
                  />
                </div>
              </div>
            </div>
          </div>

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

          <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="content in getContents" :key="content.id">
              <div id="card" class="py-5 px-4 bg-[#FCFCFC] rounded-xl">
                <a
                  :href="content.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div style="flex: calc(900 / 900)">
                    <img
                      id="img_"
                      :alt="content.title"
                      :src="computedImage(content.featuredImage)"
                      class="mb-2 w-full h-full"
                    />
                  </div>
                  <h4 class="my-2 w-full text-2xl text-black">
                    {{ content.title }}
                  </h4>

                  <div class="pt-2 pb-4">
                    <article class="mt-2 mb-4 text-base">
                      <!-- eslint-disable-next-line vue/no-v-html -->
                      <p
                        class="text-[#888888]"
                        v-html="getExcerpt(content.excerpt)"
                      ></p>
                    </article>

                    <div class="flex justify-end pb-4">
                      <!-- <div class="flex">
                        <div>
                          <img src="~/assets/portfolio/clock.png" alt="" />
                        </div>
                        <p class="ml-2 text-[#888888]">22 Dec, 2022</p>
                      </div> -->
                      <button
                        class="
                          py-1
                          px-5
                          ml-10
                          text-[#008F98]
                          bg-[#DCF6F3]
                          rounded-full
                        "
                      >
                        {{ getCategory(content) }}
                      </button>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div
            v-if="!noData"
            class="flex justify-center mt-10"
            :disabled="contentData.total === getContents.length"
            @click.prevent="next"
          >
            <Button> Load more </Button>
          </div>
        </div>

        <!-- ---------ABOUT---------- -->
        <div v-if="showAbout" class="px-4 mx-20">
          <div>
            <h1 class="mb-4 text-2xl text-[#333333] md:text-4xl">About Me</h1>

            <article class="">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p class="text-lg md:text-xl" v-html="portfolio.about"></p>
            </article>

            <div class="flex mt-6">
              <a
                v-for="social in portfolio.socials"
                :key="social.id"
                target="_blank"
                class="mr-4"
                :href="social.link"
              >
                <img
                  :src="computeIcon(social.name)"
                  :alt="social.name"
                  class="w-9"
                />
              </a>
            </div>
            <div class="mt-10">
              <Button :is-pro-feature="true" message="Coming soon"
                >Download Resume</Button
              >
            </div>
          </div>
        </div>

        <!-- END HERE -->

        <section id="contact" class="mt-32">
          <div class="border-b">
            <!-- <h2 class="mb-2 text-2xl text-center text-black">Contact me</h2> -->
          </div>
          <div
            class="
              pb-10
              mx-auto
              mt-10
              bg-[#FCFCFC]
              rounded-xl
              md:w-4/5
              lg:w-3/4
            "
          >
            <div class="grid gap-4 lg:grid-cols-3">
              <div class="bg-[#859492] rounded-xl lg:rounded-l-xl">
                <div class="m-10">
                  <div class="">
                    <p class="text-3xl text-white">Get in touch with me.</p>
                    <p class="mt-10 text-[#B0C8C5]" style="font-size: 14px">
                      If you don't like forms, you can contact me directly from
                      the details below. I respond with the speed of light :)
                    </p>
                  </div>
                  <div class="mt-44">
                    <div class="flex">
                      <div>
                        <img src="~/assets/portfolio/call.png" alt="" />
                      </div>
                      <p class="ml-4 text-white">
                        {{ portfolio.contact.phone }}
                      </p>
                    </div>
                    <div class="flex">
                      <div>
                        <img src="~/assets/portfolio/sms.png" alt="" />
                      </div>
                      <p class="ml-4 text-white">
                        {{ portfolio.contact.email }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="lg:col-span-2">
                <div>
                  <div class="mx-4 mt-4">
                    <div class="grid">
                      <TextField
                        id=""
                        type="text"
                        label="Name"
                        name="name"
                        class="mt-2 rounded-lg"
                      />
                    </div>
                    <div class="mt-8">
                      <div class="grid">
                        <TextField
                          id=""
                          type="email"
                          label="Email"
                          name="email"
                          class="mt-2 rounded-lg"
                        />
                      </div>
                    </div>
                    <div class="grid mt-8">
                      <TextField
                        id=""
                        name="message"
                        label="Message"
                        :rows="5"
                        class="mt-2 rounded-lg"
                      />
                    </div>
                    <div class="mt-10">
                      <Button :is-pro-feature="true" message="Coming soon">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script>
export default {
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
    showAbout: false,
    showContent: true,
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
    onShowAbout() {
      this.showAbout = true
      this.showContent = false
    },
    onShowContent() {
      this.showContent = true
      this.showAbout = false
    },
    getExcerpt(excerpt) {
      return excerpt?.substring(0, 140) + '...' ?? ''
    },
    getClientName(client) {
      return client?.name ?? 'Personal'
    },
    getCategory(content) {
      return content?.category?.name || 'Uncategorized'
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

    computeIcon(name) {
      return require(`~/assets/portfolio/${name}.png`)
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
@import url(https://db.onlinewebfonts.com/c/040a78b437acd0433612f92e61d04a1b?family=Gilroy-Medium);
main {
  font-family: Gilroy-Medium;
  min-height: 100vh;
  width: 100%;
}

#card {
  height: 500px;
  min-height: 300px;
}

@media only screen and (min-device-width: 768px) and (max-device-width: 992px) and (-webkit-min-device-pixel-ratio: 1) {
  #card {
    height: 600px;
    min-height: 300px;
  }
}

#img_ {
  width: 100%;
  height: 220px;
  background-size: cover;
  background-position: center;
}
</style>