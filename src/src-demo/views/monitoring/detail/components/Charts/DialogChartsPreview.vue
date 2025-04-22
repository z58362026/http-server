<template>
  <el-dialog width="80%" :visible.sync="visible" title="查看" top="50px" @closed="handleClose">
    <div>
      <slot></slot>
    </div>
    <template #footer>
      <slot name="footer">
        <div class="dialog-footer">
          <el-button size="mini" @click="handleClose"> 取消 </el-button>
          <!-- <el-button size="mini" type="primary" @click="handleConfirm"> 确定 </el-button> -->
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
import { getMonitoringJobLog } from '@/api/monitoring-detail';
export default {
  components: {},
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  created() {},
  methods: {
    async getMonitoringJobLog() {
      // const res = await getMonitoringJobLog(this.id);
      // this.activities = res.data;
    },
    handleClose() {
      this.$emit('close');
    },
    handleConfirm() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped></style>
