<template>
  <BaseDialogBox title="切换项目" :before-confirm="handleConfirm">
    <QueryForm v-model="queryParams" @search="handleQueryParams" />
    <BaseTable :table-data="tableData" :selection="false" :pagination="pagination" @change-page="handleChangePage">
      <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip min-width="100">
        <template #default="scoped">
          <div style="position: relative; z-index: 1;">
            <el-checkbox :value="selectedItem.id === scoped.row.id" @change="handleChangeProject(scoped.row)">
              {{ scoped.row.projectName }}
            </el-checkbox>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="created" label="创建时间" show-overflow-tooltip />
    </BaseTable>
  </BaseDialogBox>
</template>

<script>
import BaseTable from '@upgrade/components/BaseTable/index.vue';
import { getProjectList, getAllProject } from '@upgrade/server/common';
import QueryForm from './QueryForm.vue';

export default {
  name: 'TableProject',
  components: {
    QueryForm,
    BaseTable,
  },

  props: {
    needQueryAllProject: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['submit'],
  data() {
    return {
      queryParams: {},
      tableData: [],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      selectedItem: {},
    };
  },
  created() {
    this.apiTableData();
  },
  methods: {
    async apiTableData() {
      let res = {};
      const params = {
        ...this.queryParams,
        pageSize: this.pagination.pageSize,
        current: this.pagination.page,
      };
      if (this.needQueryAllProject) {
        res = await getAllProject(params);
      } else {
        res = await getProjectList(params);
      }
      this.tableData = res.data;
      this.pagination.total = +res.total;
    },
    handleQueryParams() {
      this.pagination.page = 1;
      this.apiTableData();
    },
    handleChangePage(val) {
      this.pagination = { ...this.pagination, ...val };
      this.apiTableData();
    },
    handleChangeProject(item) {
      this.selectedItem = item;
    },

    handleConfirm() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        if (!this.selectedItem.id) {
          this.$message({ type: 'warning ', message: `请选择项目` });
          return;
        }
        if (this.selectedItem.id === this.defaultSelectedId) {
          resolve();
        }
        await this.$asyncAlert('项目切换后将跳转至首页，当前界面更改不保存，是否确认切换项目', '更改提示');
        this.$emit('submit', this.selectedItem);
        resolve();
      });
    },
  },
};
</script>

<!-- <style lang="less" scoped></style> -->
