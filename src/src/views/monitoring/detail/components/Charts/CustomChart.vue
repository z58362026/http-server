<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-21 15:30:00
 * @LastEditTime: 2025-04-22 17:45:45
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /zdjx-cmmp/src/views/monitoring/detail/components/Charts/CustomChart.vue
 * @Desc: 通用图表组件，支持多种图表类型和放大展示
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div class="custom-chart" :style="{ width, height }">
    <div ref="chartContainer" class="chart-container"></div>
    <el-button v-if="isPreview" icon="el-icon-full-screen" class="preview-button" @click="handlePreview"></el-button>
    <DialogChartsPreview v-if="isDialog" @close="isDialog = false">
      <CustomChart
        :type="type"
        :title="title"
        :xAxisData="xAxisData"
        :seriesData="seriesData"
        :options="options"
        width="100%"
        height="600px"
      />
    </DialogChartsPreview>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import DialogChartsPreview from './DialogChartsPreview.vue';

export default {
  name: 'CustomChart',
  components: {
    DialogChartsPreview,
  },
  props: {
    type: {
      type: String,
      default: 'line',
      validator: (value) => ['line', 'pie', 'bar'].includes(value),
    },
    title: {
      type: String,
      default: '',
    },
    xAxisData: {
      type: Array,
      default: () => [],
    },
    seriesData: {
      type: Array,
      default: () => [],
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '400px',
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chartInstance: null,
      isDialog: false,
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    xAxisData: 'updateChart',
    seriesData: 'updateChart',
    type: 'updateChart',
    options: {
      handler: 'updateChart',
      deep: true,
    },
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chartContainer);
      this.setChartOptions();
    },
    updateChart() {
      if (this.chartInstance) {
        this.setChartOptions();
      }
    },
    setChartOptions() {
      const baseOptions = {
        title: {
          text: this.title,
          left: 'center',
        },
        tooltip: {
          trigger: this.type === 'pie' ? 'item' : 'axis',
        },
        legend: {
          data: this.seriesData.map((item) => item.name),
          bottom: 0,
        },
      };

      let chartOptions = {};
      switch (this.type) {
        case 'line':
          chartOptions = {
            xAxis: {
              type: 'category',
              data: this.xAxisData,
              boundaryGap: false,
            },
            yAxis: {
              type: 'value',
            },
            series: this.seriesData.map((item) => ({
              ...item,
              type: 'line',
              smooth: true,
            })),
          };
          break;
        case 'pie':
          chartOptions = {
            series: [
              {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  show: true,
                  position: 'outside',
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold',
                  },
                },
                data: this.seriesData,
              },
            ],
          };
          break;
        case 'bar':
          chartOptions = {
            xAxis: {
              type: 'category',
              data: this.xAxisData,
            },
            yAxis: {
              type: 'value',
            },
            series: this.seriesData.map((item) => ({
              ...item,
              type: 'bar',
            })),
          };
          break;
      }

      const finalOptions = {
        ...baseOptions,
        ...chartOptions,
        ...this.options,
      };

      this.chartInstance.setOption(finalOptions);
    },
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    },
    handlePreview() {
      this.isDialog = true;
    },
  },
};
</script>

<style lang="less" scoped>
.custom-chart {
  position: relative;
  .chart-container {
    width: 100%;
    height: 100%;
  }
  .preview-button {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
  }
}
</style>
