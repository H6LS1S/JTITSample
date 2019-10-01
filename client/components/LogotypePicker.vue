<template>
  <v-avatar @click="launchFilePicker()" size="144" class="mb-12">
    <v-img :src="getLogotype(logotype)" />
    <input
      ref="file"
      type="file"
      accept="image/*"
      style="display:none"
      @change="onFileInputChange()"
    />
  </v-avatar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class LogotypePicker extends Vue {
  @Prop({ type: String, required: true }) logotype: string;
  @Prop({ type: Boolean, required: false }) readonly: string;

  @Action('CompaniesModule/updateCompanyLogotype') updateLogotype;

  private launchFilePicker() {
    if (!this.readonly) return this.$refs.file.click();
  }

  private async onFileInputChange(fieldName, file) {
    const formData = new FormData();
    const imageFile = this.$refs.file.files[0];
    formData.append('logotype', imageFile);
    return await this.updateLogotype(formData);
  }
}
</script>
