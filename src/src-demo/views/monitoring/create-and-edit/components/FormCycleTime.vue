<template>
  <div>
    <el-form ref="form" :model="formData" :rules="rules" :inline="true">
      <el-form-item prop="cycleDay" required>
        <el-select v-model="formData.cycleDay" placeholder="请选择">
          <el-option v-for="(item, index) in cycleDayOptions" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <!-- 每年：选择月份和日期 -->
      <template v-if="formData.cycleDay === 'everyYear'">
        <el-form-item prop="month" required>
          <el-select v-model="formData.month" placeholder="选择月份">
            <el-option v-for="m in 12" :key="m" :label="`${m}月`" :value="m" />
          </el-select>
        </el-form-item>
        <el-form-item prop="day" required>
          <el-select v-model="formData.day" placeholder="选择日">
            <el-option v-for="d in 31" :key="d" :label="`${d}日`" :value="d" />
          </el-select>
        </el-form-item>
        <el-form-item prop="time" required>
          <el-time-picker value-format="HH:mm:ss" v-model="formData.time" placeholder="选择时间" style="width: 120px" />
        </el-form-item>
      </template>

      <!-- 每月：选择日期和时间 -->
      <template v-else-if="formData.cycleDay === 'everyMonth'">
        <el-form-item prop="day" required>
          <el-select v-model="formData.day" placeholder="选择日">
            <el-option v-for="d in 31" :key="d" :label="`${d}日`" :value="d" />
          </el-select>
        </el-form-item>
        <el-form-item prop="time" required>
          <el-time-picker value-format="HH:mm:ss" v-model="formData.time" placeholder="选择时间" style="width: 120px" />
        </el-form-item>
      </template>

      <!-- 每周：选择星期几和时间 -->
      <template v-else-if="formData.cycleDay === 'everyWeek'">
        <el-form-item prop="weekDay" required>
          <el-select v-model="formData.weekDay" placeholder="选择星期" style="width: 120px">
            <el-option label="星期一" :value="1" />
            <el-option label="星期二" :value="2" />
            <el-option label="星期三" :value="3" />
            <el-option label="星期四" :value="4" />
            <el-option label="星期五" :value="5" />
            <el-option label="星期六" :value="6" />
            <el-option label="星期日" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item prop="time" required>
          <el-time-picker value-format="HH:mm:ss" v-model="formData.time" placeholder="选择时间" style="width: 120px" />
        </el-form-item>
      </template>

      <!-- 每天：只选择时间 -->
      <template v-else-if="formData.cycleDay === 'everyDay'">
        <el-form-item prop="time" required>
          <el-time-picker value-format="HH:mm:ss" v-model="formData.time" placeholder="选择时间" style="width: 120px" />
        </el-form-item>
      </template>

      <!-- 自定义：输入框 -->
      <template v-else-if="formData.cycleDay === 'custom'">
        <el-form-item prop="custom" required>
          <el-input v-model="formData.custom" placeholder="请输入自定义表达式" style="width: 200px" />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    preFormData: Object,
  },
  model: {
    prop: 'preFormData',
    event: 'change',
  },
  data() {
    return {
      formData: {
        cycleDay: '',
        month: '',
        day: '',
        weekDay: '',
        time: '',
        custom: '',
      },
      cycleDayOptions: [
        { label: '每天', value: 'everyDay' },
        { label: '每周', value: 'everyWeek' },
        { label: '每月', value: 'everyMonth' },
        { label: '每年', value: 'everyYear' },
        { label: '自定义', value: 'custom' },
      ],
      rules: {
        cycleDay: [{ required: true, message: '请选择', trigger: 'change' }],
        time: [{ required: true, message: '请选择', trigger: 'change' }],
        day: [{ required: true, message: '请选择', trigger: 'change' }],
        month: [{ required: true, message: '请选择', trigger: 'change' }],
        weekDay: [{ required: true, message: '请选择', trigger: 'change' }],
        custom: [{ required: true, message: '请选择', trigger: 'blur' }],
      },
    };
  },
  watch: {
    preFormData: {
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
