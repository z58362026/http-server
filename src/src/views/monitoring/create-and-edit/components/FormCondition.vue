<template>
  <el-form ref="form" :model="formData" :rules="rules" :inline="true">
    <el-form-item prop="standard" required>
      <el-select v-model="formData.standard" placeholder="请选择告警指标">
        <el-option
          v-for="(item, index) in standardOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="!isModel" prop="metric" required style="width: 100px">
      <el-select v-model="formData.metric" placeholder="请选择">
        <el-option
          v-for="(item, index) in metricOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="condition" required style="width: 100px">
      <el-select v-model="formData.condition" placeholder="请选择">
        <el-option
          v-for="(item, index) in conditionOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="threshold" required>
      <el-input v-model="formData.threshold" :maxlength="50" show-word-limit placeholder="请输入阈值"></el-input>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  model: {
    prop: 'info',
    event: 'change',
  },
  props: {
    standardOptions: {
      type: Array,
    },
    info: {
      type: Object,
    },
    preFormData: {
      type: Object,
    },
  },

  data() {
    return {
      formData: {},
      // standardOptions: [],
      metricOptions: [
        { label: '最大值', value: '>' },
        { label: '最小值', value: '<' },
        { label: '众数', value: '<=' },
        { label: '中位数', value: '>=' },
      ],
      conditionOptions: [
        { label: '大于', value: '>' },
        { label: '小于', value: '<' },
        { label: '小于等于', value: '<=' },
        { label: '大于等于', value: '>=' },
        { label: '等于', value: '==' },
        { label: '不等于', value: '!=' },
      ],
      rules: {
        standard: [{ required: true, message: '请选择', trigger: 'change' }],
        metric: [{ required: true, message: '请选择', trigger: 'change' }],
        condition: [{ required: true, message: '请选择', trigger: 'change' }],
        threshold: [
          { required: true, message: '请选择', trigger: 'blur' },
          { max: 50, message: '请选择', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    // 是模型效果或者数据质量
    isModel() {
      return this.preFormData.jobType == 1;
    },
  },
  watch: {
    info: {
      handler(val) {
        this.formData = val;
      },
      immediate: true,
      deep: true,
    },
    formData: {
      handler(val) {
        // this.$emit('change', { ...val });
      },
      // immediate: true,
      deep: true,
    },
  },
  methods: {
    exportValidate() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      });
    },

    exportGetFormData() {
      return {
        ...this.formData,
      };
    },
  },
};
</script>

<style lang="less" scoped></style>
