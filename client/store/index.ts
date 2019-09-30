import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

import { createStore } from 'vuex-smart-module';

import { CompaniesModule } from './modules/companies.module';
import { EmployeesModule } from './modules/employees.module';

interface PagesAttr {
  to?: string;
  exact?: boolean;
  href?: string;
  target?: string;
}

export interface Pages {
  icon: string;
  title?: string;
  attr?: PagesAttr;
}

class RootState {
  auth!: any;
  error!: any;
  pages: Pages[] = [
    { icon: 'mdi-view-dashboard-outline', attr: { to: '/', exact: true } },
    { icon: 'mdi-domain', attr: { to: '/companies', exact: true } },
    {
      icon: 'mdi-account-group-outline',
      attr: { to: '/employees', exact: true },
    },
    {
      icon: 'mdi-github-circle',
      attr: {
        href: 'https://github.com/HELSIS666/JTITSample',
        target: '_blank',
      },
    },
  ];
}

class RootGetters extends Getters<RootState> {
  get getError(): any {
    return this.state.error;
  }

  get getPages(): Pages[] {
    return this.state.pages;
  }

  get isAuth() {
    return this.state.auth.loggedIn;
  }
}

class RootMutations extends Mutations<RootState> {
  setError(data: any) {
    return Vue.set(this.state, 'error', data);
  }
}

class RootActions extends Actions<
  RootState,
  RootGetters,
  RootMutations,
  RootActions
> {
  store!: Store<NuxtAxiosInstance> | any;

  $init(store: Store<NuxtAxiosInstance>): void {
    this.store = store;
  }

  async registrationUser(data: any): Promise<void> {
    await this.store.$axios
      .$post('user', data)
      .catch(err => this.mutations.setError(err));
    return await this.authorizationUser(data);
  }

  async authorizationUser(data: any): Promise<void> {
    return await this.store.$auth
      .loginWith('local', { data })
      .catch(err => this.mutations.setError(err));
  }
}

const RootModule = new Module({
  state: RootState,
  getters: RootGetters,
  mutations: RootMutations,
  actions: RootActions,
  modules: {
    CompaniesModule,
    EmployeesModule,
  },
});

export default (): Store<any> =>
  createStore(RootModule, {
    strict: process.env.NODE_ENV !== 'production',
  });
