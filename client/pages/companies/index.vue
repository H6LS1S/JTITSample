<template>
  <v-row>
    <v-pagination
      v-if="companies.pages > 1"
      v-model="currentPage"
      :length="companies.pages"
      :total-visible="5"
    />

    <v-col
      v-for="company in companies.items"
      :key="company.id"
      class="d-flex child-flex"
      cols="4"
    >
      <v-card>
        <v-img
          :src="getLogotype(company.logotype)"
          :gradient="getGradient()"
          :aspect-ratio="16 / 9"
          class="white--text"
        >
          <v-row justify="end" class="mb-n9">
            <PageLink :page="getButtonEmail(company.email)" icon dark />
            <PageLink :page="getButtonOpenInView(company.website)" icon dark />
          </v-row>
          <v-row class="fill-height">
            <v-card-title class="align-end fill-height">
              {{ company.name }}
            </v-card-title>
          </v-row>
        </v-img>
        <v-card-actions>
          <PageLink :page="getButtonUpdate()" icon />
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
  components: {
    PageLink: () => import('~/components/PageLink'),
  },
  async fetch({ store }) {
    return await store.dispatch('CompaniesModule/selectCompanies');
  },
})
export default class CompaniesPage extends Vue {
  @Action('CompaniesModule/selectCompanies') selectCompanies;
  @Action('CompaniesModule/deleteCompany') deleteCompany;
  
  @Mutation('CompaniesModule/setCurrentPage') setCurrentPage;

  @Getter('CompaniesModule/getCompanies') companies;

  @Watch('currentPage')
  onChangeCurrentPage(id: number) {
    this.setCurrentPage(id);
    this.selectCompanies();
  }

  private currentPage: number = 1;

  private getButtonOpenInView(website) {
    return {
      icon: 'mdi-open-in-new',
      attr: {
        href: website,
        target: '_blank',
      },
    };
  }

  private getButtonEmail(email) {
    return {
      icon: 'mdi-email-send-outline',
      attr: {
        href: `mailto:${email}`,
      },
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
