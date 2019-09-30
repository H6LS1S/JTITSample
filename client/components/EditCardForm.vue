<template>
  <v-card>
    <ValidationObserver
      v-slot="{ invalid }"
      ref="observer"
      @submit.prevent="onSubmit"
    >
      <v-progress-linear :indeterminate="progress" :active="progress" />
      <v-card-title v-if="isAuth">
        <PageLink :page="backButton()" icon />
        <v-spacer />
        <PageLink
          v-if="!readonly"
          :page="getButtonSave()"
          :disabled="invalid"
          depressed
          @click="onSubmit"
          icon
        />
        <PageLink
          v-else
          :page="getButtonUpdate()"
          @click="readonly = !readonly"
          icon
        />
        <PageLink :page="getButtonDelete()" @click="remove()" icon />
      </v-card-title>
      <v-list-item>
        <v-list-item-content>
          <slot :readonly="readonly" />
        </v-list-item-content>
      </v-list-item>
      <v-card-actions />
    </ValidationObserver>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { ValidationObserver } from 'vee-validate';
import { Getter } from 'vuex-class';

@Component({
  components: {
    ValidationObserver,
    PageLink: () => import('~/components/PageLink'),
  },
})
export default class EditCardForm extends Vue {
  @Prop({ type: Function, required: true }) backButton: Function;

  @Getter('isAuth') isAuth;

  private readonly: boolean = true;
  private progress: boolean = false;

  private async onSubmit() {
    const validation = await this.$refs.observer.validate();
    if (!validation) return;
    this.progress = !this.progress;
    this.save();
  }

  @Emit()
  private save() {
    this.progress = !this.progress;
    this.readonly = !this.readonly;
  }

  @Emit()
  private remove() {}

  private getButtonSave() {
    return {
      icon: 'mdi-content-save-outline',
    };
  }

  private getButtonUpdate() {
    return {
      icon: 'mdi-pencil-outline',
    };
  }

  private getButtonDelete() {
    return {
      icon: 'mdi-delete',
    };
  }
}
</script>
