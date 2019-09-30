import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

export interface Company {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly logotype: string;
  readonly website: string;
  readonly owner: any;
  readonly createAt: Date;
  readonly updateAt: Date;
}

export interface Companies {
  items: Company[];
  pages: number;
}

class CompaniesState {
  error!: any;
  currentPage: number = 1;
  companies!: Companies;
  company!: Company;
}

class CompaniesGetters extends Getters<CompaniesState> {
  get getError(): any {
    return this.state.error;
  }

  get getCurrentPage(): number {
    return this.state.currentPage;
  }

  get getCompanies(): Companies {
    return this.state.companies;
  }

  get getCompany(): Company {
    return this.state.company;
  }
}

class CompaniesMutations extends Mutations<CompaniesState> {
  setError(data: any): any {
    return Vue.set(this.state, 'error', data);
  }

  setCurrentPage(id: number): number {
    return Vue.set(this.state, 'currentPage', id);
  }

  setCompanies(data: Companies): Companies {
    return Vue.set(this.state, 'companies', data);
  }

  setCompany(data: Company): Company {
    return Vue.set(this.state, 'company', data);
  }
}

export class CompaniesActions extends Actions<
  CompaniesState,
  CompaniesGetters,
  CompaniesMutations
> {
  private store!: Store<NuxtAxiosInstance>;

  $init(store: Store<NuxtAxiosInstance>): void {
    this.store = store;
  }

  async createCompany(data: Company): Promise<void> {
    return await this.store.$axios
      .$post(`company/`, data)
      .catch(err => this.mutations.setError(err))
      .then(() => this.selectCompanies());
  }

  async selectCompanies(limit = 10): Promise<void> {
    const params = { page: this.state.currentPage, limit };
    return await this.store.$axios
      .$get(`company/`, { params })
      .then(data => this.mutations.setCompanies(data))
      .catch(err => this.mutations.setError(err));
  }

  async selectCompany(id: number): Promise<void> {
    return await this.store.$axios
      .$get(`company/${id}`)
      .then(data => this.mutations.setCompany(data))
      .catch(err => this.mutations.setError(err));
  }

  async updateCompany(data: Company): Promise<void> {
    const { id } = this.state.company;
    return await this.store.$axios
      .$patch(`company/${id}`, data)
      .then(res => this.mutations.setCompany(res))
      .catch(err => this.mutations.setError(err));
  }

  async updateCompanyLogotype(data: any): Promise<void> {
    const { id } = this.state.company;
    const headers = { 'Content-Type': 'multipart/form-data' };
    return await this.store.$axios
      .$put(`company/${id}/logotype`, data, { headers })
      .then(res => this.mutations.setCompany(res))
      .catch(err => this.mutations.setError(err));
  }

  async deleteCompany(id: number): Promise<void> {
    return await this.store.$axios
      .$delete(`company/${id}`)
      .catch(err => this.mutations.setError(err))
      .then(() => this.selectCompanies());
  }
}

export const CompaniesModule = new Module({
  state: CompaniesState,
  getters: CompaniesGetters,
  mutations: CompaniesMutations,
  actions: CompaniesActions,
});
