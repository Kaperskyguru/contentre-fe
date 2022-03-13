<template>
  <div
    v-if="error"
    class="
      grid
      justify-center
      content-center
      items-center
      mx-auto
      h-screen
      bg-white
      lg:mx-24
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

  <div v-else class="bg-white lg:mx-24">
    <section class="pt-3 my-8">
      <h1 class="text-3xl font-bold text-gray-900">{{ portfolio.name }}</h1>
    </section>

    <div class="relative bg-teal-100">
      <div
        class="py-40 bg-center bg-cover"
        :style="{ backgroundImage: `url(${image})` }"
      >
        <div class="container relative px-6 mx-auto">
          <div class="items-center lg:flex">
            <section>
              <div class="text-black">
                <div class="container mx-auto">
                  <div
                    class="
                      justify-center
                      items-start
                      p-8
                      w-full
                      lg:w-1/2
                      flex flex-col
                    "
                  >
                    <h1 class="mb-4 text-xl font-bold text-white md:text-xl">
                      {{ portfolio.about }}
                    </h1>
                    <a
                      href="#"
                      class="
                        py-2
                        px-12
                        rounded
                        shadow
                        form-btn
                        text-sm text-white
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
    </div>

    <section class="text-center text-white">
      <div class="container flex flex-col pt-16 pb-8 mx-auto md:flex-row">
        <div class="w-5/6 md:mr-2 md:w-1/2 lg:w-full lg:max-w-lg">
          <img
            class="object-cover object-center rounded"
            alt="hero"
            src="~/assets/img/temp-pic2.png"
          />
        </div>
        <div
          class="flex flex-col py-4 px-10 ml-2 text-center md:w-1/2 lg:grow"
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
            {{ portfolio.about }}
          </p>
          <div class="flex justify-center pb-8">
            <button
              class="
                py-2
                px-12
                mr-2
                font-bold
                rounded
                shadow
                text-sm text-white
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

    <section class="mb-24">
      <div class="container mx-auto">
        <div class="flex justify-between items-center py-2">
          <h1 class="pt-4 text-3xl font-bold text-gray-900 uppercase">
            Portfolio
          </h1>
        </div>
        <div class="flex flex-wrap">
          <!-- Column -->
          <div v-if="noData" class="justify-center">
            <NoData />
          </div>
          <div
            v-for="(content, i) in portfolio.portfolios"
            v-else
            :key="i"
            class="w-full rounded-lg md:w-1/2 lg:pr-2 lg:my-2 lg:w-1/3"
          >
            <!-- Article -->

            <a :href="content.url" target="_blank" rel="noopener noreferrer">
              <article class="overflow-hidden">
                <img
                  alt="Placeholder"
                  class="block w-full h-auto"
                  :src="computedImage(content.featuredImage)"
                />

                <header class="py-4 leading-tight">
                  <span class="text-sm font-normal sm:text-sm text-dark-900">
                    {{ content.title }}
                  </span>
                </header>
              </article>
            </a>
          </div>
          <!-- END Column -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ImageBG from 'assets/img/temp-pic1.png'
import { GET_PORTFOLIO_CONTENT } from '~/graphql'
export default {
  layout: 'portfolio',

  data: () => ({
    image: ImageBG,
    username: '',
    portfolio: {},
    error: false
  }),

  apollo: {
    portfolio: {
      query: GET_PORTFOLIO_CONTENT,
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          filters: {
            username: this.username
          }
        }
      },

      update(data) {
        return data.getPortfolioContent
      },

      skip() {
        return !this.username
      },
      error() {
        this.error = true
      }
    }
  },

  computed: {
    noData() {
      return !this.portfolio?.portfolios?.length
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
    computedImage(image) {
      return image ?? require('~/assets/img/portfolio-pic1.png')
    }
  }
}
</script>

<style>
</style>