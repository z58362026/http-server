<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-16 10:35:24
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-25 16:17:02
 * @FilePath: /zdjx-cmmp/src/views/monitoring/create-and-edit/Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="create-and-edit">
    <el-page-header @back="goBack" content="创建监控任务"> </el-page-header>
    <div style="flex: 1; margin-top: 20px" v-if="isReady">
      <el-form ref="form" :model="formData" :rules="rules" label-width="180px">
        <el-form-item label="选择监控类型：" prop="jobType" required>
          <el-checkbox-group v-model="formData.jobType" @change="handleChangeJobType">
            <el-checkbox v-for="(item, index) in jobTypeOptions" :key="index" :label="item.value">
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="模型类别："> {{ modelTypeName }} </el-form-item>
        <div style="padding-left: 80px">
          <el-tabs v-model="activeName">
            <el-tab-pane
              v-for="item in formDataArr"
              :key="item.jobType"
              :label="getJobTypeName(item)"
              :name="item.jobType + ''"
            >
              <component :is="getFormComponent(item)" :info="info" :formData="item" ref="subForm" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-form>
    </div>
    <custom-footer @cancel="handleCancel" @submit="handleSubmit"></custom-footer>
  </div>
</template>

<script>
import { getMonitoringDetail, postCreateMonitoringJob } from '@/api/monitoring';
import CustomFooter from '../components/custom-footer.vue';
import FormJob from './components/FormJob.vue';
import FormItemData from './components/FormItemData.vue';
import FormItemModel from './components/FormItemModel.vue';
import { mapActions, mapState } from 'vuex';
// import { mapActions, mapState } from 'vuex';
export default {
  components: {
    CustomFooter,
    FormJob,
  },
  data() {
    return {
      isReady: false,
      info: {},
      activeName: '',
      formData: {
        jobType: [],
      },
      formDataArr: [],
      rules: {
        jobType: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
      },
      jobTypeOptions: [
        {
          label: '模型效果',
          value: 1,
        },
        {
          label: '数据质量',
          value: 2,
        },
      ],
    };
  },
  computed: {
    ...mapState('monitoring', ['']),
    modelTypeName() {
      // TODO 需要真是判断
      return this.info.modelType == 1 ? '模型' : '数据';
    },
  },
  async created() {
    // await this.initAll();
    // this.id = this.$route.query.id;

    // this.id && (await this.getMonitoringDetail());
    this.isReady = true;
  },
  methods: {
    ...mapActions('monitoring', ['initAll']),
    getFormComponent(item) {
      return item.jobType == 1 ? FormItemModel : FormItemData;
    },
    getJobTypeName(item) {
      return item.jobType == 1 ? '模型效果' : '数据质量';
    },

    handleChangeJobType(selectedTypes) {
      // 保持已选中的类型
      const existingItems = this.formDataArr.filter((item) => selectedTypes.includes(item.jobType));
      // 获取已选中的类型
      const existingTypes = existingItems.map((item) => item.jobType);
      // 获取新选中的类型
      const newItems = selectedTypes
        .filter((type) => !existingTypes.includes(type))
        .map((type) => ({
          modelName: 'Spark压测模型',
          modelType: 'regression',
          modelVersion: '25942122746',
          modelInstance: '15942122746',
          monitorName: '压测模型',
          jobType: type,
          dbName: '',
          tableName: '',
          warnNoticeType: '',
          warnNotifier: '',
          inferenceExpress: '',
          transactionExpress: '',
          monitorComputeField: [],
          ifWarn: 0, //是否告警  number  1是 0 否
          modelTimer: {
            cycleDay: '',
            day: '',
            time: '',
            month: '',
            weekDay: '',
            custom: '',
          },
          conditions: [
            {
              branches: [{ standard: '', condition: '', threshold: '', id: Math.floor(Math.random() * 100000) }],
            },
          ],
        }));
      // 合并已选中的类型和新的类型
      this.formDataArr = [...existingItems, ...newItems];

      // 更新激活的标签
      if (this.formDataArr.length > 0) {
        this.activeName = this.formDataArr[0].jobType + '';
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    handleCancel() {
      this.goBack();
    },
    validateCurForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve();
          }
        });
      });
    },
    // 表单校验
    validateForm() {
      const tasks = [
        this.validateCurForm(),
        ...this.$refs.subForm?.map((item) => {
          return item.exportValidate();
        }),
      ];
      return Promise.all(tasks);
    },
    // 获取当前表单数据
    getCurFormData() {
      // return this.$refs.subForm?.exportGetFormData();
      return this.formDataArr;
    },

    getParams() {
      const params = this.getCurFormData();
      return params;
    },
    async handleSubmit() {
      // await this.validateForm();
      const params = this.getParams();
      const adaptiveParams = JSON.parse(JSON.stringify(params));
      console.log(this.formDataArr);
      await postCreateMonitoringJob(adaptiveParams);
      this.goBack();
    },
  },
};
</script>

<style lang="less" scoped>
.create-and-edit {
  display: flex;
  flex-direction: column;
  padding: 20px;
  .form-item-box {
    border: 1px solid #000;
    padding: 20px;
  }
}
</style>
