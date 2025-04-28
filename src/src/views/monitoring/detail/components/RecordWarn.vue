<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-17 09:52:43
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-27 09:22:58
 * @FilePath: /zdjx-cmmp/src/views/monitoring/detail/components/RecordDataWarn.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <custom-table :tableData="tableData" :selection="false" :pagination="pagination" @changePage="handleChangePage">
      <el-table-column prop="monitorName" label="监控任务名称" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="warnConditionsDesc" label="告警条件" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="resultDesc" label="指标计算结果" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="cratTmtp" label="告警时间" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="warnNoticeType" label="告警通知方式" width="200" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="warnNotifier" label="告警通知人" width="200" show-overflow-tooltip> </el-table-column>
    </custom-table>
  </div>
</template>

<script>
import { getMonitoringWarnList } from '@/api/monitoring-detail';
import customTable from '../../components/custom-table.vue';
export default {
  components: {
    customTable,
  },
  data() {
    return {
      id: '',
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
      const res = await getMonitoringWarnList({
        id: this.id,
        pageNo: this.pagination.page,
        pageSize: this.pagination.pageSize,
      });
      this.tableData = res.list?.map((item) => {
        return {
          ...item,
          warnConditionsDesc: item.warnConditions.join(','),
          resultDesc: item.result.join(','),
        };
      });
      this.pagination.total = +res.total;
      this.pagination.pageSize = +res.pageSize;
      this.pagination.currentPage = +res.pageNum;
    },
    handleChangePage(val) {
      this.pagination = { ...this.pagination, ...val };
      this.apiTableData();
    },
  },
};
</script>

<style lang="less" scoped></style>
