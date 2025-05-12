<!--
* @Autor: Modelor
* @Date: 2024-07-25 01:44:41
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2024-11-13 09:53:20
 * @FilePath: /modelmagic-ui/src/view/base/base-source/base-source.vue
* @Description: 资源列表
* Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div class="app-container">
    <div class="app-form">
      <el-form :inline="true">
        <el-form-item>
          <el-input
            v-model="queryForm.name"
            clearable
            placeholder="请输入菜单名称"
            style="width: 200px;"
            @keyup.enter.native="getResourceList(1)"
          >
            <i slot="suffix" class="el-icon-search" @click="getResourceList(1)"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="queryForm.url"
            clearable
            placeholder="请输入路由地址"
            style="width: 200px;"
            @keyup.enter.native="getResourceList(1)"
          >
            <i slot="suffix" class="el-icon-search" @click="getResourceList(1)"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="queryForm.pagePath"
            clearable
            placeholder="请输入页面路径"
            style="width: 200px;"
            @keyup.enter.native="getResourceList(1)"
          >
            <i slot="suffix" class="el-icon-search" @click="getResourceList(1)"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="queryForm.actionUrl"
            clearable
            placeholder="请输入权限标识"
            style="width: 200px;"
            @keyup.enter.native="getResourceList(1)"
          >
            <i slot="suffix" class="el-icon-search" @click="getResourceList(1)"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="queryForm.status"
            clearable
            filterable
            placeholder="请选择状态"
            style="width: 200px;"
            @change="getResourceList(1)"
          >
            <el-option v-for="item in sourceStatusOption" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        <el-button v-allow="'/base/base-source/add'" type="primary" @click="addSource"> 添加菜单 </el-button>
      </div>
    </div>
    <!-- 默认展开所有配置：default-expand-all -->
    <el-table
      v-loading-gien="tableLoading"
      :data="pageBean.sourceData"
      border
      stripe
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <template slot="empty">
        <el-empty :image="`${$g.publicPrefix}resource/images/others/no-data.png`"></el-empty>
      </template>
      <el-table-column prop="name" label="菜单名称" show-overflow-tooltip minWidth="180"> </el-table-column>
      <!-- <el-table-column prop="url" label="路由地址" width="200"> </el-table-column> -->
      <!-- <el-table-column prop="pagePath" label="页面路径" width="200"> </el-table-column> -->
      <!-- <el-table-column prop="actionUrl" label="权限标识" width="200"> </el-table-column> -->
      <el-table-column prop="seq" label="排序" width="80"> </el-table-column>
      <el-table-column prop="type" label="类型" width="100">
        <template v-slot="scope">
          {{ getLabelByValue(scope.row.type, typeList, 'value', 'label') }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="'1'"
            :inactive-value="'0'"
            @change="statusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="createBy" label="创建人" width="120" show-overflow-tooltip> </el-table-column> -->
      <!-- <el-table-column prop="created" label="创建时间" width="180"> </el-table-column> -->
      <el-table-column prop="updateBy" label="更新人" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="updated" label="更新时间" width="180"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="160" align="center">
        <template v-slot="scoped">
          <el-button type="text" v-allow="'/base/base-source/add'" @click="addSource(scoped.row)"> 添加 </el-button>
          <el-button type="text" v-allow="'/base/base-source/edit'" @click="editSource(scoped.row)">编辑 </el-button>
          <el-button
            type="text"
            v-allow="'/base/base-source/delete'"
            class="errorColor"
            @click="deleteSource(scoped.row)"
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
    <!--新建、编辑弹窗-->
    <addEdit
      v-if="addAndEditModal"
      :title="addAndEditName"
      :edit-form="editForm"
      @closed="addAndEditModal = false"
      @confirmFunc="getResourceList"
    ></addEdit>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getLabelByValue } from '@/util/util.js';
import addEdit from './components/addEdit.vue';
import { sourceStatusOption } from '@/util/option-base';

export default {
  components: {
    addEdit,
  },
  data() {
    return {
      loading: false,
      name: '',
      pageBean: { current: 1, pageSize: 10, total: 0, sourceData: [] },
      typeList: [
        { value: '1', label: '菜单' },
        { value: '0', label: '按钮' },
        { value: '2', label: '页面' },
      ],
      getLabelByValue,
      addAndEditModal: false,
      addAndEditName: '',
      editForm: {},
      queryForm: {
        name: '',
        url: '',
        pagePath: '',
        status: '',
        actionUrl: '',
      },

      sourceStatusOption: sourceStatusOption, //状态选型数据
      tableLoading: false, //loading标志
    };
  },
  watch: {
    name(value) {
      if (value === '') {
        this.getResourceList(1);
      }
    },
  },
  mounted() {
    this.getResourceList();
  },
  methods: {
    ...mapActions(['queryResource', 'enableOrDisableResource', 'addResource', 'editResource', 'delResourceById']),
    // 查询资源列表
    getResourceList(searCurrent) {
      this.tableLoading = true;
      this.pageBean.current = searCurrent ? searCurrent : this.pageBean.current;
      let data = {
        current: this.pageBean.current,
        pageSize: this.pageBean.pageSize,
        ...this.queryForm,
      };
      this.queryResource(data).then((res) => {
        this.tableLoading = false;
        if (res && res.status === '200') {
          this.pageBean.sourceData = res.data;
          this.pageBean.total = Number(res.total);
        }
      });
    },
    // 翻页事件
    currentChange(current) {
      this.pageBean.current = current;
      this.getResourceList();
    },
    // 每页显示数据条数下拉框改变事件
    pageSizeChange(pageSize) {
      this.pageBean.pageSize = pageSize;
      this.getResourceList();
    },
    // 改变状态
    statusChange(row) {
      let data = {
        id: row.id,
        status: row.status,
      };
      this.enableOrDisableResource(data).then((res) => {
        if (res && res.status == '200') {
          this.$message.info(res.message);
        } else if (res && res.status != '200') {
          this.$message.error(res.message);
        }
        this.getResourceList();
      });
    },
    // 点击添加按钮
    addSource(row) {
      this.addAndEditModal = true;
      this.addAndEditName = '添加';
      this.editForm = {};
      if (row) {
        //点击每一行的添加时设为父级菜单
        this.editForm.pid = row.id;
      }
    },
    // 点击编辑按钮
    editSource(row) {
      this.addAndEditModal = true;
      this.addAndEditName = '编辑';
      this.editForm = row;
    },
    // 删除
    deleteSource(row) {
      this.$confirm('删除后不可恢复，你确定删除所选择菜单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            this.delResourceById({ ids: [row.id] }).then((res) => {
              if (res && res.status == '200') {
                this.$message.info(res.message);
                this.getResourceList();
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
  },
};
</script>

<style scoped lang="less"></style>
