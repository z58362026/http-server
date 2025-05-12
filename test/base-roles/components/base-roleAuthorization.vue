<!--
* @Autor: Modelor
* @Date: 2024-07-25 01:44:57
* @LastEditors: Modelor
* @LastEditTime: 2024-07-25 01:44:57
* @FilePath: \src\view\base\base-roles\components\base-roleAuthorization.vue
* @Description: 授权
* Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div class="app-container">
    <el-page-header content="授权" @back="backFunc" />
    <div v-if="platformResourceForm.service" class="mt15">
      <div>
        <Row class="resource_content">
          <Col span="6" class="resource_content_col">
          <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.native="handleCheckAll">
            {{ platformResourceForm.service }}
          </Checkbox>
          </Col>
          <Col span="18">
          <CheckboxGroup v-model="selectRoleList" @on-change="resChange">
            <Row v-for="(menu, index) in platformResourceForm.resourcesList" :key="index" style="display:flex">
              <Col span="6" class="resource_content_col6">
              <Checkbox :label="menu.id" @click.native="oneCheckAll(menu.id)">
                {{ menu.name }}
              </Checkbox>
              </Col>
              <Col span="18" class="resource_content_col18">
              <CheckboxGroup v-model="selectRoleList" @on-change="resChange">
                <Checkbox v-for="(menuChild,childIndex) in menu.childrenList" :key="childIndex" :label="menuChild.id" @click.native="twoCheckAll(menuChild.id)">
                  {{ menuChild.name }}
                </Checkbox>
              </CheckboxGroup>
              </Col>
            </Row>
          </CheckboxGroup>
          </Col>
        </Row>
      </div>
    </div>
    <div v-if="!platformResourceForm.service" class="center">
      无数据
    </div>
    <div class="center mt15">
      <Button class="mr15" @click="backFunc">
        取消
      </Button>
      <Button type="primary" :loading="loading" :disabled="!platformResourceForm.service" @click="handleSubmit">
        保存
      </Button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BaseRoleAuthorization',
  components: {

  },
  data() {
    return {
      loading: false,
      roleId: '',
      serviceName: '',
      platformResourceForm: {},
      indeterminate: true,
      checkAll: false,
      selectRoleList: [],// 选中的id
      resourceidList: [],// 全部id
    };
  },
  //初始化时接收参数
  created() {
    // 得到当前行的角色信息
    this.roleId = this.$route.query.id;
    this.serviceName = this.$route.query.serviceName;
    this.getPlatformResource();
    this.getSelectRoleRes();
  },
  methods: {
    ...mapActions([
      'platformResource',
      'selectRoleRes',
      'saveResByRoleId',
    ]),
    // 获取该平台下的资源
    getPlatformResource() {
      if (this.serviceName) {
        let data = {
          serviceName: this.serviceName,
        };
        this.platformResource(data).then(res => {
          if (res && res.status == '200') {
            if (res.data[0]) {
              this.platformResourceForm = res.data[0];
              for (let item of this.platformResourceForm.resourcesList) {
                this.resourceidList.push(item.id);
                if (item.childrenList.length > 0) {
                  for (let child of item.childrenList) {
                    this.resourceidList.push(child.id);
                  }
                }
              }
            } else {
              this.platformResourceForm = {};
            }
          } else if (res && res.status != '200') {
            this.$message.error(res.message);
          }
        });
      }
    },
    // 获取该角色下选中的资源
    getSelectRoleRes() {
      if (this.roleId) {
        this.selectRoleRes(this.roleId).then(res => {
          if (res && res.status == '200') {
            this.selectRoleList = res.data;
          } else if (res && res.status != '200') {
            this.$message.error(res.message);
          }
        });
      }
    },
    // 是否全选
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
      if (this.checkAll) {
        this.selectRoleList = this.resourceidList;
      } else {
        this.selectRoleList = [];
      }
    },
    resChange(data) {
      if (data.length === this.resourceidList.length) {
        //全部被勾选
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        //没有全部勾选
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        //一个都没勾选
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    oneCheckAll(id) {
      let data = this.selectRoleList.find(ele => ele == id);
      let ids = [];
      // 获取菜单下的按钮ids以及自身的id
      for (let item of this.platformResourceForm.resourcesList) {
        if (item.id === id) {
          if (item.childrenList.length > 0) {
            for (let child of item.childrenList) {
              ids.push(child.id);
            }
          }
          ids.push(item.id);
        }
      }
      // 判断该菜单是否已选中
      if (data) {
        // 已勾选,去掉该菜单以及子级的选中状态
        for (let id of ids) {
          let index = this.selectRoleList.findIndex(x => x == id);
          if (index >= 0) {
            this.selectRoleList.splice(index, 1);
          }
        }
      } else {
        // 没有勾选时
        this.selectRoleList = this.selectRoleList.concat(ids);
        // 去除重复节点
        this.selectRoleList = Array.from(new Set(this.selectRoleList));
      }
    },
    // 按钮是否选中
    twoCheckAll(id) {
      let isPush = true;
      let index = this.selectRoleList.findIndex(iid => iid == id);
      //无 则添加 有则删除
      if (index > -1) {
        // 删除
        this.selectRoleList.splice(index, 1);
        isPush = false;
      } else {
        this.selectRoleList.push(id);
      }

      for (let item of this.platformResourceForm.resourcesList) {
        if (item.childrenList.length > 0) {
          let parentIndex = -1;
          let isHaveChild = false;
          let isHaveParent = false;
          for (let childId of item.childrenList) {
            let index = this.selectRoleList.findIndex(iid => iid == childId.id);
            parentIndex = this.selectRoleList.findIndex(iid => iid == childId.pid);
            if (index > -1) {
              isHaveChild = true;
              if (parentIndex == -1) {
                this.selectRoleList.push(childId.pid);
              } else {
                isHaveParent = true;
              }
            }
          }
          if (!isHaveChild && !isHaveParent) {
            if (parentIndex > -1) {
              this.selectRoleList.splice(parentIndex, 1);
            }
          }
        }
      }
    },
    // 提交
    handleSubmit() {
      this.loading = true;
      let data = {
        roleId: this.roleId,
        resourceIds: this.selectRoleList,
      };
      this.saveResByRoleId(data).then(res => {
        if (res && res.status == '200') {
          this.$message.info(res.message);
          this.$router.push({
            name: 'base-roles',
          });
        } else if (res && res.status != '200') {
          this.$message.error(res.message);
        }
        this.loading = false;
      });
    },
    //返回
    backFunc() {
      this.$router.push({
        name: 'base-roles',
      });
    },
  },
};
</script>

<style scoped lang="less">
/* 复选框样式 */
.ivu-checkbox-wrapper {
  font-size: 14px;
  color: #5c626d;
  line-height: 42px;
}
.resource_content {
  border-color: #e7ecf6;
  border-width: 1px;
  border-style: solid;
  border-bottom: none;
  display: flex;
}
.resource_content_col {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e7ecf6;
}
.resource_content_col6 {
  border: 1px solid #e7ecf6;
  border-top: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.resource_content_col18 {
  border-bottom: 1px solid #e7ecf6;
}
.resource_content_col18 .ivu-checkbox-wrapper {
  margin-left: 20px;
}
</style>
