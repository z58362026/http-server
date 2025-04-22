<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-10-30 18:11:40
 * @LastEditTime: 2024-12-10 15:23:54
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/view/data/data-administration-new/components/custom-footer.vue
 * @Desc: 底部按钮
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div class="custom-footer">
    <el-button @click="$emit('cancel')">取消</el-button>
    <!-- <el-button @click="$emit('prev')" v-if="step > 1">上一步</el-button>
    <el-button @click="$emit('next')" v-if="step < steps">下一步</el-button> -->
    <el-button type="primary" @click="$emit('submit')" v-if="step === steps">确定</el-button>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 0,
    },
    steps: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped></style>
