import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default ctx => {
  const vuetify = new Vuetify({
    icons: {
      iconfont: 'mdi',
    },
    theme: {
      options: {
        minifyTheme: css => {
          return process.env.NODE_ENV === 'production'
            ? css.replace(/[\r\n|\r|\n]/g, '')
            : css;
        },
      },
      themes: {
        light: {
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
        dark: {
          primary: colors.blue.lighten3,
        },
      },
    },
  });

  ctx.app.vuetify = vuetify;
  ctx.$vuetify = vuetify.framework;
};
