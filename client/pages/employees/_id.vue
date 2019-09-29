<template>
  <v-row v-if="getEmployee" justify="center">
    <v-col sm="12">
      <v-card>
        <v-card-title v-if="isAuth">
          <PageLink :page="getButtonCompanies()" icon />
          <v-spacer />
          <PageLink
            v-if="!readonly"
            :page="getButtonSave()"
            @click="saveEmployee()"
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
            @click="deleteEmployee(employee.id)"
            icon
          />
        </v-card-title>

        <v-list-item>
          <v-list-item-content>
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
          </v-list-item-content>
        </v-list-item>

        <v-card-actions />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';

@Component({
  head() {
    return {
      title: `${this.getEmployee.firstName} ${this.getEmployee.lastName}`,
    };
  },
  components: {
    PageLink: () => import('~/components/PageLink'),
    LogotypePicker: () => import('~/components/LogotypePicker'),
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
  @Getter('isAuth') isAuth;

  private readonly: boolean = true;
  private employee;

  created() {
    this.employee = Object.assign({}, this.getEmployee);
  }

  private async saveEmployee() {
    this.readonly = !this.readonly;
    return await this.updateEmployee(this.employee);
  }

  private getButtonCompanies() {
    return {
      icon: 'mdi-account-group-outline',
      attr: { to: '/employees', exact: true },
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
