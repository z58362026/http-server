<template>
  <div>
    <custom-table :tableData="tableData" :selection="false" :pagination="pagination" @changePage="handleChangePage">
      <el-table-column prop="name" label="监控任务名称" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="condition" label="告警条件" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="result" label="指标计算结果" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="createTime" label="告警时间" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="noticeType" label="告警通知方式" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="noticeUser" label="告警通知人" width="200" show-overflow-tooltip> </el-table-column>
    </custom-table>
  </div>
</template>

<script>
import { getMonitoringRecordList } from '@/api/monitoring-detail';
import customTable from '../../components/custom-table.vue';
export default {
  components: {
    customTable,
  },
  data() {
    return {
      tableData: [{}],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  created() {},
  methods: {
    async apiTableData() {
      const res = await getMonitoringRecordList({
        current: this.pagination.page,
        pageSize: this.pagination.pageSize,
      });
      this.tableData = res.data;
      this.pagination.total = +res.total;
      this.pagination.pageSize = +res.limit;
      this.pagination.currentPage = +res.currentPage;
    },
    handleChangePage(val) {
      this.pagination = { ...this.pagination, ...val };
      this.apiTableData();
    },
    async handleStartAndStop(item) {
      this.$message('操作成功');
      await stopMonitoringJob(item.id);
    },
  },
};
</script>

<style lang="less" scoped></style>
