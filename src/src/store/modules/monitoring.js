/*
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-18 16:13:19
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-22 15:51:26
 * @FilePath: /zdjx-cmmp/src/store/modules/monitoring.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getJobTypeOptions } from '@/api/monitoring';

export default {
  namespaced: true,
  state: {
    jobTypeOptions: [],
  },
  mutations: {
    setJobTypeOptions(state, data) {
      state.jobTypeOptions = data;
    },
  },
  getters: {},
  actions: {
    async getJobTypeOptions({ commit }, params) {
      const data = await getJobTypeOptions(params);
      commit('setJobTypeOptions', data);
    },
    // 初始化所有监控相关码值
    async initAll({ dispatch }) {
      await dispatch('getJobTypeOptions');
    },
  },
};
