<template>
  <BaseDialogBox title="用户基本信息" width="550px">
    <Edit v-if="isEdit" :base-info-form="baseInfoForm" />
    <Detail v-else :base-info-form="baseInfoForm" />
    <template #footer>
      <template v-if="isEdit">
        <el-button size="mini" @click="handleCancel">
          取消
        </el-button>
        <el-button size="mini" type="primary" @click="handleConfirm">
          确认
        </el-button>
      </template>
      <el-button v-else type="primary" size="mini" @click="handleEdit">
        修改
      </el-button>
    </template>
  </BaseDialogBox>
</template>

<script>
export default {
  name: 'BaseInfo',
  components: {
    Detail: () => import('./Detail.vue'),
    Edit: () => import('./Edit.vue'),
  },
  props: {},
  data() {
    return {
      isEdit: false,
      baseInfoForm: {},
    };
  },
  created() {},
  methods: {
    handleEdit() {
      this.isEdit = true;
    },
    handleCancel() {
      this.isEdit = false;
    },
    handleConfirm() {
      this.isEdit = false;
    },
  },
};
</script>

<!-- <style lang="less" scoped></style> -->
