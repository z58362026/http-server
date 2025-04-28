<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-16 15:16:50
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-25 15:48:01
 * @FilePath: /zdjx-cmmp/src/views/monitoring/detail/components/RecordMonitoring.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <custom-table :tableData="tableData" :selection="false" :pagination="pagination" @changePage="handleChangePage">
      <el-table-column prop="monitorName" label="监控任务名称" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="createPerson" label="任务创建时间" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="cycleDay" label="任务执行频率" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="startTime" label="任务执行时间" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="endTime" label="任务结束时间" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="jobDetailStatus" label="任务执行记录" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template v-slot="scoped">
          <!-- <el-button
            v-if="scoped.row.jobDetailStatus == 1"
            type="text"
            size="mini"
            @click="handleStartAndStop(scoped.row)"
          >
            启动
          </el-button> -->
          <el-button
            v-if="['WAITING', 'SUBMITTED', 'ACCEPTED', 'RUNNING'].includes(scoped.row.jobDetailStatus)"
            type="text"
            size="mini"
            @click="handleStartAndStop(scoped.row)"
          >
            停用
          </el-button>
          <el-button type="text" size="mini" @click="handleDetail(scoped.row)">查看日志</el-button>
        </template>
      </el-table-column>
    </custom-table>
    <DialogRecordMonitoring v-if="isDialog" @close="isDialog = false" />
  </div>
</template>

<script>
import { getMonitoringRecordList, stopMonitoringJob } from '@/api/monitoring-detail';
import customTable from '../../components/custom-table.vue';
import DialogRecordMonitoring from './DialogRecordMonitoring.vue';
export default {
  components: {
    customTable,
    DialogRecordMonitoring,
  },
  data() {
    return {
      id: '',
      isDialog: false,
      tableData: [],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.apiTableData();
  },
  methods: {
    async apiTableData() {
      const res = await getMonitoringRecordList({
        id: this.id,
        pageNo: this.pagination.page,
        pageSize: this.pagination.pageSize,
      });
      this.tableData = res.list;
      this.pagination.total = +res.total;
      this.pagination.pageSize = +res.pageSize;
      this.pagination.page = +res.pageNum;
    },
    handleChangePage(val) {
      this.pagination = { ...this.pagination, ...val };
      this.apiTableData();
    },
    async handleStartAndStop(item) {
      await stopMonitoringJob(item.detailId);
      this.apiTableData();
      this.$message('操作成功');
    },
    handleDetail() {
      this.isDialog = true;
    },
  },
};
</script>

<style lang="less" scoped></style>
