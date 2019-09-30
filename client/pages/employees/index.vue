<template>
  <v-row v-if="getEmployees" justify="center">
    <v-pagination
      v-if="getEmployees.pages > 1"
      v-model="currentPage"
      :length="getEmployees.pages"
      :total-visible="5"
    />

    <v-dialog max-width="500px">
      <template v-slot:activator="{ on }">
        <PageLink
          v-on="on"
          :page="getButtonCreate()"
          @click="selectCompanies(0)"
          fixed
          bottom
          right
          fab
          color="primary"
        />
      </template>
      <v-card v-if="getCompanies">
        <v-card-title>
          <v-spacer />
          <PageLink :page="getButtonSave()" @click="saveEmployee()" icon />
        </v-card-title>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">
              <v-select
                v-model="employee.company"
                :items="getCompanies.items"
                item-text="name"
                item-value="id"
                label="Company"
              />
              <v-row>
                <v-col sm="12" md="6">
                  <VTextFieldValidation
                    v-model="employee.firstName"
                    type="text"
                    rules="required"
                    label="Firs name"
                  />
                </v-col>
                <v-col sm="12" md="6">
                  <VTextFieldValidation
                    v-model="employee.lastName"
                    type="text"
                    rules="required"
                    label="Last name"
                  />
                </v-col>
              </v-row>
            </v-list-item-title>
            <v-list-item-title class="headline">
              <VTextFieldValidation
                v-model="employee.email"
                type="email"
                rules="required|email"
                label="Email"
              />
            </v-list-item-title>
            <v-list-item-title class="headline">
              <VTextFieldValidation
                v-model="employee.phone"
                type="tel"
                rules="required|phone"
                label="Phone"
              >
              </VTextFieldValidation>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions />
      </v-card>
    </v-dialog>

    <v-col sm="12" md="12" lg="6">
      <v-list-item v-for="employee in getEmployees.items" :key="employee.id">
        <v-list-item-avatar>
          <v-icon>mdi-account-outline</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ employee.firstName }} {{ employee.lastName }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <PageLink :page="getButtonCompanies(employee.company.id)" icon />
          <PageLink :page="getButtonPhone(employee.phone)" icon />
          <PageLink :page="getButtonEmail(employee.email)" icon />
          <PageLink :page="getButtonUpdate(employee.id)" icon />
          <PageLink
            :page="getButtonDelete()"
            @click="deleteEmployee(employee.id)"
            icon
          />
        </v-list-item-icon>
      </v-list-item>
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
      title: 'Employees',
    };
  },
  components: {
    PageLink: () => import('~/components/PageLink'),
    VTextFieldValidation: () =>
      import('~/components/inputs/VTextFieldValidation'),
  },
  async fetch({ store }) {
    return await store.dispatch('EmployeesModule/selectEmployees');
  },
})
export default class EmployeesPage extends Vue {
  @Action('CompaniesModule/selectCompanies') selectCompanies;
  @Action('EmployeesModule/selectEmployees') selectEmployees;
  @Action('EmployeesModule/createEmployee') createEmployee;
  @Action('EmployeesModule/deleteEmployee') deleteEmployee;

  @Mutation('EmployeesModule/setCurrentPage') setCurrentPage;

  @Getter('CompaniesModule/getCompanies') getCompanies;
  @Getter('EmployeesModule/getEmployees') getEmployees;
  @Getter('EmployeesModule/getHeaders') headers;

  @Watch('currentPage')
  onChangeCurrentPage(id: number) {
    this.setCurrentPage(id);
    this.selectEmployees();
  }

  private dialog: boolean = false;
  private currentPage: number = 1;
  private mask: string = '###-###-##-##';
  private employee = {
    company: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  private async saveEmployee() {
    this.dialog = !this.dialog;
    return await this.createEmployee(this.employee);
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

  private getButtonCompanies(id: number) {
    return {
      icon: 'mdi-domain',
      attr: { to: `/companies/${id}`, exact: true },
    };
  }

  private getButtonPhone(phone: string) {
    return {
      icon: 'mdi-phone-forward',
      attr: {
        href: `tel:${phone}`,
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
      attr: { to: `/employees/${id}`, exact: true },
    };
  }

  private getButtonDelete() {
    return {
      icon: 'mdi-delete',
    };
  }
}
</script>
