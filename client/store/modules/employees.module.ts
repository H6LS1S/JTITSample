import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

import { Company } from './companies.module';

export interface Employee {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly company: Company;
  readonly createAt: Date;
  readonly updateAt: Date;
}

export interface Employees {
  items: Employee[];
  pages: number;
}

class EmployeesState {
  error!: any;
  currentPage: number = 1;
  employees!: Employees;
  employee!: Employee;
}

class EmployeesGetters extends Getters<EmployeesState> {
  get getError(): any {
    return this.state.error;
  }

  get getCurrentPage(): number {
    return this.state.currentPage;
  }

  get getEmployees(): Employees {
    return this.state.employees;
  }

  get getEmployee(): Employee {
    return this.state.employee;
  }
}

class EmployeesMutations extends Mutations<EmployeesState> {
  setError(data: any): any {
    return Vue.set(this.state, 'error', data);
  }

  setCurrentPage(id: number): number {
    return Vue.set(this.state, 'currentPage', id);
  }

  setEmployees(data: Employees): Employees {
    return Vue.set(this.state, 'employees', data);
  }

  setEmployee(data: Employee): Employee {
    return Vue.set(this.state, 'employee', data);
  }
}

export class EmployeesActions extends Actions<
  EmployeesState,
  EmployeesGetters,
  EmployeesMutations
> {
  private store!: Store<NuxtAxiosInstance>;

  $init(store: Store<NuxtAxiosInstance>): void {
    this.store = store;
  }

  async createEmployee(data: Employee): Promise<void> {
    return await this.store.$axios
      .$post(`employee/`, data)
      .catch(err => this.mutations.setError(err))
      .then(() => this.selectEmployees());
  }

  async selectEmployees(limit = 10): Promise<void> {
    const params = { page: this.state.currentPage, limit };
    return await this.store.$axios
      .$get(`employee/`, { params })
      .then(data => this.mutations.setEmployees(data))
      .catch(err => this.mutations.setError(err));
  }

  async selectEmployee(id: number): Promise<void> {
    return await this.store.$axios
      .$get(`employee/${id}`)
      .then(data => this.mutations.setEmployee(data))
      .catch(err => this.mutations.setError(err));
  }

  async updateEmployee(data: Employee): Promise<void> {
    const { id } = this.state.employee;
    return await this.store.$axios
      .$patch(`employee/${id}`, data)
      .then(res => this.mutations.setEmployee(res))
      .catch(err => this.mutations.setError(err));
  }

  async deleteEmployee(id: number): Promise<void> {
    return await this.store.$axios
      .$delete(`employee/${id}`)
      .catch(err => this.mutations.setError(err))
      .then(() => this.selectEmployees());
  }
}

export const EmployeesModule = new Module({
  state: EmployeesState,
  getters: EmployeesGetters,
  mutations: EmployeesMutations,
  actions: EmployeesActions,
});
