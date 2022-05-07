import nuxtI18nConfig from './nuxt.i18n.config'
export default {
  ssr: false,

  target: 'static',

  modern: 'client',

  telemetry: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: (pageTitle) => {
      return pageTitle && pageTitle !== 'Contentre'
        ? `${pageTitle} | Contentre`
        : 'Contentre'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: []
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    'medium-editor/dist/css/medium-editor.css',
    'vuejs-medium-editor/src/themes/default.css',
    'highlight.js/styles/ocean.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vuelidate',
    '~/plugins/utils',
    '~/plugins/toast',
    '~/plugins/currentUser',
    '~/plugins/resizable',
    { src: '~/plugins/CKEditor', mode: 'client' },
    { src: '~/plugins/medium-editor', ssr: false }
  ],

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components/atoms',
      '~/components/molecules',
      '~/components/organisms',
      '~/components/templates'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',

    '@nuxt/postcss8',

    '@nuxtjs/svg',

    '@nuxtjs/device',

    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module'

    // https://github.com/harlan-zw/nuxt-build-optimisations
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    // https://i18n.nuxtjs.org
    ['@nuxtjs/i18n', nuxtI18nConfig],
    '@nuxtjs/cloudinary'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  router: {
    routeNameSplitter: '/'
  },

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo.js'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    }
  },

  env: {
    APP_NAME: process.env.APP_NAME,
    API_URL: process.env.API_URL ?? 'https://test.contentre.io/graphql'
  }

  // buildOptimisations: {
  //   profile: process.env.NODE_ENV === 'development' ? 'risky' : 'safe'
  // }
}
