<template>
  <v-row v-if="getCompany" justify="center">
    <LogotypePicker :logotype="getCompany.logotype" :readonly="readonly" />
    <v-col sm="12">
      <v-card>
        <v-card-title v-if="isAuth">
          <PageLink :page="getButtonCompanies()" icon />
          <v-spacer />
          <PageLink
            v-if="!readonly"
            :page="getButtonSave()"
            @click="saveCompany()"
            icon
          />
          <PageLink
            v-else
            :page="getButtonUpdate()"
            @click="readonly = !readonly"
            icon
          />
          <PageLink
            :page="getButtonDelete()"
            @click="deleteCompany(company.id)"
            icon
          />
        </v-card-title>
        <v-list-item>
          <v-list-item-content>
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
          </v-list-item-content>
        </v-list-item>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';

@Component({
  head() {
    return {
      title: this.getCompany.name,
    };
  },
  components: {
    PageLink: () => import('~/components/PageLink'),
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

  @Mutation('CompaniesModule/setCompany') setCompany;

  @Getter('CompaniesModule/getCompany') getCompany;
  @Getter('isAuth') isAuth;

  private readonly: boolean = true;
  private company;

  created() {
    this.company = Object.assign({}, this.getCompany);
  }

  private async saveCompany() {
    this.readonly = !this.readonly;
    return await this.updateCompany(this.company);
  }

  private getButtonCompanies() {
    return {
      icon: 'mdi-domain',
      attr: { to: '/companies', exact: true },
    };
  }

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
