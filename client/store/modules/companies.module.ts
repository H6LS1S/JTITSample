import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';

export interface Company {
  readonly id: number;
  name: string;
  email: string;
  logotype: string;
  website: string;
  readonly owner: any;
  readonly createAt: Date;
  readonly updateAt: Date;
}

export interface Companies {
  items: Company[];
  pages: number;
}

class CompaniesState {
  currentPage: number = 1;
  companies!: Companies;
  company!: Company;
}

class CompaniesGetters extends Getters<CompaniesState> {
  get getCompanies(): Companies {
    return this.state.companies;
  }

  get getCompany(): Company {
    return this.state.company;
  }
}

class CompaniesMutations extends Mutations<CompaniesState> {
  setCurrentPage(id: number): void {
    this.state.currentPage = id;
  }

  setCompanies(data: Companies): void {
    this.state.companies = data;
  }

  setCompany(data: Company): void {
    this.state.company = data;
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
    await this.store.$axios.$post(`company/`, data);
    return await this.selectCompanies();
  }

  async selectCompanies(limit = 10): Promise<void> {
    const params = { page: this.state.currentPage, limit: limit };
    const data = await this.store.$axios.$get(`company/`, { params });
    return this.mutations.setCompanies(data);
  }

  async selectCompany(id: number): Promise<void> {
    const data = await this.store.$axios.$get(`company/${id}`);
    return this.mutations.setCompany(data);
  }

  async updateCompany(data: Company): Promise<void> {
    const { id } = this.state.company;
    await this.store.$axios.$patch(`company/${id}`, data);
    return await this.selectCompany(data.id);
  }

  async updateCompanyLogotype(data: any): Promise<void> {
    const { id } = this.state.company;
    return await this.store.$axios
      .$put(`company/${id}/logotype`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(data => this.mutations.setCompany(data));
  }

  async deleteCompany(id: number): Promise<void> {
    await this.store.$axios.$delete(`company/${id}`);
    return await this.selectCompanies();
  }
}

export const CompaniesModule = new Module({
  state: CompaniesState,
  getters: CompaniesGetters,
  mutations: CompaniesMutations,
  actions: CompaniesActions,
});
