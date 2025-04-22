<template>
  <div>
    <custom-table :tableData="tableData" :selection="false" :pagination="pagination" @changePage="handleChangePage">
      <el-table-column prop="name" label="监控任务名称" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="createTime" label="任务创建时间" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="frequency" label="任务执行频率" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="executeTime" label="任务执行时间" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="endTime" label="任务结束时间" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="executeRecord" label="任务执行记录" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template v-slot="scoped">
          <el-button v-if="scoped.row.status == 1" type="text" size="mini" @click="handleStartAndStop(scoped.row)">
            启动
          </el-button>
          <el-button v-else type="text" size="mini" @click="handleStartAndStop(scoped.row)">停用</el-button>
          <el-button type="text" size="mini" @click="handleDetail(scoped.row)">查看日志</el-button>
        </template>
      </el-table-column>
    </custom-table>
    <DialogRecordMonitoring v-if="isDialog" @close="isDialog = false" />
  </div>
</template>

<script>
import { getMonitoringRecordList } from '@/api/monitoring-detail';
import customTable from '../../components/custom-table.vue';
import DialogRecordMonitoring from './DialogRecordMonitoring.vue';
export default {
  components: {
    customTable,
    DialogRecordMonitoring,
  },
  data() {
    return {
      isDialog: false,
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
    handleDetail() {
      this.isDialog = true;
    },
  },
};
</script>

<style lang="less" scoped></style>
