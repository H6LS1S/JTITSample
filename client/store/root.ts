import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { RootState } from 'store';

export interface State {
  [x: string]: any;
}

export const state = (): State => ({
  pages: [
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
  ],
});

export const getters: GetterTree<RootState, RootState> = {
  getPages(state) {
    return state.pages;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async registrationUser({ dispatch }, userCredentials) {
    await this.$axios.$post('user', userCredentials);
    return await dispatch('authorizationUser', userCredentials);
  },

  async authorizationUser({}, userCredentials) {
    return await this.$auth.loginWith('local', { data: userCredentials });
  },
};

export const mutations: MutationTree<RootState> = {};
