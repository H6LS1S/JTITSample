<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Props } from 'vue-property-decorator';

@Component({
  head() {
    return {
      title:
        this.error.statusCode === 404 ? this.pageNotFound : this.otherError,
    };
  },
})
export default class ErrorLayout extends Vue {
  @Props({ type: Object, default: null }) error = null;
  layout: string = 'empty';

  pageNotFound: string = '404 Not Found';
  otherError: string = 'An error occurred';
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
