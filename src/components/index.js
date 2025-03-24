/**
 * 注册组件
 * 所有 Base 前缀的组件，全局注册
 */
const baseComponents = import.meta.glob('./Base*/index.vue');

export default {
  install: async (Vue) => {
    Object.keys(baseComponents).forEach(async (path) => {
      const componentModule = await baseComponents[path]();
      const component = componentModule.default;
      // 提取文件夹名称作为组件名
      const componentName = path.match(/\/(Base[A-Za-z0-9_-]+)\/index\.vue$/)[1];
      if (component.install) {
        Vue.use(component);
      } else {
        Vue.component(componentName, component);
      }
    });
  },
};
