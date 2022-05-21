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

  <span v-else>
    <component
      :is="
        $utils.checkCallback(`${generateName(portfolio.templateSlug)}`, [
          portfolio
        ])
      "
      v-if="portfolio.templateType === 'TEMPLATE'"
      :portfolio="portfolio"
      :content-data="contentData"
      @next="fetchMore"
      @filters="onFilters"
    />

    <span v-else> CUSTOMIZED TEMPLATE</span>
  </span>
</template>

<script>
import ImageBG from 'assets/img/cover_image.png'
import { GET_PORTFOLIO_CONTENT, GET_PORTFOLIO_DETAIL } from '~/graphql'

export default {
  name: 'IndexPage',
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
            url: `${url}${context.route.fullPath}`
          }
        },
        skip() {
          return !context.params.portfolio
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
    contentData: {},
    filters: {},
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
    contentData: {
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
        return !this.username
      }
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
    generateName(name) {
      return name?.split('_')[0]
    },
    fetchMore(sizeAndSkip) {
      if (this.$apollo.queries.contentData.loading) return
      const itemsKey = 'contents'
      const queryName = 'getPortfolioContent'
      const url = `${process.env.FE_URL ?? 'https://contentre.io'}`
      this.$apollo.queries.contentData.fetchMore({
        // New variables
        variables: {
          ...sizeAndSkip,
          filters: {
            username: this.username,
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
      this.filters = {
        ...data
      }
    }
  }
}
</script>
