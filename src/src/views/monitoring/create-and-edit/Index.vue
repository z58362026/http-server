<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-16 10:35:24
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-21 15:04:21
 * @FilePath: /zdjx-cmmp/src/views/monitoring/create-and-edit/Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="create-and-edit">
    <el-page-header @back="goBack" :content="title"> </el-page-header>
    <div style="flex: 1; margin-top: 20px" v-if="isReady">
      <FormJob :info="info" :isEdit="isEdit" ref="form" />
    </div>
    <custom-footer @cancel="handleCancel" @submit="handleSubmit"></custom-footer>
  </div>
</template>

<script>
import { getMonitoringDetail, postCreateMonitoringJob, postEditMonitoringJob } from '@/api/monitoring';
import CustomFooter from '../components/custom-footer.vue';
import FormJob from './components/FormJob.vue';
// import { mapActions, mapState } from 'vuex';
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
    };
  },
  computed: {
    // ...mapState('monitoring', ['monitoringTypeOptions']),
    isEdit() {
      return !!this.$route.query.id;
    },
    title() {
      return this.isEdit ? '编辑监控任务' : '创建监控任务';
    },
  },
  async created() {
    // this.initAll();
    this.id = this.$route.query.id;

    this.id && (await this.getMonitoringDetail());
    this.isReady = true;
  },
  methods: {
    async getMonitoringDetail() {
      const data = await getMonitoringDetail(this.id);
      this.info = data;
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

      if (this.isEdit) {
        adaptiveParams.id = this.id;
        await postEditMonitoringJob(adaptiveParams);
      } else {
        await postCreateMonitoringJob(adaptiveParams);
      }
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
}
</style>
