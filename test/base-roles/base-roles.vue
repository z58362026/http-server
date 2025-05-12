<!--
* @Autor: Modelor
* @Date: 2024-07-25 01:44:41
* @LastEditors: Modelor
* @LastEditTime: 2024-07-25 01:44:41
* @FilePath: \src\view\base\base-roles\base-roles.vue
* @Description: 角色列表
* Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div class="app-container">
    <div>
      <el-form inline @submit.native.prevent>
        <!-- <el-form-item>
          <el-select v-model="serviceName" filterable placeholder="所属平台" clearable style="width: 120px" @change="searchFunc">
            <el-option v-for="item in serviceNameList" :key="item.index" :value="item.key" :label="item.desc" />
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-input
            v-model="name"
            placeholder="请输入角色名称或者描述"
            style="width: 200px;"
            @keyup.enter.native="searchFunc"
          >
            <i slot="suffix" class="el-icon-search" @click="searchFunc"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-allow="'/base/base-roles/add'" type="primary" @click="addRoles"> 新增 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table v-loading-gien="tableLoading" :data="pageBean.rolesData" border stripe>
        <el-table-column prop="name" label="角色名称" show-overflow-tooltip minWidth="190"> </el-table-column>
        <!-- <el-table-column prop="serviceName" label="所属平台" width="120">
          <template v-slot="scoped">
            {{ getLabelByValue(scoped.row.serviceName, serviceNameList, 'key', 'desc') }}
          </template>
        </el-table-column> -->
        <el-table-column prop="description" label="描述" width="180" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="status" label="状态" width="180" show-overflow-tooltip>
          <template v-slot="scoped">
            <span v-if="scoped.row.status == 1">使用中</span>
            <span v-if="scoped.row.status == 0">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建者" width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="created" label="创建时间" width="180"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template v-slot="scoped">
            <el-button v-allow="'/base/base-roles/edit'" type="text" @click="editRoles(scoped.row)"> 编辑 </el-button>
            <el-button v-allow="'/base/base-roles/authorize'" type="text" @click="author(scoped.row)"> 授权 </el-button>
            <el-button
              v-allow="'/base/base-roles/delete'"
              type="text"
              class="errorColor"
              @click="deleteRoles(scoped.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="pageBean.total != 0"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageBean.pageSize"
        :current-page="pageBean.current"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageBean.total"
        @size-change="pageSizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <!-- 新增和编辑弹窗 -->
    <div>
      <el-dialog :visible.sync="addAndEditModal" :title="addAndEditName" width="500px">
        <div slot="footer">
          <el-button @click="addAndEditModal = false"> 取消 </el-button>
          <el-button type="primary" :loading="loading" @click="sureClose"> 确定 </el-button>
        </div>
        <add-and-edit-roles
          v-if="addAndEditModal"
          ref="addAndEditRoles"
          :service-name-list="serviceNameList"
          :is-disabled="!flag"
          :edit-form="editForm"
          :status-list="statusList"
        />
      </el-dialog>
    </div>
    <authorization
      v-if="authorizationModel"
      :cancelCreated="cancelCreated"
      :authorizationData="authorizationData"
      @cancelCreated="cancelCreated"
      @okCreated="okCreated"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import addAndEditRoles from './components/addAndEditRoles.vue';
import { getLabelByValue } from '@/util/util';
import authorization from './components/authorization.vue';
import { delRoleById, saveRole, editRole, getServiceName, selectRoleList } from '@/api/base/base-role';

export default {
  components: {
    addAndEditRoles,
    authorization,
  },
  data() {
    return {
      authorizationModel: false,
      authorizationData: {},
      loading: false,
      getLabelByValue,
      serviceNameList: [],
      serviceName: '',
      name: '',
      pageBean: { current: 1, pageSize: 10, total: 0, rolesData: [] },
      tableLoading: true,
      statusList: [
        { value: '1', label: '使用中', name: '使用中' },
        { value: '0', label: '禁用', name: '禁用' },
      ],
      // 新增编辑弹窗
      addAndEditModal: false,
      addAndEditName: '',
      flag: true, // 判断弹窗是新增还是编辑弹窗,true为新增 false为编辑,且编辑时所属项目不可修改
      editForm: {},
    };
  },
  watch: {
    name(value) {
      if (!value) {
        this.getRoleList();
      }
    },
  },
  mounted() {
    this.getRoleList();
    this.getSelectServiceName();
  },
  methods: {
    searchFunc() {
      this.pageBean.current = 1;
      this.pageBean.pageSize = 10;
      this.getRoleList();
    },
    cancelCreated() {
      this.authorizationModel = false;
    },
    okCreated() {
      this.authorizationModel = false;
    },
    // 获取列表事件
    getRoleList() {
      this.tableLoading = true;
      let data = {
        current: this.pageBean.current,
        pageSize: this.pageBean.pageSize,
        name: this.name,
        serviceName: this.serviceName,
      };
      selectRoleList(data).then((res) => {
        if (res && res.data.status === '200') {
          this.pageBean.rolesData = res.data.data;
          this.pageBean.total = Number(res.data.total);
        }
        this.tableLoading = false;
      });
    },
    // 选择平台类型
    getSelectServiceName() {
      getServiceName().then((res) => {
        if (res && res.data.status === '200') {
          this.serviceNameList = res.data.data;
        }
      });
    },
    // 翻页事件
    currentChange(current) {
      this.pageBean.current = current;
      this.getRoleList();
    },
    // 每页显示数据条数下拉框改变事件
    pageSizeChange(pageSize) {
      this.pageBean.pageSize = pageSize;
      this.getRoleList();
    },
    // 点击添加按钮
    addRoles() {
      this.addAndEditModal = true;
      this.addAndEditName = '添加';
      this.flag = true;
    },
    // 点击编辑按钮
    editRoles(row) {
      this.addAndEditModal = true;
      this.addAndEditName = '编辑';
      this.flag = false;
      this.editForm = row;
    },
    // 点击删除按钮
    deleteRoles(row) {
      this.$confirm(`确定删除"${row.name}"吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            delRoleById(row.id).then((res) => {
              if (res.data.status == 200) {
                this.$message.success(res.data.message);
                this.getRoleList();
                done();
              }
              setTimeout(() => {
                instance.confirmButtonLoading = false; //loading关闭，防止重复点击
              }, 500);
            });
          } else {
            done();
          }
        },
      });
    },
    author(row) {
      this.authorizationData = row;
      this.authorizationModel = true;
    },
    // 新增编辑确定按钮
    sureClose() {
      let { valid, rolesForm } = this.$refs.addAndEditRoles.getRolesForm();
      // 通过校验
      if (valid) {
        this.loading = true;
        // 新增
        if (this.flag) {
          saveRole(rolesForm).then((res) => {
            if (res.data.status == '200') {
              this.addAndEditModal = false;
              this.$message.success(res.data.message);
              this.getRoleList();
            }
            this.loading = false;
          });
        } else {
          rolesForm.id = this.editForm.id;
          editRole(rolesForm).then((res) => {
            if (res.data.status == '200') {
              this.addAndEditModal = false;
              this.$message.success(res.data.message);
              this.getRoleList();
            }
            this.loading = false;
          });
        }
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
