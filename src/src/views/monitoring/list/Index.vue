<template>
  <div>
    <QueryFormVue @search="handleSearch" v-model="queryParams">
      <el-button type="primary" size="mini" @click="handleAdd">创建</el-button>
    </QueryFormVue>
    <custom-table :tableData="tableData" :selection="false" :pagination="pagination" @changePage="handleChangePage">
      <el-table-column prop="monitorName" label="模型任务名称" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="modlName" label="监控模型" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="jobStatusDesc" label="监控状态" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="modelVersion" label="版本" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="taskId" label="监控任务ID" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="cratPesn" label="任务创建人" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="createTime" label="任务创建时间" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="warnNoticeType" label="告警通知方式" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="warnNotifier" label="告警通知人" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="fixedPeriod" label="任务执行频率" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template v-slot="scoped">
          <el-button
            v-if="[1, 3].includes(scoped.row.jobStatus)"
            type="text"
            size="mini"
            @click="handleStartAndStop(scoped.row)"
          >
            启动
          </el-button>
          <el-button
            v-else-if="[4].includes(scoped.row.jobStatus)"
            type="text"
            size="mini"
            @click="handleStartAndStop(scoped.row)"
          >
            停用
          </el-button>
          <el-button type="text" size="mini" @click="handleEdit(scoped.row)">编辑</el-button>
          <custom-delete-button @click="handleDelete(scoped.row)"> 删除 </custom-delete-button>
          <el-button type="text" size="mini" @click="handleDetail(scoped.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </custom-table>
  </div>
</template>

<script>
import { deleteMonitoringJob, getMonitoringList, startOrStopMonitoringJob } from '@/api/monitoring';
import QueryFormVue from './components/QueryForm.vue';
import CustomTable from '../components/custom-table.vue';
import CustomDeleteButton from '../components/custom-delete-button.vue';
import { mapActions } from 'vuex';
export default {
  components: {
    QueryFormVue,
    CustomTable,
    CustomDeleteButton,
  },
  data() {
    return {
      queryParams: {},
      tableData: [{}],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  computed: {},
  async created() {
    await this.getMonitoringModelConfig();
    await this.apiTableData();
  },
  methods: {
    ...mapActions('monitoring', ['getMonitoringModelConfig']),
    async apiTableData() {
      const res = await getMonitoringList({
        ...this.queryParams,
        pageNo: this.pagination.page,
        pageSize: this.pagination.pageSize,
      });
      this.tableData = res.list;
      this.pagination.total = +res.total;
      this.pagination.pageSize = +res.pageSize;
    },
    handleChangePage(val) {
      this.pagination = { ...this.pagination, ...val };
      this.apiTableData();
    },
    handleSearch() {
      this.pagination.page = 1;
      this.apiTableData();
    },
    async handleDelete(item) {
      await deleteMonitoringJob(item.id);
      this.apiTableData();
    },
    async handleStartAndStop(item) {
      await startOrStopMonitoringJob({
        id: item.id,
        type: item.jobStatus == 4 ? 3 : 4,
      });
      item.jobStatus = item.jobStatus == 4 ? 3 : 4;
    },
    handleAdd() {
      this.$router.push({ name: 'monitoringCreateAndEdit' });
    },
    handleEdit(item) {
      this.$router.push({ name: 'monitoringCreateAndEdit', query: { id: item.id } });
    },
    handleDetail(item) {
      this.$router.push({ name: 'monitoringDetail', params: { id: item.id } });
    },
  },
};
</script>

<style lang="less" scoped></style>
