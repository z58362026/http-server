<template>
  <el-form
    ref="baseInfoForm"
    class="base-info"
    :model="baseInfoForm"
    :rules="ruleValidate"
    label-width="140px"
    label-suffix=":"
  >
    <el-form-item label="" prop="userImgUrl" class="baseInfo-avatar">
      <el-upload :before-upload="beforeUploadHandler" :disabled="!updateBefore" action="#" accept="image/*">
        <el-image class="baseInfo-avatar-image" :src="baseInfoForm.userImgUrl || myImage" />
        <div class="baseInfo-avatar-info">
          修改头像
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="账户名" prop="userName">
      {{ baseInfoForm.userName }}
    </el-form-item>
    <el-form-item label="真实姓名" prop="userRealName">
      <el-input v-model="baseInfoForm.userRealName" style="width: 250px;" clearable />
    </el-form-item>
    <el-form-item label="邮箱" prop="userEmail">
      <el-input v-model="baseInfoForm.userEmail" style="width: 250px;" clearable />
    </el-form-item>
    <el-form-item label="手机号" prop="userIphone">
      <el-input v-model="baseInfoForm.userIphone" style="width: 250px;" clearable />
    </el-form-item>
  </el-form>
</template>

<script>
import { defaultUserHeaderImage } from '@upgrade/common/config';

export default {
  components: {},
  data() {
    return {
      myImage: defaultUserHeaderImage,
      baseInfoForm: {
        userName: '',
        userRealName: '',
        userEmail: '',
        userIphone: '',
        url: '',
        id: '',
      },
      ruleValidate: {
        userName: [{ required: true, message: '请输入账户名', trigger: 'blur' }],
        userRealName: [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value === '' || value === undefined) {
                callback();
              } else if (value.length > 50) {
                callback(new Error('最大长度不能超过50'));
              } else {
                callback();
              }
            },
          },
        ],
        userEmail: [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              const rug = /^[A-Za-z\d]+([-_.][-AZa-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g;
              if (value === '' || value === undefined) {
                callback();
              } else if (!rug.test(value)) {
                callback(new Error('邮箱格式不正确'));
              } else if (value.length > 200) {
                callback(new Error('最大长度不能超过200'));
              } else {
                callback();
              }
            },
          },
          // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ],
        userIphone: [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              const rug = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
              if (value === '' || value === undefined) {
                callback();
              } else if (!rug.test(value)) {
                callback(new Error('手机号格式不正确'));
              } else if (value.length > 11) {
                callback(new Error('手机号格式不正确'));
              } else {
                callback();
              }
            },
          },
        ],
      },
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

      .baseInfo-avatar-info {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        font-size: 14px;
        color: #fff;
        text-align: center;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
