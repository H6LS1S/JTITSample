<template>
  <v-row v-if="getEmployee" justify="center">
    <v-col sm="12">
      <EditCardForm
        @save="saveEmployee()"
        @remove="deleteEmployee(employee.id)"
        :backButton="getButtonEmployees"
      >
        <template slot-scope="{ readonly }">
          <v-list-item-title class="headline">
            <v-select
              v-model="employee.company"
              :items="getCompanies.items"
              readonly
              item-text="name"
              item-value="id"
              label="Company"
            />
            <v-row>
              <v-col sm="12" md="6">
                <VTextFieldValidation
                  v-model="employee.firstName"
                  :readonly="readonly"
                  type="text"
                  rules="required"
                  label="Firs name"
                />
              </v-col>
              <v-col sm="12" md="6">
                <VTextFieldValidation
                  v-model="employee.lastName"
                  :readonly="readonly"
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
              :readonly="readonly"
              type="email"
              rules="required|email"
              label="Email"
            />
          </v-list-item-title>
          <v-list-item-title class="headline">
            <VTextFieldValidation
              v-model="employee.phone"
              :readonly="readonly"
              type="tel"
              rules="required|phone"
              label="Phone"
            >
            </VTextFieldValidation>
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
      title: `${this.getEmployee.firstName} ${this.getEmployee.lastName}`,
    };
  },
  components: {
    EditCardForm: () => import('~/components/EditCardForm'),
    VTextFieldValidation: () =>
      import('~/components/inputs/VTextFieldValidation'),
  },
  async fetch({ store, params }) {
    await store.dispatch('CompaniesModule/selectCompanies', 0);
    return await store.dispatch('EmployeesModule/selectEmployee', params.id);
  },
})
export default class CompaniesPage extends Vue {
  @Action('EmployeesModule/updateEmployee') updateEmployee;
  @Action('EmployeesModule/deleteEmployee') deleteEmployee;

  @Getter('CompaniesModule/getCompanies') getCompanies;
  @Getter('EmployeesModule/getEmployee') getEmployee;

  private employee: any;

  created() {
    this.employee = Object.assign({}, this.getEmployee);
  }

  private async saveEmployee() {
    await this.updateEmployee(this.employee);
    this.employee = Object.assign({}, this.getEmployee);
  }

  private getButtonEmployees() {
    return {
      icon: 'mdi-account-group-outline',
      attr: { to: '/employees', exact: true },
    };
  }
}
</script>
