<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <PageLink
        v-on="on"
        :page="getButtonCreate()"
        @click="open"
        fixed
        bottom
        right
        fab
        color="primary"
      />
    </template>
    <v-card>
      <ValidationObserver
        v-slot="{ invalid }"
        ref="observer"
        @submit.prevent="onSubmit"
      >
        <v-progress-linear :indeterminate="progress" :active="progress" />
        <v-card-title>
          <v-spacer />
          <PageLink
            :page="getButtonSave()"
            :disabled="invalid"
            @click="onSubmit"
            icon
          />
        </v-card-title>
        <v-list-item>
          <v-list-item-content>
            <slot />
          </v-list-item-content>
        </v-list-item>
        <v-card-actions />
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { ValidationObserver } from 'vee-validate';

@Component({
  components: {
    ValidationObserver,
    PageLink: () => import('~/components/PageLink'),
  },
})
export default class CreateDialogForm extends Vue {
  private progress: boolean = false;
  private dialog: boolean = false;

  private async onSubmit() {
    const validation = await this.$refs.observer.validate();
    if (!validation) return;
    this.progress = !this.progress;
    this.save();
  }

  @Emit()
  private save() {
    this.dialog = !this.dialog;
    this.progress = !this.progress;
  }

  @Emit()
  private open() {}

  private getButtonCreate() {
    return {
      icon: 'mdi-plus',
    };
  }

  private getButtonSave() {
    return {
      icon: 'mdi-content-save-outline',
    };
  }
}
</script>
