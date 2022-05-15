module.exports ={
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'FUNDOBIT',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description', content: '「Fundobit」the world’s largest CryptoCurrency rebate platform.' },
      // FB Line
      { hid: 'og:title', property: 'og:title', content: 'FUNDOBIT' },
      { hid: 'og:description', property: 'og:description', content: '「Fundobit」the world’s largest CryptoCurrency rebate platform.' },
      { hid: 'og:image', property: 'og:image', content: 'https://fdb-web-api.azurewebsites.net/Upload/UserImage/202111282001344329/F20211128200134.png' },
      // Twitter
      { hid: 'twitter:title', property: 'twitter:title', content: 'FUNDOBIT' },
      { hid: 'twitter:description', property: 'twitter:description', content: '「Fundobit」the world’s largest CryptoCurrency rebate platform.' },
      { hid: 'twitter:image', property: 'twitter:image', content: 'https://fdb-web-api.azurewebsites.net/Upload/UserImage/202111282001344329/F20211128200134.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' }
    ]
  },
  env: {
    VUE_APP_API_URL: process.env.NODE_ENV !== 'production' ?'https://test-fdb-web-api.azurewebsites.net' : 'https://fdb-web-api.azurewebsites.net' ,
    VUE_APP_CLOUD_WEB: process.env.NODE_ENV !== 'production' ?'https://test-fdb-web-front.azurewebsites.net':'https://fdb-web-front.azurewebsites.net'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // css
    '@/assets/css/common.css',
    '@/assets/css/others.css',
    '@/assets/css/rwd-set.css',
    '@/style/element-variables.scss',
    '@/style/index.scss',
  ],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/element-ui.js' },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/api-plugin.js' },
    { src: '~/plugins/enum-map.js' },
    { src: '~/plugins/echarts.js', mode: 'client' },
    { src: '~/plugins/vuex-init.js', mode: 'client' },
    { src: '~/plugins/permission.js', mode: 'client' },
    { src: '~/plugins/gtm.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  telemetry: false,
  router: {
    scrollBehavior(to, from, savedPosition) {
      if (to.name === from.name) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['@nuxtjs/dotenv', { filename: process.env.BASE ? `.env.${process.env.BASE}` : '.env' }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],

  pageTransition: {
    name: 'fade-transform',
    mode: 'out-in'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }, 
  server: {
    host: '0.0.0.0', // default: localhost,
    port: 8000, // default: 3000,
    timing: false
  }
}

