import { openDialogProjectTable } from './DialogTableProject';
import { openDialogBaseInfo } from './DialogBaseInfo';

export { openDialogBaseInfo, openDialogProjectTable };

export default {
  install(Vue) {
    Vue.prototype.$dialog = {
      openDialogBaseInfo, // 基础信息
      openDialogProjectTable, // 项目
    };
  },
};
