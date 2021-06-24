const FileManagerPlugin = require('filemanager-webpack-plugin')
const fileManagerPluginObj = {
  copyDestination: './tar',
  copyFile: (function () {
    const copyFiles = [
      '.nuxt',
      'static',
      'nuxt.config.js',
      'package.json'
    ]
    const arr = []
    copyFiles.forEach((items) => {
      arr.push({ source: `${items}`, destination: `./tar/${items}` })
    })
    return arr
  })(),
}
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'test',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['vant/lib/index.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/vant'],

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
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new FileManagerPlugin({
        events: {
          onEnd: {
            delete: [`${fileManagerPluginObj.copyDestination}/`],
            mkdir: [`${fileManagerPluginObj.copyDestination}`],
            copy: fileManagerPluginObj.copyFile,
            archive: [
              {
                source: `tar/`,
                destination: `tar/test.tar.gz`,
                format: 'tar',
                options: {
                  gzip: true,
                  gzipOptions: {
                    level: 9
                  },
                  globOptions: {
                    nomount: true
                  }
                }
              }
            ]
          },
        }
      })
    ]
  },
}
