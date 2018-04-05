module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'EyeFu',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'EyeFu' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/vuetify',
    [
      'nuxt-i18n', {
        locales: [
          { 
            code: 'en',
            name: 'English',
          },
          { 
            code: 'nl',
            name: 'Nederlands',
          },
        ],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en',
          messages: {
            'en': require('./locales/en.json'),
            'nl': require('./locales/nl.json'),
          }
        }
      }
    ]
  ],
  vuetify: {
    materialIcons: true,
    css: false,
    theme: {
      // This are the EyeFu colors
      primary: '#6E90A6', 
      secondary: '#CD003A',
      warning: '#FFAB00',
      error: '#D32F2F',
      info: '#64B5F6',
      accent: '#FF5B77'
    }
  },
  css: [
      '~/assets/style/eyefu.styl'
  ],
  auth: {
    strategies: {
      user: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/logout',
            method: 'post',
          }
        }
      },
      admin: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: process.env.EYEFU_API+'/admin/login',
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: process.env.EYEFU_API+'/admin/profile',
            method: 'get'
          }
        }
      }
    }
  },
  router: {
    middleware: ['auth']
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
