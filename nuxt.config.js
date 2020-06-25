const pkg = require('./package');


module.exports = {
  mode: 'universal',
  cache: true,
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
        type: "text/javascript"
      },
      {
        src: "/js/bootstrap.js",
        type: "text/javascript"
      },
      {
        src: "/js/bootstrap-slider.js",
        type: "text/javascript"
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'vue-image-lightbox/dist/vue-image-lightbox.min.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/components', ssr: false },
    { src: '~/plugins/vue-append' },
    { src: '~/plugins/lightbox', ssr: false },
    { src: '~/plugins/slider', ssr: false }
  ],

  router: {
    middleware: ['domain'],
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'index',
        path: '/',
        component: resolve(__dirname, 'pages/_url.vue')
      })
    }
  },

  axios: { proxy: true },
  proxy: [
    ['/api/configuration', { target: 'https://magazine.speidels-braumeister.de', secure: false, changeOrigin: true }],
    ['/api/products', { target: 'https://magazine.speidels-braumeister.de', secure: false, changeOrigin: true }],
    ['/image', { target: 'https://magazine.speidels-braumeister.de', secure: false, changeOrigin: true }],
    ['/api', { target: 'http://localhost:5000' }],
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    // 'bootstrap-vue/nuxt'
  ],

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    babel: {
      plugins: [
        ['@babel/proposal-decorators', { legacy: true }],
        ['@babel/proposal-class-properties', { loose: true }]
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
};
