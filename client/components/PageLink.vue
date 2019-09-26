<template>
  <v-btn v-bind="{ ...$attrs, ...page.attr }" v-on="$listeners" class="mx-3">
    <span v-if="page.title !== undefined" class="mx-3">{{ page.title }}</span>
    <v-icon v-html="page.icon" />
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class PageLink extends Vue {
  @Prop({ type: Object, required: true }) page: object;
}
</script>
