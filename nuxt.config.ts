export default {
  mode: 'spa',
  buildModules: [
    '@nuxt/typescript-build'
  ],
  css: [
    '@mdi/font/css/materialdesignicons.min.css' // no cdn
    // '~assets/style.scss' // for customize buefy
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    // ['nuxt-buefy']
    // ['nuxt-buefy', { css: false, materialDesignIcons: false }]
    ['nuxt-buefy', { materialDesignIcons: false }],
    '@nuxtjs/dotenv'
  ],
  plugins: [
    '~/plugins/buefy',
    '~/plugins/firebase',
    '~/plugins/auth'
  ],
  typescript: {
    typeCheck: {
      eslint: true
    }
  } /*,
  build: {
    extend (config: any, _ctx: any) {
      config.devtool = 'inline-cheap-module-source-map'
    }
  }
  */
}
