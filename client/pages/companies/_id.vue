<template>
  <v-row v-if="company" justify="center">
    <LogotypePicker :logotype="company.logotype" :readonly="isAuth" />
    <v-col sm="12">
      <EditCardForm
        @save="saveCompany()"
        @remove="deleteCompany(company.id)"
        :backButton="getButtonCompanies"
      >
        <template slot-scope="{ readonly }">
          <v-list-item-title class="headline">
            <VTextFieldValidation
              v-model="company.name"
              :readonly="readonly"
              type="text"
              rules="required"
              label="Company name"
            />
          </v-list-item-title>
          <v-list-item-title class="headline">
            <VTextFieldValidation
              v-model="company.email"
              :readonly="readonly"
              type="email"
              rules="required|email"
              label="Email"
            />
          </v-list-item-title>
          <v-list-item-title class="headline">
            <VTextFieldValidation
              v-model="company.website"
              :readonly="readonly"
              type="url"
              rules="required|url"
              label="Website"
            />
          </v-list-item-title>
        </template>
      </EditCardForm>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
  head() {
    return {
      title: this.company.name,
    };
  },
  components: {
    EditCardForm: () => import('~/components/EditCardForm'),
    LogotypePicker: () => import('~/components/LogotypePicker'),
    VTextFieldValidation: () =>
      import('~/components/inputs/VTextFieldValidation'),
  },
  async fetch({ store, params }) {
    return await store.dispatch('CompaniesModule/selectCompany', params.id);
  },
})
export default class CompaniesPage extends Vue {
  @Action('CompaniesModule/updateCompany') updateCompany;
  @Action('CompaniesModule/deleteCompany') deleteCompany;

  @Getter('CompaniesModule/getCompany') getCompany;
  @Getter('isAuth') isAuth;

  private company: any;

  created() {
    this.company = Object.assign({}, this.getCompany);
  }

  private async saveCompany() {
    await this.updateCompany(this.company);
    this.company = Object.assign({}, this.getCompany);
    return (this.readonly = !this.readonly);
  }

  private getButtonCompanies() {
    return {
      icon: 'mdi-domain',
      attr: { to: '/companies', exact: true },
    };
  }
}
</script>
