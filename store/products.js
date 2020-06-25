import Vue from 'vue';

export const state = () => ({
  currentFilterValues: [],
  products: {}
});

export const mutations = {
  setFilterValues(state, payload){
    state.currentFilterValues = payload;
  }
};

export const actions = {
  loadProductsData({ commit }, params){
    return this.$axios.$get('/api/v1/products',  { params });
  },
  loadProductData({ commit }, params){
    return this.$axios.$get(`/api/v1/products/${params.id}`,  { params });
  },
  loadFilterData({ commit, state }, { sectionId, configurationId, filter }) {
    return this.$axios.$get(`/api/v1/products/filter`, {
      params: { ...filter, section: sectionId, configurationId }
    });
  }
};
