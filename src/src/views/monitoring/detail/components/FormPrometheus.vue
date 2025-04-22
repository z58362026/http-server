<template>
  <div>
    <el-form :inline="true">
      <el-form-item v-if="isNeedFields">
        <el-select
          v-model="queryParams.fields"
          multiple
          filterable
          clearable
          style="width: 180px"
          placeholder="请选择字段"
          @change="handleSearch"
        >
          <el-option v-for="item in []" :key="item.key" :value="item.key" :label="item.desc" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="queryParams.tabPosition" @change="handleChangeTabDate">
          <el-radio-button label="1">全部</el-radio-button>
          <el-radio-button label="2">近一年</el-radio-button>
          <el-radio-button label="3">近半年</el-radio-button>
          <el-radio-button label="4">近 30 天</el-radio-button>
          <el-radio-button label="5">近 7 天</el-radio-button>
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
export default {
  model: {
    prop: 'defaultQueryParams',
    event: 'changeQueryParams',
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
      queryParams: {},
    };
  },
  computed: {},
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
      const params = { ...this.defaultQueryParams };
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

    handleChangeTabDate() {
      this.queryParams.date = '';
      this.handleSearch();
    },
    handleChangeDate() {
      this.queryParams.tabPosition = '';
      this.handleSearch();
    },
  },
};
</script>

<style lang="less" scoped></style>
