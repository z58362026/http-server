<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-10-30 18:50:12
 * @LastEditTime: 2024-10-30 18:56:10
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/view/data/data-administration-new/structured/components/layout-content.vue
 * @Desc: layout
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div class="layout-content">
    <el-row :gutter="24">
      <el-col :span="16">
        <slot></slot>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less">
.layout-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}
</style>
