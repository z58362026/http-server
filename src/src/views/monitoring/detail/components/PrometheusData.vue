<template>
  <div class="prometheus">
    <div class="header">
      <FormPrometheus @search="handlerSearch" v-model="queryParams" />
    </div>
    <el-row v-for="(row, rowIndex) in optionRows" :key="rowIndex" :gutter="20">
      <el-col v-for="(item, colIndex) in row" :key="colIndex" :span="12">
        <!-- 在这里放置每个选项的内容 -->
        <CustomChart type="line" :title="item.label" :xAxisData="months" :seriesData="salesSeries" isPreview />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getMonitoringMetrics } from '@/api/monitoring-detail';
import { prometheusDataConfig } from '../config';
import CustomChart from './Charts/CustomChart.vue';
import FormPrometheus from './FormPrometheus.vue';
export default {
  components: {
    CustomChart,
    FormPrometheus,
  },
  data() {
    return {
      id: '',
      queryParams: {},
      modelType: 'BINARY_CLASSIFICATION',
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      salesSeries: [
        {
          name: '',
          // type: 'line',
          data: [120, 200, 150, 80, 70, 110, 130, 140, 160, 180, 190, 210],
        },
        // {
        //   name: '2024年',
        //   type: 'line',
        //   data: [100, 180, 130, 60, 90, 100, 120, 125, 135, 145, 160, 170],
        // },
        // {
        //   name: '2023年',
        //   type: 'line',
        //   data: [90, 160, 120, 70, 60, 95, 100, 110, 115, 130, 140, 150],
        // },
      ],
      prometheusDataConfig,
      selectItem: {},
    };
  },
  computed: {
    modelInfo() {
      return prometheusDataConfig || { modelName: '', options: [] };
    },
    optionRows() {
      const rows = [];
      for (let i = 0; i < this.modelInfo.options.length; i += 2) {
        rows.push(this.modelInfo.options.slice(i, i + 2));
      }
      return rows;
    },
  },

  created() {
    this.id = this.$route.query.id;
    this.getMonitoringMetrics();
  },
  methods: {
    async getMonitoringMetrics() {
      const res = await getMonitoringMetrics({
        id: this.id,
        startTime: this.queryParams.startTime,
        endTime: this.queryParams.endTime,
        quotaType: this.queryParams.quotaType,
      });
    },
    handlerSearch() {
      this.getMonitoringMetrics();
    },
  },
};
</script>

<style lang="less" scoped>
.prometheus {
  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .model-name {
    margin: 20px;
  }
}
</style>
