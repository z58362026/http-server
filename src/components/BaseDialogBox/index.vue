<template>
  <el-dialog :visible.sync="visible" :title="title" :width="width" top="50px" :before-close="handleClose">
    <slot></slot>
    <template v-if="showFooter" #footer>
      <slot name="footer">
        <div class="dialog-footer">
          <el-button v-if="needCancel" size="mini" @click="handleClose">
            {{ cancelText }}
          </el-button>
          <el-button v-if="needConfirm" size="mini" type="primary" @click="handleConfirm">
            {{ confirmText }}
          </el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogBox',
  props: {
    title: {
      type: String,
      default: '弹窗',
    },
    width: {
      type: String,
      default: '660px',
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    beforeConfirm: {
      type: Function,
      default: () => true,
    },
    confirmText: {
      type: String,
      default: '确定',
    },
    needConfirm: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    needCancel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
      document.body.removeChild(this.$el); // 移除 DOM
      this.$destroy(); // 销毁实例
    },
    async handleConfirm() {
      await this.beforeConfirm();
      this.handleClose();
    },
  },
};
</script>

<!-- <style lang="less" scoped></style> -->
