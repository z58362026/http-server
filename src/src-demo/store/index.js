import Vue from 'vue';
import Vuex from 'vuex';
import monitoring from './modules/monitoring';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    monitoring,
  },
});
