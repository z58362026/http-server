<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-25 09:52:28
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-25 16:46:52
 * @FilePath: /zdjx-cmmp/src/views/monitoring/create-and-edit/components/FormWarning.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="form-warning">
    <el-form ref="form" :model="formData" :rules="rules" label-width="180px">
      <el-form-item label="是否告警：">
        <el-switch v-model="formData.ifWarn" :active-value="1" :inactive-value="0"> </el-switch>
      </el-form-item>
      <template v-if="formData.ifWarn">
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
      </template>
    </el-form>
  </div>
</template>

<script>
import FormCondition from './FormCondition.vue';
export default {
  components: {
    FormCondition,
  },
  props: {
    formData: {
      type: Object,
      default: () => ({}),
    },
    standardOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      warnNoticeTypeOptions: [
        { label: '邮件', value: 1 },
        { label: '信随行', value: 2 },
      ],
      rules: {
        warnNoticeType: [{ required: true, message: '请选择', trigger: 'blur' }],
        warnNotifier: [
          { required: true, message: '请输入', trigger: 'blur' },
          { max: 50, message: '请选择', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    validateCurForm() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve(true);
          }
        });
      });
    },
    exportValidate() {
      const tasks = [this.validateCurForm(), this.$refs.subFormCondition?.map((form) => form.exportValidate())];
      return Promise.all(tasks);
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
  },
};
</script>

<style lang="less" scoped>
.form-warning {
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
</style>
