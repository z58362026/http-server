<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-10-30 18:07:47
 * @LastEditTime: 2025-04-25 15:51:35
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/view/data/data-administration-new/structured/components/form-first.vue
 * @Desc: 创建数据集
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div class="form-first">
    <el-form ref="form" :model="formData" :rules="rules" label-width="180px">
      <!-- 编辑详情 -->
      <FormEditDetail v-if="isEdit" :info="info" />
      <!-- 数据模型和数据质量差异化 -->
      <template v-else>
        <el-row>
          <el-col :span="10">
            <el-form-item label="监控任务名称：" prop="monitorName" required>
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
          <el-col :span="8">
            <el-form-item label="选择监控数据源：" prop="dbName" required>
              <el-select v-model="formData.dbName" placeholder="请选择数据源" @change="handleChangeDbName">
                <el-option
                  v-for="(item, index) in dbNameOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <!-- 通用性表单项-->
      <FormCommon ref="subFormCommon" :formData="formData" />
      <!-- 数据模型和数据质量差异化 -->
      <el-form-item label="监控计算字段：" prop="monitorComputeField" required>
        <el-select v-model="formData.monitorComputeField" placeholder="请选择" @change="handleChangeTableName" multiple>
          <el-option
            v-for="(item, index) in monitorComputeFieldOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 告警配置 -->
      <FormWarning ref="subFormWarning" :formData="formData" />
    </el-form>
  </div>
</template>

<script>
import {
  getDataSourceConfig,
  getDataSourceTableConfig,
  getDataSourceFieldConfig,
  checkMonitoringJobName,
} from '@/api/monitoring-create';
import { mapState } from 'vuex';
import FormWarning from './FormWarning.vue';
import FormEditDetail from './FormEditDetail.vue';
import FormCommon from './FormCommon.vue';
export default {
  components: {
    FormWarning,
    FormEditDetail,
    FormCommon,
  },

  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    formData: {
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
      warnNoticeTypeOptions: [
        { label: '邮件', value: 1 },
        { label: '信随行', value: 2 },
      ],
      monitorComputeFieldOptions: [],
      tableNameOptions: [],
      // standardOptions: [],
      dbNameOptions: [],

      rules: {
        monitorName: [
          { required: true, message: '请选择', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' },
        ],
        dbName: [{ required: true, message: '请选择', trigger: 'blur' }],
        tableName: [{ required: true, message: '请选择', trigger: 'blur' }],
      },
    };
  },
  computed: {
    ...mapState('monitoring', ['jobTypeOptions']),

    modelInfo() {
      return this.modelInstanceOptions.find((item) => item.instanceId == this.formData.modelInstance) || {};
    },
    modelTypeName() {
      // TODO 需要根据码表做
      return this.modelInfo?.modelType;
    },
  },

  async created() {},
  methods: {
    initFormData() {
      // TODO 测试使用
      this.monitorComputeFieldOptions = this.jobTypeOptions.find((item) => item.value == this.formData.jobType)?.list;
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
      this.monitorComputeFieldOptions = res.data;
    },

    async handleChangeDbName() {
      this.tableNameOptions = [];
      this.formData.conditions = [
        {
          branches: [{ standard: '', condition: '', threshold: '', id: Math.floor(Math.random() * 100000) }],
        },
      ];
      this.monitorComputeFieldOptions = [];
      this.getDataSourceTableConfig();
    },
    async handleChangeTableName() {
      this.formData.conditions = [
        {
          branches: [{ standard: '', condition: '', threshold: '', id: Math.floor(Math.random() * 100000) }],
        },
      ];
      this.monitorComputeFieldOptions = [];
      this.getDataSourceFieldConfig();
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
      const tasks = [
        this.$refs.subFormCommon?.exportValidate(),
        this.$refs.subFormWarning?.exportValidate(),
        this.validateCurForm(),
      ];
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
