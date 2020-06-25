import Vue from 'vue';

export const state = () => ({
  loading: false,
  error: null,
  items: {},
  domain: null
});

export const mutations = {
  setItems(state, { type, items }) {
    Vue.set(state.items, type, items);
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  setError(state, error) {
    state.error = error;
  },
  setDomain(state, domain) {
    state.domain = domain;
  }
};

export const actions = {
  async loadMenuByType({ state, commit }, type) {
    commit('setLoading', true);
    commit('setError', false);
    let items = null;
    try {
      items = await this.$axios.$get(`/api/v1/menu/${type}`, { params: { domainId: state.domain._id } });
      commit('setItems', { type, items });
    } catch (err) {
      console.error(err);
      commit('setError', err.response.data);
    }
    commit('setLoading', false);
    return items;
  }
};
