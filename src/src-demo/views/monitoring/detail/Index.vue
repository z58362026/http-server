<template>
  <div>
    <!-- tab切换 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="监控记录" name="0"> </el-tab-pane>
      <template v-if="isModel">
        <el-tab-pane label="告警记录" name="1"> </el-tab-pane>
        <el-tab-pane label="监控报告" name="2"> </el-tab-pane>
      </template>
      <template v-else>
        <el-tab-pane label="告警记录" name="3"> </el-tab-pane>
        <el-tab-pane label="监控报告" name="4"> </el-tab-pane>
      </template>
    </el-tabs>
    <components :is="component" />
  </div>
</template>

<script>
import PrometheusModel from './components/PrometheusModel.vue';
import PrometheusData from './components/PrometheusData.vue';
import RecordMonitoring from './components/RecordMonitoring.vue';
import RecordModelWarn from './components/RecordModelWarn.vue';
import RecordDataWarn from './components/RecordDataWarn.vue';
export default {
  components: {
    // Prometheus,
    // RecordMonitoring,
    // RecordWarn,
  },
  data() {
    return {
      activeName: '0',
      type: '',
    };
  },
  computed: {
    // 是模型，不是数据质量类型
    isModel() {
      return this.type == 'model';
    },
    name() {
      return this.data;
    },
    component() {
      const config = {
        0: RecordMonitoring,
        1: RecordModelWarn,
        2: PrometheusModel,
        3: RecordDataWarn,
        4: PrometheusData,
      };
      return config[this.activeName];
    },
  },
  created() {
    this.type = this.$route.query.type;
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style lang="less" scoped></style>
