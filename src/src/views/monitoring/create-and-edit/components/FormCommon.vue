<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-25 09:58:26
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-25 15:20:21
 * @FilePath: /zdjx-cmmp/src/views/monitoring/create-and-edit/components/FormCommon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-form ref="form" :model="formData" :rules="rules" label-width="180px">
      <el-form-item label="监控周期：" required>
        <FormCycleTime ref="subFormCycle" v-model="formData.modelTimer" :preFormData="formData" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FormCycleTime from './FormCycleTime.vue';
export default {
  components: {
    FormCycleTime,
  },
  props: {
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      rules: {},
    };
  },
  methods: {
    validateCurForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve();
          }
        });
      });
    },
    exportValidate() {
      const tasks = [this.validateCurForm(), this.$refs.subFormCycle?.exportValidate()];
      return Promise.all(tasks);
    },
  },
};
</script>

<style lang="less" scoped></style>
