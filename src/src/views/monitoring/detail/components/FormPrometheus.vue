<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-17 10:18:00
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-25 15:45:18
 * @FilePath: /zdjx-cmmp/src/views/monitoring/detail/components/FormPrometheus.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
      <el-form-item v-if="isNeedFields">
        <el-select
          v-model="queryParams.quotaType"
          clearable
          style="width: 180px"
          placeholder="请选择字段"
          @change="updateTimeParams"
        >
          <el-option v-for="item in []" :key="item.key" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="queryParams.type" @change="handleChangeTabDate">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="year">近一年</el-radio-button>
          <el-radio-button label="half">近半年</el-radio-button>
          <el-radio-button label="days">近 30 天</el-radio-button>
          <el-radio-button label="pastDay">近 7 天</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="queryParams.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable
          @change="handleChangeDate"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: 'FormPrometheus',
  model: {
    prop: 'defaultQueryParams',
  },
  props: {
    defaultQueryParams: Object,
    isNeedFields: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      queryParams: {
        type: 'all',
        date: [],
        startTime: '',
        endTime: '',
      },
    };
  },
  computed: {},
  watch: {
    defaultQueryParams: {
      handler() {
        this.queryParams = this.defaultQueryParams;
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  methods: {
    handleChangeTabDate(type) {
      let startTime = '';
      let endTime = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');

      switch (type) {
        case 'year':
          startTime = dayjs().subtract(1, 'year').startOf('day').format('YYYY-MM-DD HH:mm:ss');
          break;
        case 'half':
          startTime = dayjs().subtract(6, 'month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
          break;
        case 'days':
          startTime = dayjs().subtract(30, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
          break;
        case 'pastDay':
          startTime = dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
          break;
        case 'all':
          startTime = '';
          endTime = '';
          break;
      }

      this.queryParams.date = [startTime, endTime];
      this.updateTimeParams(startTime, endTime);
    },
    handleChangeDate(date) {
      if (!date) {
        this.queryParams.startTime = '';
        this.queryParams.endTime = '';
        return;
      }
      this.queryParams.type = '';
      this.updateTimeParams(date[0], date[1]);
    },
    updateTimeParams(startTime, endTime) {
      this.queryParams.startTime = startTime;
      this.queryParams.endTime = endTime;
      this.$emit('input', this.queryParams);
      this.$emit('search');
    },
  },
};
</script>

<style lang="less" scoped>
.demo-form-inline {
  display: flex;
  align-items: center;
}
</style>
