import Vue from 'vue';

Vue.mixin({
  methods: {
    getLogotype(id: string) {
      if (id) return `http://localhost:8081${id}`;
      return require('../assets/placeholders/404.gif');
    },
  },
});
