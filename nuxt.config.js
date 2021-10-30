export default {
  /*
  ** Environment variable configuration
  */
  env: {
    baseUrl: 'http://apitest.fandow.com/oa/inventory'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '备货外调系统',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/iconfont/iconfont.css',
    'view-design/dist/styles/iview.css',
    '~/assets/css/main.css'
  ],



  /**
   * Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
   * 插件之间如果有依赖关系的话，需要按顺序加载，否则会出现问题
   */
  plugins: [
    '@/plugins/view-ui',
    '~/plugins/axios.js',
    '~/plugins/request.js',
    '~/plugins/api.js',
  ],
  loading: {
    color: 'skyblue'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
