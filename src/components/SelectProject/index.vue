<template>
  <div class="select-project">
    <div class="select-project-text" @click="handelSelectedProject">
      <span>{{ text }}</span>
      <span class="clear-btn el-icon-circle-close" @click.stop="handelDelProject"></span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SelectProject',
  components: {},
  computed: {
    ...mapState('app', ['projectId', 'projectName']),
    text() {
      return this.projectName || '未选择项目';
    },
  },
  methods: {
    handelDelProject() {},
    async handelSelectedProject() {
      const res = await this.$dialog.openDialogProjectTable();
      console.log('%c [ res ]-27', 'font-size:13px; background:pink; color:#bf2c9f;', res);
    },
  },
};
</script>

<style lang="less" scoped>
.select-project {
  .select-project-text {
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 32px;
    color: #1d252f;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }

  .clear-btn {
    margin-left: 10px;
  }
}
</style>
