<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-16 09:32:06
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-25 16:25:37
 * @FilePath: /zdjx-cmmp/src/views/monitoring/list/components/QueryForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-form inline :model="queryParams">
      <el-form-item label="监控任务ID：">
        <el-input v-model="queryParams.id" placeholder="请输入" style="width: 150px"> </el-input>
      </el-form-item>
      <el-form-item label="监控任务名称：">
        <el-input v-model="queryParams.monitorName" placeholder="请输入" style="width: 150px"> </el-input>
      </el-form-item>
      <el-form-item label="监控模型：">
        <el-input v-model="queryParams.modelName" placeholder="请输入" style="width: 150px"> </el-input>
      </el-form-item>
      <el-form-item label="监控类型：">
        <el-select v-model="queryParams.jobType" clearable style="width: 180px">
          <el-option v-for="item in jobTypeOptions" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleSearch"> 查询 </el-button>
        <slot></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  model: {
    prop: 'defaultQueryParams',
    event: 'changeQueryParams',
  },
  props: {
    defaultQueryParams: Object,
  },
  data() {
    return {
      queryParams: {},
    };
  },
  computed: {
    ...mapState('monitoring', ['jobTypeOptions']),
  },
  watch: {
    defaultQueryParams: {
      handler() {
        const params = this.initParams();
        this.queryParams = params;
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  methods: {
    initParams() {
      const params = {
        ...this.defaultQueryParams,
        // ...{
        //   id: '', //number   监控任务ID
        //   monitorName: '', //监控任务名称：
        //   modelName: '', //监控模型
        //   jobType: '', //number
        // },
      };
      return params;
    },
    adapterParams() {
      const params = { ...this.queryParams };
      this.$emit('changeQueryParams', params);
    },
    handleSearch() {
      this.adapterParams();
      this.$emit('search');
    },
  },
};
</script>

<style lang="less" scoped></style>
