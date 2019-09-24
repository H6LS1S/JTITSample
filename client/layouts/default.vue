<template>
  <v-app id="inspire">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-content>
          <v-container class="fill-height" fluid>
            <nuxt />
          </v-container>
        </v-content>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DefaultLayout extends Vue {}
</script>
