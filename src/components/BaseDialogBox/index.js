import Vue from 'vue';
import _ from 'lodash';
import DialogBox from './index.vue';

export const openCustomDialog = (Component, props = {}) => {
  console.log('%c [ Component ]-6', 'font-size:13px; background:pink; color:#bf2c9f;', Component);
  // 适配参数
  const dialogProps = {
    title: props.title,
    beforeConfirm: props.beforeConfirm,
  };
  const componentProps = _.omit(props, 'title');

  const DialogConstructor = Vue.extend({
    render(h) {
      return h(
        DialogBox,
        {
          props: dialogProps,
        },
        [
          h(Component, {
            props: componentProps,
          }),
        ],
      );
    },
  });
  const instance = new DialogConstructor();
  instance.$mount();
  document.body.appendChild(instance.$el);
};

export const closeCustomDialog = () => {};

export default {
  openCustomDialog,
};
