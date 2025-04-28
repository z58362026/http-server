<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-16 10:35:24
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-25 16:17:11
 * @FilePath: /zdjx-cmmp/src/views/monitoring/create-and-edit/Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="create-and-edit">
    <el-page-header @back="goBack" content="编辑监控任务"> </el-page-header>
    <div style="flex: 1; margin-top: 20px" v-if="isReady">
      <component
        :is="formComponent"
        :isModel="formData.jobType == 1"
        :info="info"
        :formData="formData"
        isEdit
        ref="form"
      />
    </div>
    <custom-footer @cancel="handleCancel" @submit="handleSubmit"></custom-footer>
  </div>
</template>

<script>
import { getMonitoringDetail, postEditMonitoringJob } from '@/api/monitoring';
import CustomFooter from '../components/custom-footer.vue';
import FormJob from './components/FormJob.vue';
import FormItemData from './components/FormItemData.vue';
import FormItemModel from './components/FormItemModel.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    CustomFooter,
    FormJob,
  },
  data() {
    return {
      id: '',
      isReady: false,
      info: {},
      activeName: '',

      formData: {
        modelType: '',
        modelVersion: '',
        modelInstance: '',
        monitorName: '',
        jobType: '',
        dbName: '',
        tableName: '',
        warnNoticeType: '',
        warnNotifier: '',
        inferenceExpress: '',
        transactionExpress: '',
        monitorComputeField: [],
        ifWarn: 0,
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
      },
      rules: {
        jobType: [{ required: true, message: '请选择', trigger: 'change' }],
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
      return this.info.modelType == 1 ? '模型' : '数据';
    },
    formComponent() {
      return this.formData.jobType == 1 ? FormItemModel : FormItemData;
    },
  },
  async created() {
    await this.initAll();
    this.id = this.$route.query.id;
    this.id && (await this.getMonitoringDetail());
    this.isReady = true;
  },
  methods: {
    ...mapActions('monitoring', ['initAll']),

    async getMonitoringDetail() {
      const data = await getMonitoringDetail(this.id);
      this.info = data;
      this.initFormData();
    },

    initFormData() {
      Object.keys(this.formData).forEach((key) => {
        if (this.info[key] !== undefined) {
          this.formData[key] = this.info[key];
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    handleCancel() {
      this.goBack();
    },
    // 当前表单校验
    validateCurForm() {
      return this.$refs.form.exportValidate();
    },
    // 获取当前表单数据
    getCurFormData() {
      return this.$refs.form.exportGetFormData();
    },

    getParams() {
      const params = this.getCurFormData();
      return params;
    },
    async handleSubmit() {
      // await this.validateCurForm();
      const params = this.getParams();
      const adaptiveParams = JSON.parse(JSON.stringify(params));

      adaptiveParams.id = this.id;
      await postEditMonitoringJob(adaptiveParams);

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
