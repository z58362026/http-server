<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-12-03 11:01:51
 * @LastEditTime: 2024-12-05 14:27:18
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/view/data/data-administration-new/components/custom-delete-button.vue
 * @Desc: 头部注释配置模板
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <el-button
    :type="type"
    :class="type == 'text' && !$attrs.disabled ? 'text-danger' : ''"
    size="mini"
    v-bind="$attrs"
    @click="handleDelete"
  >
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    title: {
      type: String,
      default: '确定要删除该监控任务吗？',
    },
    content: {
      type: String,
      default: '删除后不可恢复，请谨慎操作！',
    },
  },
  methods: {
    async handleDelete() {
      try {
        await this.$confirm(this.content, this.title);
        this.$emit('click');
      } catch (error) {
        console.log('%c [ error ]-38', 'font-size:13px; background:pink; color:#bf2c9f;', error);
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
