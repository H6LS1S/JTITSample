import Vue from 'vue';

Vue.mixin({
  methods: {
    getLogotype(id: string) {
      if (id) return `http://localhost:8081${id}`;
      return `https://picsum.photos/200/300/?blur`;
    },
  },
});
