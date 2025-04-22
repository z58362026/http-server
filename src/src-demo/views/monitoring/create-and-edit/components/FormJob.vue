<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-10-30 18:07:47
 * @LastEditTime: 2025-04-21 15:01:47
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/view/data/data-administration-new/structured/components/form-first.vue
 * @Desc: 创建数据集
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div class="form-first">
    <el-form ref="form" :model="formData" :rules="rules" label-width="150px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="选择监控模型：" prop="modelType" required>
            <el-select v-if="!isEdit" v-model="formData.modelType" placeholder="请选择" @change="handleModelType">
              <el-option
                v-for="(item, index) in modelTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span v-else>{{ info.modlName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="选择模型版本：" prop="modelVersion">
            <el-select v-if="!isEdit" v-model="formData.modelVersion" placeholder="请选择" @change="handleModelVersion">
              <el-option
                v-for="(item, index) in modelVersionOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span v-else>{{ info.modelVersion }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="选择模型实例：" prop="modelInstance" required>
            <el-select v-if="!isEdit" v-model="formData.modelInstance" placeholder="请选择">
              <el-option
                v-for="(item, index) in modelInstanceOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span v-else>{{ info.modelInstance }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="监控任务名称：" prop="monitorName" required>
            <!-- TODO 需要服务端校验重复性 -->
            <el-input
              v-model="formData.monitorName"
              :maxlength="50"
              show-word-limit
              placeholder="请输入监控任务名称"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="选择监控类型：" prop="monitorType" required>
            <el-select v-model="formData.monitorType" placeholder="请选择" @change="handleChangeMonitorType">
              <el-option
                v-for="(item, index) in monitoringTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" v-if="modelTypeName">
          <el-form-item label="模型类别：" prop="monitorType" required> {{ modelTypeName }} </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="监控数据源库名：" prop="dbName" required>
            <el-select v-model="formData.dbName" placeholder="请选择" :disabled="isModel" @change="handleChangeDbName">
              <el-option
                v-for="(item, index) in dbNameOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="监控数据源表名：" prop="tableName" required>
            <el-select
              v-model="formData.tableName"
              placeholder="请选择"
              :disabled="isModel"
              @change="handleChangeTableName"
            >
              <el-option
                v-for="(item, index) in tableNameOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="告警指标列表：" required>
        <div class="alarm-content">
          <div class="or-style" v-if="formData.conditions.length > 1">或</div>
          <div>
            <div
              v-for="(condition, conditionIndex) in formData.conditions"
              :key="conditionIndex"
              class="alarmIndicatorList"
            >
              <div class="alarm-title">
                {{ `条件${conditionIndex + 1}:` }}
              </div>
              <div class="and-style" v-if="condition.branches.length > 1">且</div>
              <div class="branch">
                <FormCondition
                  ref="subFormCondition"
                  class="form-condition"
                  v-for="(branch, branchIndex) in condition.branches"
                  :key="branch.id"
                  :standardOptions="standardOptions"
                  v-model="condition.branches[branchIndex]"
                  :preFormData="formData"
                >
                  <el-button
                    v-if="!(formData.conditions.length == 1 && condition.branches.length == 1)"
                    icon="el-icon-delete"
                    @click="handleDelete(condition, branch, conditionIndex, branch)"
                  ></el-button>
                </FormCondition>
              </div>
              <div class="alarm-button">
                <el-button icon="el-icon-plus" @click="handleAddAnd(condition)">添加且</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="alarm-button-or">
          <el-button icon="el-icon-plus" @click="handleAddOr">添加或</el-button>
        </div>
      </el-form-item>
      <el-row>
        <el-col :span="10">
          <el-form-item label="告警通知方式：" prop="warnNoticeType" required>
            <el-select v-model="formData.warnNoticeType" placeholder="请选择">
              <el-option
                v-for="(item, index) in warnNoticeTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="告警通知人：" prop="warnNotifier" required>
            <el-input
              v-model="formData.warnNotifier"
              :maxlength="50"
              show-word-limit
              placeholder="请输入通知人工号，如0016xxxx"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="告警周期：" required>
        <FormCycleTime ref="subFormCycle" v-model="formData.modelTimer" :preFormData="formData" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FormCondition from './FormCondition.vue';
