<template>
  <div class="prometheus">
    <div class="header">
      <FormPrometheus @search="handlerSearch" v-model="queryParams" :isNeedFields="false" />
    </div>
    <div class="model-name">模型类型： {{ modelInfo.modelName }}</div>
    <el-row v-for="(row, rowIndex) in optionRows" :key="rowIndex" :gutter="20">
      <el-col v-for="(item, colIndex) in row" :key="colIndex" :span="12">
        <!-- 在这里放置每个选项的内容 -->
        <CustomChartLine :title="item.label" :xAxisData="months" :seriesData="salesSeries" isPreview />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getMonitoringMetrics } from '@/api/monitoring-detail';
import { prometheusModelConfig } from '../config';
import CustomChartLine from './Charts/Custom-Chart-Line.vue';
import FormPrometheus from './FormPrometheus.vue';
export default {
  components: {
    CustomChartLine,
    FormPrometheus,
  },
  data() {
    return {
      queryParams: {},
      modelType: 'BINARY_CLASSIFICATION',
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      salesSeries: [
        {
          name: '2025年',
          type: 'line',
          data: [120, 200, 150, 80, 70, 110, 130, 140, 160, 180, 190, 210],
        },
        {
          name: '2024年',
          type: 'line',
          data: [100, 180, 130, 60, 90, 100, 120, 125, 135, 145, 160, 170],
        },
        {
          name: '2023年',
          type: 'line',
          data: [90, 160, 120, 70, 60, 95, 100, 110, 115, 130, 140, 150],
        },
      ],
      prometheusModelConfig,
    };
  },
  computed: {
    modelInfo() {
      return prometheusModelConfig.find((item) => item.modelType == this.modelType) || { modelName: '', options: [] };
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
    console.log('%c [  ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', '监控报告');
  },
  methods: {
    async getMonitoringMetrics() {
      const res = await getMonitoringMetrics();
      // TODO 改变数据
    },
    handlerSearch() {
      console.log('%c [  ]-73', 'font-size:13px; background:pink; color:#bf2c9f;', '搜索监控模型指标');
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
