<template>
  <el-form ref="baseInfoForm" class="base-info" label-width="140px" label-suffix=":">
    <el-form-item label="" class="baseInfo-avatar">
      <el-image class="baseInfo-avatar-image" :src="baseInfoForm.userImgUrl || myImage" />
    </el-form-item>
    <el-form-item label="账户名">
      {{ baseInfoForm.userName }}
    </el-form-item>
    <el-form-item label="真实姓名">
      {{ baseInfoForm.userRealname }}
    </el-form-item>
    <el-form-item label="邮箱">
      {{ baseInfoForm.userEmail }}
    </el-form-item>
    <el-form-item label="手机号">
      {{ baseInfoForm.userIphone }}
    </el-form-item>
  </el-form>
</template>

<script>
import { defaultUserHeaderImage } from '@upgrade/common/config';

export default {
  props: {
    baseInfoForm: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      myImage: defaultUserHeaderImage,
    };
  },
};
</script>

<style lang="less" scoped>
.base-info {
  .baseInfo-avatar {
    display: flex;
    justify-content: center;

    ::v-deep .el-form-item__content {
      margin-left: 0 !important;

      .baseInfo-avatar-image {
        width: 100px;
        height: 100px;
        border-radius: 100%;
      }
    }
  }
}
</style>
