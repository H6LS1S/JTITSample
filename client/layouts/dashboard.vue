<template>
  <v-app>
    <v-app-bar
      app
      dark
      prominent
      shrink-on-scroll
      elevate-on-scroll
      fade-img-on-scroll
      color="primary"
    >
      <template v-slot:img>
        <v-img :src="appBackground" :gradient="getGradient()" />
      </template>

      <v-app-bar-nav-icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-bold">JTITSample</v-toolbar-title>

      <v-spacer />

      <PageLink v-for="(page, i) in pages" :key="i" :page="page" />
    </v-app-bar>

    <v-row align="center" justify="center">
      <v-col cols="12" xs="12" sm="8" md="4" lg="3">
        <v-content>
          <v-container class="fill-height" fluid>
            <nuxt />
          </v-container>
        </v-content>
      </v-col>
    </v-row>

    <v-footer padless dark align="center">
      <v-card flat tile width="100%" class="primary">
        <v-card-text>
          <PageLink v-for="(page, i) in pages" :key="i" :page="page" />
        </v-card-text>

        <v-divider />

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>JTITSample</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component({
  middleware: ['auth'],
  components: {
    PageLink: () => import('~/components/PageLink'),
  },
})
export default class DashboardLayout extends Vue {
  @Getter('getPages') pages: array;

  private appBackground: string = '';

  mounted() {
    const { innerWidth, innerHeight } = window;

    this.appBackground = `https://picsum.photos/${innerWidth}/128/?random`;
  }

  private getGradient() {
    return `to top right, rgba(81, 176, 255, .7), rgba(63, 81, 181, .7)`;
  }

  private logout() {
    return this.$auth.logout();
  }
}
</script>
