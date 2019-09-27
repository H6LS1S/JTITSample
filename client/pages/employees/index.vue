<template>
  <v-data-table :headers="headers" :items="getEmployees">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Employees</v-toolbar-title>
        <v-divider class="mx-4" inset vertical />
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <PageLink :page="getButtonUpdate()" icon />
      <PageLink
        :page="getButtonDelete()"
        @click="deleteEmployee(item.id)"
        icon
      />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';

@Component({
  layout: 'dashboard',
  components: {
    PageLink: () => import('~/components/PageLink'),
  },
  async fetch({ store }) {
    return await store.dispatch('EmployeesModule/selectEmployees');
  },
})
export default class EmployeesPage extends Vue {
  @Action('EmployeesModule/selectEmployees') selectEmployees;
  @Action('EmployeesModule/deleteEmployee') deleteEmployee;

  @Getter('EmployeesModule/getEmployees') getEmployees;
  @Getter('EmployeesModule/getHeaders') headers;

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
