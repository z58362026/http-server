<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-16 10:37:28
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-24 15:23:30
 * @FilePath: /zdjx-cmmp/src/views/monitoring/detail/Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- tab切换 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="监控记录" name="0"> </el-tab-pane>
      <el-tab-pane label="告警记录" name="1"> </el-tab-pane>
      <template v-if="isModel">
        <el-tab-pane label="监控报告" name="2"> </el-tab-pane>
      </template>
      <template v-else>
        <el-tab-pane label="监控报告" name="3"> </el-tab-pane>
      </template>
    </el-tabs>
    <components :is="component" />
  </div>
</template>

<script>
import PrometheusModel from './components/PrometheusModel.vue';
import PrometheusData from './components/PrometheusData.vue';
import RecordMonitoring from './components/RecordMonitoring.vue';
import RecordWarn from './components/RecordWarn.vue';
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
        1: RecordWarn,
        2: PrometheusModel,
        3: PrometheusData,
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
