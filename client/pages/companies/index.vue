<template>
  <v-row v-if="getCompanies" justify="center">
    <v-pagination
      v-if="getCompanies.pages > 1"
      v-model="currentPage"
      :length="getCompanies.pages"
      :total-visible="5"
    />

    <v-spacer />
    <v-dialog max-width="500px">
      <template v-slot:activator="{ on }">
        <PageLink
          v-on="on"
          :page="getButtonCreate()"
          fixed bottom right fab
          color="primary"
        />
      </template>
      <v-card>
        <v-card-title>
          <v-spacer />
          <PageLink :page="getButtonSave()" @click="saveCompany()" icon />
        </v-card-title>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">
              <VTextFieldValidation
                v-model="company.name"
                type="text"
                rules="required"
                label="Company name"
              />
            </v-list-item-title>

            <v-list-item-title class="headline">
              <VTextFieldValidation
                v-model="company.email"
                type="email"
                rules="required|email"
                label="Email"
              />
            </v-list-item-title>
            <v-list-item-title class="headline">
              <VTextFieldValidation
                v-model="company.website"
                type="url"
                rules="required|url"
                label="Web site"
              />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions />
      </v-card>
    </v-dialog>

    <v-col
      v-for="company in getCompanies.items"
      :key="company.id"
      xs="12"
      sm="12"
      md="6"
      lg="4"
    >
      <v-card>
        <v-img
          :src="getLogotype(company.logotype)"
          :gradient="getGradient()"
          :aspect-ratio="16 / 9"
          class="white--text"
        >
          <v-row align-space-around dense class="fill-height">
            <v-col sm="12" class="text-right">
              <PageLink :page="getButtonEmail(company.email)" icon dark />
              <PageLink :page="getButtonOpen(company.website)" icon dark />
            </v-col>
            <v-col sm="12">
              <v-card-title class="align-end fill-height">
                {{ company.name }}
              </v-card-title>
            </v-col>
          </v-row>
        </v-img>
        <v-card-actions>
          <PageLink :page="getButtonUpdate(company.id)" icon />
          <PageLink
            :page="getButtonDelete()"
            @click="deleteCompany(company.id)"
            icon
          />
          <v-spacer />
          <PageLink :page="getButtonEmployees(company.employees)" icon />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';

@Component({
  layout: 'dashboard',
  head() {
    return {
      title: 'Companies',
    };
  },
  components: {
    PageLink: () => import('~/components/PageLink'),
    VTextFieldValidation: () =>
      import('~/components/inputs/VTextFieldValidation'),
  },
  async fetch({ store }) {
    return await store.dispatch('CompaniesModule/selectCompanies');
  },
})
export default class CompaniesPage extends Vue {
  @Action('CompaniesModule/selectCompanies') selectCompanies;
  @Action('CompaniesModule/createCompany') createCompany;
  @Action('CompaniesModule/deleteCompany') deleteCompany;

  @Mutation('CompaniesModule/setCurrentPage') setCurrentPage;

  @Getter('CompaniesModule/getCompanies') getCompanies;

  @Watch('currentPage')
  onChangeCurrentPage(id: number) {
    this.setCurrentPage(id);
    this.selectCompanies();
  }

  private dialog: boolean = false;
  private currentPage: number = 1;
  private company = {
    name: '',
    email: '',
    website: '',
  };

  private async saveCompany() {
    this.dialog = !this.dialog;
    return await this.createCompany(this.company);
  }

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

  private getButtonOpen(website: string) {
    return {
      icon: 'mdi-open-in-new',
      attr: {
        href: website,
        target: '_blank',
      },
    };
  }

  private getButtonEmail(email: string) {
    return {
      icon: 'mdi-email-send-outline',
      attr: {
        href: `mailto:${email}`,
      },
    };
  }

  private getButtonUpdate(id: number) {
    return {
      icon: 'mdi-pencil-outline',
      attr: { to: `/companies/${id}`, exact: true },
    };
  }

  private getButtonDelete() {
    return {
      icon: 'mdi-delete',
    };
  }

  private getButtonEmployees(employees) {
    return {
      title: employees.length,
      icon: 'mdi-account-group-outline',
    };
  }

  private getGradient() {
    return `to top right, rgba(81, 176, 255, .7), rgba(63, 81, 181, .7)`;
  }
}
</script>
