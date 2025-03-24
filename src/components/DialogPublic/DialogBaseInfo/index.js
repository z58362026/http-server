import Vue from 'vue';
// import { openCustomDialog } from '@upgrade/components/BaseDialogBox';
import BaseInfo from './index.vue';

export * from './index.vue';

export const openDialogBaseInfo = (props) => {
  console.log('%c [  ]-9', 'font-size:13px; background:pink; color:#bf2c9f;');
  return new Promise((resolve) => {
    const BaseInfoConstructor = Vue.extend(BaseInfo);
    const instance = new BaseInfoConstructor({
      propsData: props,
    });
    instance?.$mount();
    document.body.appendChild(instance.$el);
    instance.$on('submit', resolve);
  });
};
