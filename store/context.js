import Vue from 'vue';

export const state = () => ({
  domain: null,
  page: null,
  loading: false,
  error: null,
  blocks: {},
  offset: 0
});

export const mutations = {
  setDomain(state, domain) {
    state.domain = domain;
  },
  setPage(state, page) {
    state.page = page;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  setError(state, error) {
    state.error = error;
  },
  setBlocks(state, blocks) {
    state.blocks = {};
    for (let block of blocks) {
      state.blocks[block.placement] = state.blocks[block.placement] || [];
      state.blocks[block.placement].push(block);
    }
  },
  setOffset(state, height){
    state.offset = height;
  }
};

export const actions = {
  async loadDomain({ state, commit }, hostname) {
    commit('setLoading', true);
    commit('setError', false);
    let domain = null;
    try {
      domain = await this.$axios.$post(`/api/v1/domains/find`, { name: hostname });
      commit('setDomain', domain);
    } catch ({ response }) {
      console.error(response.data);
      commit('setError', response.data);
    }
    commit('setLoading', false);
    return domain;
  },
  async loadPage({ state, commit }, params) {
    commit('setLoading', true);
    commit('setError', false);
    let page = null;
    try {
      page = await this.$axios.$post(`/api/v1/pages/find`, params);
      commit('setBlocks', page.blocks);
      // console.info(state.blocks);
      delete page.blocks;
      commit('setPage', page);
    } catch ({ response }) {
      console.error(response.data);
      commit('setError', response.data);
    }
    commit('setLoading', false);
    return page;
  }
};
