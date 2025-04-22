<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-12-12 11:03:30
 * @LastEditTime: 2024-12-12 13:56:56
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/view/data/data-administration-new/components/custom-descriptions.vue
 * @Desc: 头部注释配置模板
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <div class="custom-descriptions">
    <el-descriptions :column="4" :title="title" class="mt15">
      <el-descriptions-item class="mt15-item" v-for="(item, index) in curList" :key="index" :label="item.label">
        <template v-if="item.type == 'text'">
          <el-input
            v-if="item.selected && item.needEdit"
            v-model="item.value"
            class="info-version-input"
            size="mini"
            ref="input"
            :maxlength="item.maxlength"
            show-word-limit
            :placeholder="item.placeholder || '请输入内容'"
          >
          </el-input>
          <span v-else>{{ item.value }}</span>
          <template v-if="item.needEdit">
            <i v-if="!item.selected" @click="handleEdit(item)" class="el-icon-edit"></i>
            <span v-else class="el-setting" @click="handleEdit(item)">保存</span>
          </template>
        </template>
        <template v-else-if="item.type == 'multipleSelect'">
          <el-select multiple v-if="item.selected && item.needEdit" v-model="item.value" placeholder="请选择">
            <el-option
              v-for="optionItem in (item.options || [])"
              :key="optionItem.id"
              :label="optionItem.label"
              :value="optionItem.value"
            >
            </el-option>
          </el-select>
          <span v-else>{{ item.value.map((i) => item.options.find((v) => v.value === i)?.label)?.join() }}</span>
          <template v-if="item.needEdit">
            <i v-if="!item.selected" @click="handleEdit(item)" class="el-icon-edit"></i>
            <span v-else class="el-setting" @click="handleEdit(item)">保存</span>
          </template>
        </template>
        <template v-else-if="item.type == 'button'">
          <el-button v-if="item.value" :type="item.btnType" plain size="mini">
            {{ item.value }}
          </el-button>
        </template>
        <!-- <template v-else-if="item.type == 'slot'">
          <component :is="item.component" v-bind="item.attrs" v-on="item.listener" />
        </template> -->
        <slot v-else />
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: '',
    },
    // 动态数据
    list: {
      type: Array,
      default: () => [],
    },
    // 基础信息
    info: {
      type: Object,
      default: () => ({}),
    },
    submit: {
      type: Function,
    },
  },
  data() {
    return {
      curList: [],
    };
  },
  watch: {
    list: {
      handler() {
        console.log('watch');

        this.initData();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    initData() {
      this.curList = this.list.map((item) => ({
        ...item,
        selected: false,
      }));
    },
    async handleEdit(item) {
      if (item.selected) {
        this.handleSubmit(item);
        return;
      }
      item.selected = true;
      const index = this.curList.findIndex((i) => i.key == item.key);
      await this.$nextTick();
      this.$refs.input?.[index]?.$el.children?.[0].focus();
    },

    async handleSubmit(item) {
      try {
        this.$emit('submit', item.value, item, this.curList[0].value);
        if (this.submit) {
          await this.submit?.(item.value, item, this.curList[0].value);
        }
        item.selected = false;
      } catch (error) {}
    },
  },
};
</script>

<style lang="less" scoped>
.custom-descriptions {
  .info-version-input {
    width: 88%;
  }
  .el-icon-edit {
    margin-left: 5px;
    color: #4592ff;
    font-size: 14px;
    cursor: pointer;
  }
  .el-setting {
    margin-left: 5px;
    color: #4592ff;
    font-size: 12px;
    cursor: pointer;
    flex-shrink: 0;
    margin-right: 10px;
  }
  .el-descriptions-item__content {
    display: flex;
  }
  .mt15 ::v-deep .el-descriptions__body {
    padding: 12px;
  }
  .mt15 ::v-deep .el-descriptions-item__container {
    line-height: 30px;
  }
  .mt15 ::v-deep .el-descriptions-item__content {
    display: flex;
    align-items: center;
  }
  ::v-deep .el-descriptions__title span:nth-child(1) {
    display: flex;
    justify-content: space-between;
  }
  ::v-deep .el-descriptions__title {
    width: 100%;
  }
  ::v-deep .info-version-input .el-input__inner {
    padding-right: 55px;
  }
}
</style>
