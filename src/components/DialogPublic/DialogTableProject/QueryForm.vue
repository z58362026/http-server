<template>
  <el-form :inline="true" :model="queryParams" @submit.prevent>
    <el-form-item>
      <el-input
        v-model="queryParams.projectName"
        placeholder="项目名称"
        style="width: 200px;"
        @keyup.enter="handleSearch"
      >
        <template #suffix>
          <i class="el-icon-search" @click="handleSearch"></i>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  model: {
    prop: 'defaultQueryParams',
    event: 'changeQueryParams',
  },
  props: {
    defaultQueryParams: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['changeQueryParams', 'search'],
  data() {
    return {
      queryParams: {
        projectName: '',
      },
    };
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
  },
};
</script>

<!-- <style lang="less" scoped></style> -->
