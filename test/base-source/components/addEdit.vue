<!--
* @Autor: Modelor
* @Date: 2024-07-25 01:44:58
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2024-12-17 15:48:56
 * @FilePath: /modelmagic-ui/src/view/base/base-source/components/addEdit.vue
* @Description: 菜单新增编辑
* Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div>
    <el-dialog :title="title" :visible.sync="showAddAuth" width="600px" :close-on-click-modal="false" @closed="closed">
      <el-form ref="addEditForm" label-width="130px" :model="addEditForm" :rules="rules">
        <el-form-item label="父级菜单" prop="pid">
          <el-cascader
            v-model="addEditForm.pid"
            :options="cascaderList"
            :props="{ checkStrictly: true }"
            clearable
            filterable
            placeholder="请选择父级菜单"
            @change="onChangeCascader"
            style="width: 360px;"
          />
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="addEditForm.name" clearable style="width: 360px;" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="addEditForm.status" clearable style="width: 360px;">
            <el-option v-for="(item, index) in statusList" :key="index" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <template slot="label">
            类型
            <el-tooltip
              effect="dark"
              content="1-菜单:指显示在菜单列表的菜单,可以是单纯的菜单或者页面;
              2-页面:指不在菜单列表显示的页面;
              0-按钮:指页面中的可点击的按钮"
              placement="top"
            >
              <i class="el-icon-info" />
            </el-tooltip>
          </template>
          <el-radio-group v-model="addEditForm.type" disabled v-if="addEditForm.id != ''">
            <el-radio label="1">菜单</el-radio>
            <el-radio label="2">页面</el-radio>
            <el-radio label="0">按钮</el-radio>
          </el-radio-group>
          <el-radio-group v-model="addEditForm.type" v-if="addEditForm.id == ''">
            <el-radio label="1">菜单</el-radio>
            <el-radio label="2">页面</el-radio>
            <el-radio label="0">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="seq" v-if="addEditForm.type == '1'">
          <el-input v-model="addEditForm.seq" clearable style="width: 360px;" placeholder="同级菜单排序生效,如2" />
        </el-form-item>
        <el-form-item label="图标" prop="icon" v-if="addEditForm.type == '1'">
          <el-select v-model="addEditForm.icon" filterable clearable style="width: 320px;">
            <el-option v-for="(item, index) in iconList" :key="index" :value="item" :label="item">
              <span style="float: left;">
                <i :class="item" />
              </span>
              <span style="float: right; color: #8492a6; font-size: 14px;">{{ item }}</span>
            </el-option>
          </el-select>
          <span style="margin-left: 10px;">
            <i :class="addEditForm.icon" style="font-size: 24px;" />
          </span>
        </el-form-item>
        <el-form-item label="路由地址" prop="url" v-if="addEditForm.type != '0'">
          <el-input
            v-model="addEditForm.url"
            clearable
            style="width: 360px;"
            placeholder="访问页面的vue路由,如/base/base-user"
          />
        </el-form-item>
        <!-- <el-form-item label="页面路径" prop="pagePath" v-if="addEditForm.type != '0'">
          <el-input
            v-model="addEditForm.pagePath"
            clearable
            style="width: 360px"
            placeholder="vue页面的相对路径,如/view/base/user/index.vue"
          />
        </el-form-item> -->
        <!-- <el-form-item label="组件名称" prop="componentName" v-if="addEditForm.type != '0'">
          <el-input
            v-model="addEditForm.componentName"
            clearable
            style="width: 360px"
            placeholder="页面组件名称,如base-user"
          />
        </el-form-item> -->
        <el-form-item label="高亮显示菜单地址" prop="activeMenu" v-if="addEditForm.type != '0'">
          <el-input
            v-model="addEditForm.activeMenu"
            clearable
            style="width: 360px;"
            placeholder="高亮显示菜单地址,如/base/base-user"
          />
        </el-form-item>
        <!-- <el-form-item label="高亮显示菜单地址" prop="activeMenu" v-if="addEditForm.type != '0'">
          <el-input
            v-model="addEditForm.activeMenu"
            clearable
            style="width: 360px"
            placeholder="高亮显示菜单地址,如/base/base-user"
          />
        </el-form-item> -->
        <el-form-item label="权限标识" prop="actionUrl" v-if="addEditForm.type == '0'">
          <el-input
            v-model="addEditForm.actionUrl"
            clearable
            style="width: 360px;"
            placeholder="按钮权限标识,如/lcy/base-source/add"
          />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="showAddAuth = false">取消</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="confirmFunc">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { sourceStatusOption } from '@/util/option-base';
import { iconOptions } from '@/option/icon-option';
import { queryResource } from '@/api/base/base-source.js';
import { convertCascaderTree } from '@/util/util';

