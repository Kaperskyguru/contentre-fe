<template>
  <main class="flex-1">
    <section
      class="
        items-start
        px-4
        2xl:px-4
        mb-8
        lg:container lg:pt-6 lg:mx-auto
        xl:flex xl:px-12
      "
    >
      <section class="w-full xl:pr-8">
        <div class="py-4">
          <div class="container px-6 m-auto text-gray-600 md:px-12 xl:px-6">
            <div class="grid gap-12 lg:grid-cols-2">
              <div class="p-5 pl-0">
                <div class="space-y-2">
                  <div class="space-y-4">
                    <p class="text-gray-900">
                      Hi! I'am
                      <span class="text-brand">{{ portfolio.name }}</span> and
                      I'm a
                    </p>
                    <h4 class="text-3xl font-semibold text-gray-900">
                      {{ portfolio.job }}
                    </h4>
                    <article class="mt-2 mb-4 text-base">
                      <!-- eslint-disable-next-line vue/no-v-html -->
                      <p class="text-gray-600" v-html="portfolio.about"></p>
                    </article>
                  </div>
                  <div
                    class="
                      flex flex-col
                      py-6
                      space-y-10
                      lg:flex-row lg:space-y-0
                    "
                  >
                    <div class="container m-auto">
                      <a
                        href="#"
                        class="py-3 border-b-4 text-brand border-text-brand"
                      >
                        Connect with me →</a
                      >
                    </div>
                    <div class="flex w-full lg:ml-1">
                      <a
                        v-for="social in portfolio.socials"
                        :key="social.id"
                        target="_blank"
                        class="mr-2 w-9 h-9"
                        :href="social.link"
                      >
                        <Avatar
                          :name="social.name"
                          :src="computeIcon(social.name)"
                          size="auto"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-1">
                <img
                  :src="computedProfileImage(portfolio.profileImage)"
                  :name="portfolio.name"
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
      </section>
    </section>
    <section
      class="
        items-start
        px-4
        2xl:px-4
        mb-8
        lg:container lg:pt-6 lg:mx-auto
        xl:flex xl:px-12
      "
    >
      <section class="w-full">
        <div class="py-2">
          <div class="container px-6 m-auto text-gray-900 md:px-12 xl:px-6">
            <div class="mb-12 space-y-2">
              <p class="text-2xl lg:mx-auto lg:w-full">
                Contents i've written, and <br />
                businesses i've collaborated with
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>

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
    <span
      v-for="(content, index) in !noData ? getContents : []"
      :key="content.id"
    >
      <section
        v-if="index % 2 === 0"
        class="
          items-start
          px-4
          2xl:px-4
          mb-8
          lg:container lg:pt-6 lg:mx-auto
          xl:flex xl:px-12
        "
      >
        <section class="w-full">
          <div class="py-4">
            <div class="container px-0 m-auto text-gray-900 md:px-12 xl:px-6">
              <div class="grid lg:grid-cols-1">
                <div class="bg-gray-200 sm:flex">
                  <div class="w-full sm:w-6/12" style="flex: calc(900 / 900)">
                    <img
                      :alt="content.title"
                      :src="computedImage(content.featuredImage)"
                      class="
                        w-full
                        h-[220px]
                        max-h-[410px]
                        bg-center bg-cover
                        sm:h-full
                        md:w-full md:h-full
                      "
                    />
                  </div>
                  <div class="py-16 pl-0 sm:w-6/12">
                    <div class="flex flex-col items-center space-y-2">
                      <div class="my-8 space-y-4 w-7/12">
                        <h4 class="text-xl font-semibold">
                          {{ content.title }}
                        </h4>
                        <article class="mt-2 mb-4">
                          <!-- eslint-disable-next-line vue/no-v-html -->
                          <p
                            class="text-gray-600"
                            v-html="getExcerpt(content.excerpt)"
                          ></p>
                        </article>
                      </div>
                    </div>
                    <div class="flex justify-center">
                      <a
                        :href="content.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="block w-max text-cyan-600"
                        ><button
                          class="
                            p-2
                            px-5
                            text-lg text-btn-green
                            hover:text-white
                            bg-transparent
                            hover:bg-btn-green
                            rounded-sm
                            border-2
                            focus:border
                            border-btn-green
                            focus:border-btn-green
                          "
                        >
                          View Article
                        </button></a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section
        v-else
        class="
          items-start
          px-4
          2xl:px-4
          mb-8
          lg:container lg:pt-6 lg:mx-auto
          xl:flex xl:px-12
        "
      >
        <section class="w-full">
          <div class="py-4">
            <div class="container px-0 m-auto text-gray-900 md:px-12 xl:px-6">
              <div class="grid gap-12 lg:grid-cols-1">
                <div class="bg-gray-200 sm:flex">
                  <div class="py-16 pl-0 sm:w-6/12">
                    <div class="flex flex-col items-center space-y-2">
                      <div class="my-8 space-y-4 w-7/12">
                        <h4 class="text-xl font-semibold">
                          {{ content.title }}
                        </h4>
                        <article class="mt-2 mb-4">
                          <!-- eslint-disable-next-line vue/no-v-html -->
                          <p
                            class="text-gray-600"
                            v-html="getExcerpt(content.excerpt)"
                          ></p>
                        </article>
                      </div>
                    </div>
                    <div class="flex justify-center">
                      <a
                        :href="content.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="block w-max text-cyan-600"
                        ><button
                          class="
                            p-2
                            px-5
                            text-lg text-btn-green
                            hover:text-white
                            bg-transparent
                            hover:bg-btn-green
                            rounded-sm
                            border-2
                            focus:border
                            border-btn-green
                            focus:border-btn-green
                          "
                        >
                          View Article
                        </button></a
                      >
                    </div>
                  </div>
                  <div style="flex: calc(900 / 900)">
                    <img
                      :alt="content.title"
                      :src="computedImage(content.featuredImage)"
                      class="
                        w-full
                        h-[220px]
                        max-h-[410px]
                        bg-center bg-cover
                        sm:h-full
                        md:w-full md:h-full
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </span>

    <section
      class="
        items-start
        px-4
        2xl:px-4
        mb-8
        lg:container lg:pt-6 lg:mx-auto
        xl:flex xl:px-12
      "
    >
      <section>
        <div class="py-16">
          <div class="container px-6 m-auto">
            <a
              v-if="!noData"
              :disabled="contentData.total === getContents.length"
              href="#"
              class="py-4 border-b-4 text-brand border-text-brand"
              @click.prevent="next"
            >
              View All Contents →</a
            >
          </div>
        </div>
      </section>
    </section>

    <section class="py-16 w-full bg-gray-800">
      <div class="px-4 2xl:px-4 pt-6 lg:container lg:pt-8 lg:mx-auto xl:px-12">
        <div class="px-4">
          <h2 class="mb-12 text-2xl font-bold leading-9 text-white xl:text-4xl">
            Contact me <br />
            right Now
          </h2>
          <div class="container mb-6">
            <div
              class="
                flex flex-col
                space-y-10 space-x-0
                lg:flex-row lg:space-y-0 lg:space-x-10
              "
            >
              <div class="w-60 border-b-4 text-brand border-text-brand">
                Connect with me →
              </div>
              <div class="flex w-full lg:ml-1">
                <a
                  v-for="social in portfolio.socials"
                  :key="social.id"
                  target="_blank"
                  class="mr-2 w-9 h-9"
                  :href="social.link"
                >
                  <Avatar
                    :name="social.name"
                    :src="computeIcon(social.name)"
                    size="auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <section
          class="
            items-start
            2xl:px-4
            lg:container lg:pt-6 lg:mx-auto
            xl:flex xl:px-12
          "
        >
          <section class="w-full">
            <div class="container px-0 m-auto md:px-12 xl:px-6">
              <div class="grid gap-12 lg:grid-cols-1">
                <div class="my-16 bg-gray-200 sm:flex">
                  <div class="pl-0 bg-gray-900 sm:w-6/12">
                    <div class="py-16 px-4 get-intouch">
                      <h1
                        class="
                          text-2xl
                          font-extrabold
                          tracking-tight
                          text-white
                          sm:text-2xl
                        "
                      >
                        Get in touch
                      </h1>
                      <p class="mt-2 text-sm text-white">
                        If you don't like forms, you can contact me directly
                        from the details below. I respond with the speed of
                        light :)
                      </p>

                      <div class="flex items-center mt-5 text-white">
                        <svg
                          fill="none"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          viewBox="0 0 24 24"
                          class="w-8 h-8 text-gray-500"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <div
                          class="ml-4 w-40 font-semibold tracking-wide text-md"
                        >
                          {{ portfolio.contact.phone }}
                        </div>
                      </div>
                      <div class="flex items-center mt-4 text-white">
                        <svg
                          fill="none"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          viewBox="0 0 24 24"
                          class="w-8 h-8 text-gray-500"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <div
                          class="ml-4 w-40 font-semibold tracking-wide text-md"
                        >
                          {{ portfolio.contact.email }}
                        </div>
                      </div>

                      <div class="mt-4 ml-2 text-white">
                        {{ portfolio.contact.address }}
                      </div>
                    </div>
                  </div>
                  <div class="pl-0 bg-gray-200 sm:w-6/12">
                    <div class="py-8 px-0 my-4 mr-2 bg-white md:px-6">
                      <h3 class="px-2 text-xl font-semibold md:px-0">
                        Enter Details
                      </h3>
                      <form class="px-2 mt-6 md:px-0">
                        <div class="flex">
                          <TextField
                            id=""
                            type="text"
                            label="Name"
                            name="name"
                            class="mt-2 w-full rounded-lg"
                          />
                        </div>
                        <div class="flex">
                          <TextField
                            id=""
                            type="email"
                            label="Email"
                            name="email"
                            class="mt-2 w-full rounded-lg"
                          />
                        </div>

                        <div class="my-4">
                          <TextField
                            id=""
                            name="message"
                            label="Message"
                            :rows="5"
                            class="mt-2 rounded-lg"
                          ></TextField>
                        </div>
                        <div class="my-2 w-1/2 lg:w-1/4">
                          <Button :is-pro-feature="true" message="Coming soon">
                            Submit
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
body,
html {
  padding: 0;
  margin: 0;
  font-family: Inter, sans-serif;
  scroll-behavior: smooth;
  color: #000;
}

.text-brand {
  color: rgba(255, 53, 101);
}
.border-text-brand {
  border-bottom: 4px solid rgba(255, 53, 101);
}

.get-intouch {
  padding-top: 5rem;
  padding-bottom: 4rem;
}
</style>