import FormCycleTime from './FormCycleTime.vue';
import {
  getMonitoringModelConfig,
  getMonitoringModelVersionConfig,
  getMonitoringModelInstanceConfig,
  getDataSourceConfig,
  getDataSourceTableConfig,
  getDataSourceFieldConfig,
  checkMonitoringJobName,
} from '@/api/monitoring-create';
import { mapActions, mapState } from 'vuex';
export default {
  components: {
    FormCondition,
    FormCycleTime,
  },

  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    isEdit: {
      type: Boolean,
    },
  },
  data() {
    const validateName = async (rule, value, callback) => {
      const res = await checkMonitoringJobName({
        name: value,
      });
      if (res.status != '200') {
        callback(new Error(res.message || '名称已存在'));
      } else {
        callback();
      }
    };
    return {
      modelTypeOptions: [],
      modelVersionOptions: [],
      modelInstanceOptions: [],
      // monitoringTypeOptions: [
      //   { label: '模型效果监控', value: 1 },
      //   { label: '数据质量监控', value: 2 },
      // ],
      warnNoticeTypeOptions: [
        { label: '邮件', value: 1 },
        { label: '信随行', value: 2 },
      ],
      tableNameOptions: [],
      standardOptions: [],
      dbNameOptions: [],
      formData: {
        modelType: '',
        modelVersion: '',
        modelInstance: '',
        monitorName: '',
        monitorType: '',
        dbName: '',
        tableName: '',
        warnNoticeType: '',
        warnNotifier: '',
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
        modelType: [{ required: true, message: '请选择', trigger: 'change' }],
        modelVersion: [{ required: true, message: '请选择', trigger: 'change' }],
        modelInstance: [{ required: true, message: '请选择', trigger: 'change' }],
        monitorName: [
          { required: true, message: '请选择', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' },
        ],
        monitorType: [{ required: true, message: '请选择', trigger: 'change' }],
        dbName: [{ required: true, message: '请选择', trigger: 'blur' }],
        tableName: [{ required: true, message: '请选择', trigger: 'blur' }],
        warnNoticeType: [{ required: true, message: '请选择', trigger: 'blur' }],
        warnNotifier: [
          { required: true, message: '请输入', trigger: 'blur' },
          { max: 50, message: '请选择', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapState('monitoring', ['monitoringTypeOptions']),
    // standardOptions() {
    //   return this.monitoringTypeOptions.find((item) => item.value == this.formData.monitorType)?.list;
    // },

    isModel() {
      return this.formData.monitorType == 1;
    },

    modelInfo() {
      return this.modelInstanceOptions.find((item) => item.instanceId == this.formData.modelInstance) || {};
    },
    modelTypeName() {
      // TODO 需要根据码表做
      return this.modelInfo?.modelType;
    },
  },

  async created() {
    this.initFormData();
    await this.initAll();
    // await this.getMonitoringModelConfig();
    // await this.getDataSourceConfig();
  },
  methods: {
    ...mapActions('monitoring', ['initAll']),
    initFormData() {
      // 只初始化 formData 下的字段
      Object.keys(this.formData).forEach((key) => {
        if (this.info[key] !== undefined) {
          this.formData[key] = this.info[key];
        }
      });
      this.standardOptions = this.monitoringTypeOptions.find((item) => item.value == this.formData.monitorType)?.list;
    },

    // 获取监控模型配置
    async getMonitoringModelConfig() {
      const res = await getMonitoringModelConfig();
      this.modelTypeOptions = res.data;
    },
    // 获取监控模型版本配置
    async getMonitoringModelVersionConfig() {
      const res = await getMonitoringModelVersionConfig();
      this.modelVersionOptions = res.data;
    },
    // 获取监控模型实例配置
    async getMonitoringModelInstanceConfig() {
      const res = await getMonitoringModelInstanceConfig();
      this.modelVersionOptions = res.data;
    },
    // 获取数据源库名配置
    async getDataSourceConfig() {
      const res = await getDataSourceConfig();
      this.dbNameOptions = res.data;
    },
    // 获取数据源表名配置
    async getDataSourceTableConfig() {
      const res = await getDataSourceTableConfig();
      this.tableNameOptions = res.data;
    },
    // 获取数据质量字段名配置
    async getDataSourceFieldConfig() {
      const res = await getDataSourceFieldConfig();
      this.standardOptions = res.data;
    },

    async handleChangeDbName() {
      this.tableNameOptions = [];
      this.formData.conditions = [
        {
          branches: [{ standard: '', condition: '', threshold: '', id: Math.floor(Math.random() * 100000) }],
        },
      ];
      this.standardOptions = [];
      this.getDataSourceTableConfig();
    },
    async handleChangeTableName() {
      this.formData.conditions = [
        {
          branches: [{ standard: '', condition: '', threshold: '', id: Math.floor(Math.random() * 100000) }],
        },
      ];
      this.standardOptions = [];
      this.getDataSourceFieldConfig();
    },
    async handleChangeMonitorType() {
      // TODO 暂时打开，切换哪种类型，都可以选择条件
      // if (this.isModel) {
      this.formData.conditions = [
        {
          branches: [{ standard: '', condition: '', threshold: '', id: Math.floor(Math.random() * 100000) }],
        },
      ];
      // TODO 需要获取模型实例的指标
      this.standardOptions = this.monitoringTypeOptions.find((item) => item.value == this.formData.monitorType)?.list;
      // TODO 回显监控数据源库名和表名
      // }
    },
    async handleModelType() {
      this.formData.modelVersion = '';
      this.modelVersionOptions = [];
      this.formData.modelInstance = '';
      this.modelInstanceOptions = [];
      this.getMonitoringModelVersionConfig();
    },
    async handleModelVersion() {
      this.formData.modelInstance = '';
      this.modelInstanceOptions = [];
      this.getMonitoringModelInstanceConfig();
    },
    handleAddAnd(condition) {
      condition.branches.push({ standard: '', condition: '', threshold: '', id: Math.floor(Math.random() * 100000) });
    },
    handleAddOr() {
      this.formData.conditions.push({
        branches: [{ standard: '', condition: '', threshold: '' }],
      });
    },
    handleDelete(condition, branch, conditionIndex, branchIndex) {
      if (condition.branches.length === 1) {
        this.formData.conditions.splice(conditionIndex, 1);
      } else {
        condition.branches.splice(branchIndex, 1);
      }
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
    async exportValidate() {
      const tasks = (this.$refs.subFormCondition || [])?.map((form) => form?.exportValidate());
      tasks.push(this.$refs.subFormCycle?.exportValidate());
      tasks.push(this.validateCurForm());
      return Promise.all(tasks);
    },
    exportGetFormData() {
      return {
        ...this.formData,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.form-first {
  h3 {
    margin-bottom: 20px;
  }
  .alarm-content {
    display: flex;
    height: fit-content;
    .or-style {
      margin-right: 10px;
      display: flex;
      align-items: center;
      &::after {
        content: '';
        border: 1px solid #ddd;
        border-right: 1px solid transparent;
        width: 10px;
        height: 100%;
        margin-left: 10px;
      }
    }
    .alarmIndicatorList {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
      display: flex;
      // align-items: center;
      .alarm-title {
        flex-shrink: 0;
        margin-right: 10px;
        display: flex;
        align-items: center;
      }
      .and-style {
        margin-right: 10px;
        display: flex;
        align-items: center;
        &::after {
          content: '';
          border: 1px solid #ddd;
          border-right: 1px solid transparent;
          width: 10px;
          height: 100%;
          margin-left: 10px;
        }
      }
      .branch {
        display: flex;
        flex-direction: column;
        .form-condition:not(:last-child) {
          margin-bottom: 10px;
        }
      }
      .alarm-button {
        display: flex;
        align-items: center;
      }
    }
  }
  .alarm-button-or {
    margin-top: 10px;
  }
}
::v-deep .el-form-item .el-form-item__content .el-form-item__error {
  position: static;
}
</style>
