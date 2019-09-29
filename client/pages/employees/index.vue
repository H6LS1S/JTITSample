<template>
  <v-row v-if="getEmployees" justify="center">
    <v-dialog max-width="500px">
      <template v-slot:activator="{ on }">
        <PageLink
          v-on="on"
          :page="getButtonCreate()"
          @click="selectCompanies(0)"
          fixed bottom right fab
          color="primary"
        />
      </template>
      <v-card v-if="getCompanies">
        <v-card-title>
          <v-spacer />
          <PageLink
            :page="getButtonSave()"
            @click="saveEmployee()"
            icon
          />
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
    <v-data-table :headers="headers" :items="getEmployees.items">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Employees</v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-spacer />
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <PageLink :page="getButtonUpdate(item.id)" icon />
        <PageLink
          :page="getButtonDelete()"
          @click="deleteEmployee(item.id)"
          icon
        />
      </template>
    </v-data-table>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Store, Action, Getter } from 'vuex-class';

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

  @Getter('CompaniesModule/getCompanies') getCompanies;
  @Getter('EmployeesModule/getEmployees') getEmployees;
  @Getter('EmployeesModule/getHeaders') headers;

  private dialog: boolean = false;
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
