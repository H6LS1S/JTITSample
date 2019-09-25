import { Configuration } from '@nuxt/types';
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';

import { ConfigService } from './utils/config/config.service';
const configService = new ConfigService();

const config: Configuration = {
  /*
   ** Server options
   */
  server: {
    port: configService.getSetting('APP_PORT'),
    timing: configService.getSetting('APP_TIMG'),
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: `%s - ${configService.getSetting('npm_package_name')}`,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'description',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/mixins', '~/plugins/vuetify', '~/plugins/vee-validate'],
  /*
   ** Axios module options
   */
  axios: {
    baseURL: 'http://127.0.0.1:8081/api',
  },
  /*
   ** Authentication module options
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth', method: 'post', propertyName: 'token' },
          user: { url: '/user', method: 'get', propertyName: '' },
          logout: false,
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      },
    },
    redirect: {
      home: '/',
      login: '/signin',
      logout: '/signin',
      callback: '/signin',
    },
  },
  /*
   ** Modules to load before mounting the App
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/auth', '@nuxtjs/axios'],
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
  },
  typescript: {
    typeCheck: false,
    ignoreNotFoundWarnings: true,
  },
};

export default config;
