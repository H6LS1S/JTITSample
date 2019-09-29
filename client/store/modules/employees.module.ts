import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';

export interface Employee {
  readonly id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  readonly createAt: Date;
  readonly updateAt: Date;
}

export interface Header {
  text: string;
  value: string;
  sortable?: boolean;
}

class EmployeesState {
  currentPage: number = 1;
  employees!: Employee[];
  employee!: Employee;
  headers: Header[] = [
    { text: 'First name', value: 'firstName' },
    { text: 'Last name', value: 'lastName' },
    { text: 'Email', value: 'email' },
    { text: 'Phone', value: 'phone' },
    { text: '', value: 'action', sortable: false },
  ];
}

class EmployeesGetters extends Getters<EmployeesState> {
  get getEmployees(): Employee[] {
    return this.state.employees;
  }

  get getEmployee(): Employee {
    return this.state.employee;
  }

  get getHeaders(): Header[] {
    return this.state.headers;
  }
}

class EmployeesMutations extends Mutations<EmployeesState> {
  setCurrentPage(id: number): void {
    this.state.currentPage = id;
  }

  setEmployees(data: Employee[]): void {
    this.state.employees = data;
  }

  setEmployee(data: Employee): void {
    this.state.employee = data;
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
    await this.store.$axios.$post(`employee/`, data);
    return await this.selectEmployees();
  }

  async selectEmployees(): Promise<void> {
    const params = { page: this.state.currentPage, limit: 10 };
    const data = await this.store.$axios.$get(`employee/`, { params: params });
    return this.mutations.setEmployees(data);
  }

  async selectEmployee(id: number): Promise<void> {
    const data = await this.store.$axios.$get(`employee/${id}`);
    return this.mutations.setEmployee(data);
  }

  async updateEmployee(data: Employee): Promise<void> {
    await this.store.$axios.$patch(`employee/${data.id}`, data);
    return await this.selectEmployees();
  }

  async deleteEmployee(id: number): Promise<void> {
    await this.store.$axios.$delete(`employee/${id}`);
    return await this.selectEmployees();
  }
}

export const EmployeesModule = new Module({
  state: EmployeesState,
  getters: EmployeesGetters,
  mutations: EmployeesMutations,
  actions: EmployeesActions,
});