export default {
  props: {
    //标题
    title: {
      type: String,
      default: '添加菜单',
    },
    editForm: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {},
  data() {
    return {
      iconList: iconOptions,
      statusList: sourceStatusOption, //状态选型数据
      showAddAuth: true,
      addEditForm: {
        pid: '',
        id: '',
        name: '',
        type: '1',
        status: '1',
        seq: '',
        icon: '',
        url: '',
        pagePath: '',
        componentName: '',
        activeMenu: '',
        actionUrl: '',
      },
      cascaderList: [], //父级菜单数据
      //表单校验规则
      rules: {
        //pid: [{ required: true, message: '请选择父级菜单', trigger: 'change' }],
        name: [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value == '' || value === undefined) {
                return callback(new Error('请输入菜单名称'));
              } else if (!/^\S*$/.test(value)) {
                return callback(new Error('菜单名称不能包含空格'));
              } else if (value.length > 50) {
                return callback(new Error('最大长度不能超过50'));
              } else {
                return callback();
              }
            },
          },
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        url: [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (!/^\S*$/.test(value)) {
                return callback(new Error('路由地址不能包含空格'));
              } else if (value.length > 200) {
                return callback(new Error('最大长度不能超过200'));
              } else {
                return callback();
              }
            },
          },
        ],
        seq: [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value && value.length > 50) {
                return callback(new Error('最大长度不能超过50'));
              } else {
                return callback();
              }
            },
          },
        ],
        icon: [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value && value.length > 50) {
                return callback(new Error('最大长度不能超过50'));
              } else {
                return callback();
              }
            },
          },
        ],
        pagePath: [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value && value.length > 255) {
                return callback(new Error('最大长度不能超过255'));
              } else {
                return callback();
              }
            },
          },
        ],
        actionUrl: [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value && value.length > 255) {
                return callback(new Error('最大长度不能超过255'));
              } else {
                return callback();
              }
            },
          },
        ],
        componentName: [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value && value.length > 255) {
                return callback(new Error('最大长度不能超过255'));
              } else {
                return callback();
              }
            },
          },
        ],
        activeMenu: [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value && value.length > 255) {
                return callback(new Error('最大长度不能超过255'));
              } else {
                return callback();
              }
            },
          },
        ],
      },
      confirmLoading: false,
    };
  },

  mounted() {
    // 编辑时重新赋值
    if (this.editForm && this.editForm.id) {
      for (let key in this.addEditForm) {
        this.addEditForm[key] = this.editForm[key];
      }
    }
    // 新增时如果pid有值赋值
    if (this.editForm && this.editForm.pid) {
      this.addEditForm.pid = this.editForm.pid;
    }
    this.getMenuTree(); //获取菜单信息
  },

  methods: {
    ...mapActions(['addResource', 'editResource']),
    //确定
    confirmFunc() {
      this.$refs.addEditForm.validate((valid) => {
        if (valid) {
          this.confirmLoading = true;
          if (this.addEditForm.id) {
            //编辑
            this.editResource(this.addEditForm).then((res) => {
              if (res && res.status == '200') {
                this.$message.success('操作成功');
                this.$emit('closed', true);
                this.$emit('confirmFunc', true);
                //done();
              }
              setTimeout(() => {
                this.confirmLoading = false; //loading关闭，防止重复点击
              }, 500);
            });
          } else {
            //新增
            this.addResource(this.addEditForm).then((res) => {
              if (res && res.status == '200') {
                this.$message.success('操作成功');
                this.$emit('closed', true);
                this.$emit('confirmFunc', true);
                //done();
              }
              setTimeout(() => {
                this.confirmLoading = false; //loading关闭，防止重复点击
              }, 500);
            });
          }
        }
      });
    },

    //获取基本信息
    queryDetailInfo() {
      queryBlackWhite({}, this.id).then((res) => {
        if (res.data.status == '200') {
          let data = res.data.data;
          this.addEditForm.id = data.id;
          this.addEditForm.name = data.name;
          this.addEditForm.type = data.type;
          this.addEditForm.describe = data.describe;
          this.isBindState = data.isBindState;
          if (data.ipList) {
            let ipArray = data.ipList ? data.ipList.split(',') : [];
            this.addEditForm.ipList = ipArray.join('\n');
          }
        }
      });
    },

    //获取菜单树
    getMenuTree() {
      let params = {
        name: '',
      };
      // 获取所有的菜单、页面、按钮列表【 0-按钮，1-菜单，2-页面 】
      queryResource({}).then((res) => {
        if (res.data.status == '200') {
          let map = {
            value: 'id',
            label: 'name',
            children: 'children',
          };
          this.cascaderList = convertCascaderTree(res.data.data, map).map((i) => {
            return Object.assign({}, i, {
              children: (i.children || []).map((c) => this.getChildren(c)),
            });
          });
        }
      });
    },
    //获取子元素
    getChildren(item) {
      if (item.children !== undefined) {
        if (item.children.length === 0) {
          delete item.children;
          return item;
        } else {
          return Object.assign({}, item, {
            children: item.children.map((i) => this.getChildren(i)),
          });
        }
      }
      return item;
    },
    //父级菜单选择后
    onChangeCascader(val) {
      if (val.length == 0) {
        this.addEditForm.pid = null;
      }
      this.addEditForm.pid = val[val.length - 1];
    },

    //弹窗关闭
    closed() {
      this.$emit('closed', true);
    },
  },
};
</script>

<style lang="less" scoped>
.fa {
  font-size: 20px;
}
</style>
