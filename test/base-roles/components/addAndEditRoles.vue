<!--
* @Autor: Modelor
* @Date: 2024-07-25 01:44:57
* @LastEditors: Modelor
* @LastEditTime: 2024-07-25 01:44:57
* @FilePath: \src\view\base\base-roles\components\addAndEditRoles.vue
* @Description: 新增角色
* Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div>
    <el-form ref="rolesForm" :model="rolesForm" :rules="rolesFormRules" label-width="110px" @submit.native.prevent>
      <!-- <el-form-item label="所属平台:" prop="serviceName">
        <el-select v-model="rolesForm.serviceName" filterable placeholder="请选择" style="width: 300px" :disabled="isDisabled">
          <el-option v-for="item in serviceNameList" :key="item.index" :value="item.key" :label="item.desc" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="角色名称:" prop="name">
        <el-input v-model="rolesForm.name" placeholder="大小写字母、数字、中文、英文符号" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="描述:" prop="description">
        <el-input v-model="rolesForm.description" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-select v-model="rolesForm.status" filterable placeholder="请选择" style="width: 100px;">
          <el-option v-for="(item, index) in statusList" :key="index" :value="item.value" :label="item.name" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // 所属项目列表
    serviceNameList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 所属项目是否可以编辑
    isDisabled: {
      type: Boolean,
      default: false,
    },
    // 编辑时form的值
    editForm: {
      type: Object,
      default: () => {
        return {};
      },
    },
    statusList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      rolesForm: {
        serviceName: '',
        name: '',
        description: '',
        status: '1',
      },
      rolesFormRules: {
        serviceName: [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value == '' || value === undefined) {
                return callback(new Error('请选择所属平台'));
              } else if (!/^\S*$/.test(value)) {
                return callback(new Error('名称不能包含空格'));
              } else if (value.length > 200) {
                return callback(new Error('最大长度不能超过200'));
              } else {
                return callback();
              }
            },
          },
        ],
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              let rug = /^[A-Za-z0-9_\u4e00-\u9fa5!~@#$%^&*()+-={};:'",<.>?\u002f\u007c\u005c\u005f\u005b\u005d\u0060]+$/;
              if (value == '' || value === undefined) {
                return callback(new Error('请输入角色名称'));
              } else if (!rug.test(value)) {
                return callback(new Error('角色名称只能包含:大小写字母、数字、中文、英文符号'));
              } else if (!/^\S*$/.test(value)) {
                return callback(new Error('角色名称不能包含空格'));
              } else if (value.length > 50) {
                return callback(new Error('最大长度不能超过50'));
              } else {
                return callback();
              }
            },
          },
        ],
        description: [
          {
            required: false,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value == '' || value === undefined) {
                return callback();
              } else if (!/^\S*$/.test(value)) {
                return callback(new Error('描述不能包含空格'));
              } else if (value.length > 200) {
                return callback(new Error('最大长度不能超过200'));
              } else {
                return callback();
              }
            },
          },
        ],
      },
    };
  },
  watch: {
    'rolesForm.name'(value) {
      if (!this.isDisabled) {
        this.rolesForm.description = value;
      }
    },
  },
  created() {
    // 编辑时赋值
    if (this.isDisabled) {
      for (let key in this.rolesForm) {
        this.rolesForm[key] = this.editForm[key];
      }
    }
  },
  methods: {
    getRolesForm() {
      let isValid;
      this.$refs.rolesForm.validate((valid) => {
        isValid = valid;
      });
      return {
        valid: isValid,
        rolesForm: this.rolesForm,
      };
    },
  },
};
</script>

<style></style>
