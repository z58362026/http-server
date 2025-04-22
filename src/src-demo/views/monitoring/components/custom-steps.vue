<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-10-30 17:40:42
 * @LastEditTime: 2024-12-10 15:23:10
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/view/data/data-administration-new/components/custom-steps.vue
 * @Desc: steps
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div class="custom-steps-wrap">
    <el-row :gutter="24">
      <el-col :span="12" :offset="6">
        <el-steps v-bind="$attrs" class="mr15">
          <el-step v-for="(item, index) in steps" :key="index" :title="item.title" />
        </el-steps>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.custom-steps-wrap {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  ::v-deep .el-step__title {
    font-size: 12px;
  }
  ::v-deep .el-step__icon {
    width: 20px;
    height: 20px;
  }
  ::v-deep .el-step__head.is-success {
    color: @menuActiveText;
    border-color: @menuActiveText;
  }
  ::v-deep .el-step__title.is-success {
    color: @menuActiveText;
    border-color: @menuActiveText;
  }
}
</style>
