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
        <el-input v-model="queryParams.modlName" placeholder="请输入" style="width: 150px"> </el-input>
      </el-form-item>
      <el-form-item label="监控类型：">
        <el-select v-model="queryParams.monitorType" multiple filterable clearable style="width: 180px">
          <el-option v-for="item in monitoringTypeOptions" :key="item.key" :value="item.key" :label="item.desc" />
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
    ...mapState('monitoring', ['monitoringTypeOptions']),
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
        ...{
          id: '', //number   监控任务ID
          monitorName: '', //监控任务名称：
          modlName: '', //监控模型
          monitorType: 1, //number
        },
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
