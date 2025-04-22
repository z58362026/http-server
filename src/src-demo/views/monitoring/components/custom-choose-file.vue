<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-10-31 19:26:45
 * @LastEditTime: 2024-10-31 19:31:36
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/view/data/data-administration-new/structured/components/custom-choose-file.vue
 * @Desc: 头部注释配置模板
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div>
    <el-button type="primary" @click="openDialog">选择文件</el-button>
    <dialog-ftp
      :linkType="linkType"
      ref="dialogFtp"
      @onOk="(params) => $emit('onChoose', params)"
      @change="changeFtp"
    />
  </div>
</template>

<script>
import DialogFtp from './custom-dialog-ftp.vue';

export default {
  components: {
    DialogFtp,
  },
  props: {
    linkType: {
      type: String,
      default: 'sftp',
    },
  },
  methods: {
    openDialog() {
      this.$refs.dialogFtp.exportToggleDialog();
    },
    changeFtp() {},
  },
};
</script>

<style lang="scss" scoped></style>
