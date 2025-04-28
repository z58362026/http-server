<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-25 09:48:41
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-25 16:16:02
 * @FilePath: /zdjx-cmmp/src/views/monitoring/create-and-edit/components/FormEditDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-row>
      <el-col :span="10">
        <el-form-item label="监控模型："> {{ info.modelName }} </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="模型版本："> {{ info.modelVersion }} </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="模型实例："> {{ info.modelInstance }} </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="模型类型："> {{ info.modelType }} </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="监控任务名："> {{ info.monitorName }} </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="监控类型："> {{ info.monitorType }} </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="监控数据源库名："> {{ info.dbName }} </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="监控数据源表名："> {{ info.tableName }} </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="less" scoped></style>
