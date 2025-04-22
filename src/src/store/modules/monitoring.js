import { getMonitorlType } from '@/api/monitoring';

export default {
  namespaced: true,
  state: {
    monitoringTypeOptions: [],
  },
  mutations: {
    setMonitorType(state, data) {
      console.log('%c [ data ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', data);
      state.monitoringTypeOptions = data;
    },
  },
  getters: {},
  actions: {
    async getMonitorlType({ commit }, params) {
      const data = await getMonitorlType(params);
      commit('setMonitorType', data);
    },
    // 初始化所有监控相关码值
    async initAll({ dispatch }) {
      await dispatch('getMonitorlType');
    },
  },
};
