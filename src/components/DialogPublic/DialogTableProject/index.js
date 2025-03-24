import Vue from 'vue';
// import { openCustomDialog } from '@upgrade/components/BaseDialogBox';
import ProjectTable from './index.vue';

export * from './index.vue';

export const openDialogProjectTable = (props) => {
  return new Promise((resolve) => {
    const ProjectTableConstructor = Vue.extend(ProjectTable);
    const instance = new ProjectTableConstructor({
      propsData: props,
    });
    instance?.$mount();
    document.body.appendChild(instance.$el);
    instance.$on('submit', resolve);
  });
};
