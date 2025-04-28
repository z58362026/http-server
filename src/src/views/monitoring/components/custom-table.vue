<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-10-30 14:14:03
 * @LastEditTime: 2024-10-30 15:50:06
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/view/data/data-administration-new/structured/components/custom-table.vue
 * @Desc: 通用的 table 组件
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div>
    <el-table :style="{ width: '100%' }" :data="tableData" border stripe v-on="$listeners">
      <el-table-column v-if="selection" type="selection" width="42"> </el-table-column>
      <slot v-if="tableData.length"></slot>
    </el-table>
    <el-pagination
      v-if="pagination.total != 0 && showPagination"
      :page-sizes="pageSizes"
      :page-size="pagination.pageSize"
      :current-page="pagination.currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    >
    </el-pagination>
    <!-- <div v-else>无数据</div> -->
  </div>
</template>

<script>
export default {
  props: {
    showPagination: {
      type: Boolean,
      default: () => true,
    },
    selection: {
      type: Boolean,
      default: () => true,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    tableLoading: {
      type: Boolean,
      default: () => false,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40],
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          pageSize: 10,
          page: 1,
          total: 0,
        };
      },
    },
  },
  methods: {
    handleSizeChange(pageSize) {
      this.$emit('changePage', { page: 1, pageSize });
    },
    handlePageChange(current) {
      this.$emit('changePage', { page: current });
    },
  },
};
</script>

<style lang="less" scoped></style>
