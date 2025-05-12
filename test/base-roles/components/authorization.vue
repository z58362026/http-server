<!--
* @Autor: Modelor
* @Date: 2024-07-25 01:44:57
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2024-12-20 08:59:42
 * @FilePath: /modelmagic-ui/src/view/base/base-roles/components/authorization.vue
* @Description: 授权
* Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div>
    <Modal v-model="createData" width="700" title="授权" :styles="{ top: '20px' }" @on-visible-change="onVisibleChange">
      <el-tree
        :data="data"
        :empty-text="emptyText"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        :default-checked-keys="selectRoleList"
        :default-expanded-keys="defaultExpansion"
        @check="getCheck"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node1">
          <template v-if="data.type == 1">
            <i class="el el-icon-folder-add" style="color: #15ad2c; margin-right: 6px;"></i>
            <span>{{ node.label + '【菜单】' }} </span>
          </template>
          <template v-else-if="data.type == 2">
            <i class="el el-icon-folder-remove" style="color: #fa8015; margin-right: 6px;"></i>
            <span>{{ node.label + '【页面】' }} </span>
          </template>
          <template v-else>
            <i class="el el-icon-setting" style="color: #d70016; margin-right: 6px;"></i>
            <span>{{ node.label + '【按钮】' }} </span>
          </template>
        </span>
      </el-tree>
      <div slot="footer">
        <Button @click="cancelSelect"> 取消 </Button>
        <Button type="primary" :loading="loading" @click="okSelect"> 确定 </Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  props: {
    authorizationData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
      createData: true,
      data: [],
      defaultExpansion: [''], //默认展开的节点
      selectRoleList: [], // 选中的id
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      emptyText: '数据正在加载中···',
      halfCheckedKeys: [],
    };
  },
  created() {
    this.getSelectRoleRes();
  },
  methods: {
    ...mapActions(['selectRoleRes', 'saveResByRoleId']),
    //选中节点
    getCheck(data, all) {
      if (all?.checkedKeys?.length) {
        // this.selectRoleList = [];
        // a.checkedKeys.forEach((item) => {
        //   //避免重复添加
        //   if (this.selectRoleList.indexOf(item) < 0) {
        //     this.selectRoleList.push(item);
        //   }
        // });
        this.halfCheckedKeys = all.halfCheckedKeys;
        this.selectRoleList = [...new Set(all.checkedKeys)];
      }
    },
    // 获取该角色下选中的资源
    getSelectRoleRes() {
      // TODO 这里逻辑有问题
      if (this.authorizationData.id) {
        this.selectRoleRes(this.authorizationData.id).then((res) => {
          if (res && res.status == '200') {
            if (!res.data || res.data.length == 0) {
              this.emptyText = '暂无数据';
            }
            this.data = res.data; // 为权限树赋值
            this.defaultExpansion = res.data.map((item) => item.id); //默认展开一级节点
            // 获取所有已选择节点
            let tempArry = [];
            this.getAllChild(this.data, tempArry);
            this.selectRoleList = tempArry;
          } else if (res && res.status != '200') {
            this.$message.error(res.message);
          }
        });
      }
    },
    // 递归获取所有已选中节点
    getAllChild(data, tempArry) {
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i] && data[i].select) {
            tempArry.push(data[i].id);
          }
          if (data[i] && data[i].children && data[i].children.length > 0) {
            this.getAllChild(data[i].children, tempArry);
          }
        }
      }
    },
    // 取消
    cancelSelect() {
      this.createData = false;
      this.$emit('cancelCreated', 'cancelCreated');
    },
    // 确定
    okSelect() {
      this.loading = true;
      let data = {
        roleId: this.authorizationData.id,
        resourceIds: this.selectRoleList.concat(this.halfCheckedKeys),
      };
      this.saveResByRoleId(data).then((res) => {
        if (res && res.status == '200') {
          this.$message.success(res.message);
          this.createData = false;
          this.$emit('okCreated', 'okCreated');
        } else if (res && res.status != '200') {
          this.$message.error(res.message);
        }
        this.loading = false;
      });
    },
    //弹窗打开关闭
    onVisibleChange(val) {
      if (!val) {
        this.createData = false;
        this.$emit('cancelCreated', 'cancelCreated');
      }
    },
  },
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  width: 90%;
}
.custom-tree-node {
  display: flex;
}
</style>
