<template>
  <div style="width: 100%; position: relative">
    <components :is="component" :title="title" :xAxisData="xAxisData" :seriesData="seriesData" />
    <!-- <div :style="{ width, height }" ref="chartContainer"></div> -->
    <el-button
      v-if="isPreview"
      icon="el-icon-full-screen"
      style="position: absolute; top: 20px; right: 20px"
      @click="handlePreview"
    ></el-button>
    <DialogChartsPreview v-if="isDialog" @close="isDialog = false">
      <components :is="component" :title="title" :xAxisData="xAxisData" :seriesData="seriesData" />
      <!-- <CustomChartLine :title="title" :xAxisData="xAxisData" :seriesData="seriesData"> </CustomChartLine> -->
    </DialogChartsPreview>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import DialogChartsPreview from './DialogChartsPreview.vue';

export default {
  components: {
    DialogChartsPreview,
  },
  name: 'CustomChartLine',
  props: {
    type: {
      type: String,
      default: 'line',
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
    },
  },
  data() {
    return {
      chartInstance: null,
      isDialog: false,
    };
  },
  computed: {
    component() {
      return this.type;
    },
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
  watch: {
    xAxisData: 'updateChart',
    seriesData: 'updateChart',
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
      const options = {
        title: {
          text: this.title,
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: this.xAxisData,
          boundaryGap: false,
          // name: 'X Axis',
          nameLocation: 'center',
          nameGap: 25,
        },
        yAxis: {
          type: 'value',
          // name: 'Y Axis',
          min: 0,
          max: 200,
        },
        series: this.seriesData,
      };
      this.chartInstance.setOption(options);
    },
    handlePreview() {
      this.isDialog = true;
    },
  },
};
</script>
