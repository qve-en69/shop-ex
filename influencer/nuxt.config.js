// eslint-disable-next-line nuxt/no-cjs-in-config
const path = require('path');
const environment = process.env.ENVIRONMENT || 'local'
const messages = {
  en: require('./locales/en.json'),
  ru: require('./locales/ru.json')
}
export default {
  server: {
    port: 3001
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend_influencer',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon_shopshop.png' },
      { rel: 'apple-touch-icon', href: '/webclip_shopshop.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/normalize.css',
    '~/assets/css/webflow.css',
    '~/assets/css/shopshop-marketplace.webflow.css',
    'swiper/swiper.min.css',
    'vuejs-clipper/dist/vuejs-clipper.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/geolocationApi.js',
    '~/plugins/api.js',
    '~/plugins/v-mask.js',
    '~/plugins/addStores.js',
    '~/plugins/errors.js',
    '~/plugins/i118n.js',
    '~/plugins/switchLocaleLanguage.js',
    {src: '~/plugins/persistedState.js', ssr:false},
    {src: '~/plugins/vuelidate.js'},
    {src: '~/plugins/vueClipper.js', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/sentry',
    ['nuxt-vuex-localstorage', {
      localStorage: ['watchedProduct']
    }],
    [
      'nuxt-env',
      {
        keys: [
          {
            key: 'API_URL',
            default:
              process.env.API_ENDPOINT
              || 'https://api.shop/'
          },
          {
            key: 'NON_WWW_HOST',
            default: process.env.NON_WWW_HOST || 'influencer.shop'
          },
          {
            key: 'DADATA_KEY',
            default: process.env.DADATA_KEY
          },
          {
            key: 'YANDEX_MAP',
            default: process.env.YANDEX_KEY
          },
          {
            key: 'CLOUD_PAYMENTS_PUBLIC_KEY',
            default: process.env.CLOUD_PAYMENTS_PUBLIC_KEY
          },
          {
            key: 'SITE',
            default:
              process.env.SITE
              || 'influencer'
          },
          {
            key: 'BUYER_SITE',
            default: process.env.BUYER_SITE
          },
          { key: 'ENVIRONMENT', default: environment },
          {key: "LANGUAGE", default: process.env.LANGUAGE},
          {
            key: 'INTERCOM_APP_ID',
            default: process.env.INTERCOM_APP_ID
          },
        ]
      }
    ]
  ],

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'ru',
    vueI18n: {
      messages,
      postTranslation(value, key) {
        return !value ? key : value;
      },
      pluralizationRules: {
        ru (choice, choicesLength) {
          if (choice === 0) {
            return 0;
          }

          const teen = choice > 10 && choice < 20;
          const endsWithOne = choice % 10 === 1;

          if (choicesLength < 4) {
            return !teen && endsWithOne ? 1 : 2;
          }
          if (!teen && endsWithOne) {
            return 1;
          }
          if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
            return 2;
          }

          return choicesLength < 4 ? 2 : 3;
        },
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    https: true,
    proxy: true
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    cssSourceMap: true,
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },

    extend(config, { isClient }) {
      config.devtool = isClient ? 'eval-source-map' : 'inline-source-map';

      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        use: ['babel-loader', 'vue-svg-loader'],
      });
      config.resolve.alias.common = path.resolve(__dirname, '..', 'common')
      config.resolve.alias['~'] = path.resolve(__dirname)
      config.resolve.alias['@'] = path.resolve(__dirname)
    },
    extractCSS: true
  },

  sentry: {
    dsn: process.env.SENTRY_DSN,
    disabled: (environment === 'local' || !process.env.SENTRY_DSN),
    config: {
      environment
    }
  }
}
