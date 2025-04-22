<template>
  <el-dialog :visible.sync="visible" title="查看日志" top="50px" @closed="handleClose">
    <div>
      <el-timeline :reverse="reverse">
        <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
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
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      visible: true,

      reverse: true,
      activities: [
        {
          content: '活动按期开始',
          timestamp: '2018-04-15',
        },
        {
          content: '通过审核',
          timestamp: '2018-04-13',
        },
        {
          content: '创建成功',
          timestamp: '2018-04-11',
        },
      ],
    };
  },
  created() {
    this.getMonitoringJobLog();
  },
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
