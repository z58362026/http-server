<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-10-31 19:21:11
 * @LastEditTime: 2024-11-01 13:48:25
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/view/data/data-administration-new/structured/components/custom-dialog-ftp.vue
 * @Desc:
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
-->
<template>
  <el-dialog custom-class="custom-dialog-ftp" :visible.sync="showAddData" :title="title" :close-on-click-modal="false">
    <div class="left">
      <ul>
        <li
          @click="getFileList(item)"
          v-for="(item, index) in ftpLists"
          :key="index"
          :class="{ active: activeParams.id === item.id }"
        >
          <i class="fa fa-cloud mr10" />
          <div class="left-content">
            <span>{{ item.linkIp }}</span>
            <span class="desc">{{ item.linkName }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="header">
        <div @click="goBack" class="back">
          <i class="el-icon-back"></i>
          <span>返回</span>
        </div>
        <div class="title">{{ `路径：${activeParams.linkPath}` }}</div>
        <div>
          <i
            class="el-icon-s-operation icon"
            :class="{ active: type === 'list' }"
            @click="handleChooseType('list')"
          ></i>
          <i class="el-icon-s-grid icon" :class="{ active: type === 'grid' }" @click="handleChooseType('grid')"></i>
        </div>
      </div>
      <div class="body">
        <ul :class="`${this.type === 'grid' ? 'grid' : 'list'}`">
          <li v-for="(item, index) in fileLists" :key="index">
            <div class="is-dir" v-if="item.isDir" @click="handleChooseDir(item)">
              <img src="@/assets/images/data-administration/folder.png" alt="" />
              <span class="desc">{{ item.fileName }}</span>
            </div>
            <div :class="{ active: activeFileName === item.fileName }" v-else @click="handleChooseFile(item)">
              {{ item.fileName }}
            </div>
          </li>
        </ul>
      </div>
      <div class="footer">
        <el-button @click="showAddData = false">取消</el-button>
        <el-button v-if="activeFileName" type="primary" @click="onSure">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getLinkByType, testLink } from '@/api/data/data-administration-new';

export default {
  props: {
    title: {
      type: String,
      default: '选择文件',
    },
    linkType: {
      type: String,
      default: 'sftp',
    },
  },

  data() {
    return {
      showAddData: false,
      fileLists: [],
      ftpLists: [],
      nowPath: '',
      type: 'list',
      activeParams: {},
      activeFileName: '',
    };
  },
  created() {
    this.initFtpLists();
    const type = localStorage.getItem('ftpType');
    if (type) {
      this.type = type;
    }
  },

  methods: {
    async initFtpLists() {
      console.log('linkType', this.linkType);

      const res = await getLinkByType({
        linkType: this.linkType,
      });
      this.ftpLists = res.data.map((item) => ({
        ...item,
        value: item.id,
        label: `${item.linkIp}${item.linkName ? `(${item.linkName})` : ''}`,
      }));
      this.getFileList(this.ftpLists[0]);
    },
    handleChooseDir(item) {
      console.log('handleChooseDir', item);
      this.activeParams.linkPath += this.activeParams.linkPath === '/' ? item.fileName : `/${item.fileName}`;
      this.getFileList(this.activeParams);
    },
    handleChooseFile(item) {
      console.log('handleChooseFile', item);
      this.activeFileName = item.fileName;
    },
    async getFileList(item) {
      this.activeFileName = '';
      this.activeParams = item;
      const { label, value, ...params } = item;
      const res = await testLink(params);
      console.log('getFileList', res);
      this.fileLists = Object.entries(res.data).map(([key, value]) => ({
        isDir: value,
        fileName: key,
      }));
    },
    goBack() {
      this.activeParams.linkPath = this.activeParams.linkPath.split('/').slice(0, -1).join('/');
      if (!this.activeParams.linkPath) {
        this.activeParams.linkPath = '/';
      }
      this.getFileList(this.activeParams);
    },
    exportToggleDialog() {
      this.showAddData = !this.showAddData;
    },
    onSure() {
      const { activeFileName, activeParams } = this;
      this.showAddData = false;
      this.$emit('onOk', {
        activeParams,
        activeFileName,
      });
    },
    handleChooseType(type) {
      this.type = type;
      localStorage.setItem('ftpType', type);
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .custom-dialog-ftp {
  height: 500px;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    display: flex;
    height: 100%;
    min-height: 400px;
    overflow: hidden;
    .left {
      width: 150px;
      background-color: #f5f5f5;
      border-radius: 8px;
      overflow: auto;
      ul {
        li {
          padding: 10px;
          display: flex;
          align-items: center;
          font-size: 12px;
          .left-content {
            line-height: 1em !important;
            display: flex;
            flex-direction: column;
            .desc {
              margin-top: 8px;
              color: #999;
            }
          }
        }
        li.active {
          background: rgb(184, 217, 253);
        }
      }
    }
    .right {
      flex: 1;
      padding-left: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      width: 100%;
      .header {
        background: #fff;
        height: 30px;
        width: 100%;
        display: flex;
        .back {
          cursor: pointer;
        }
        .title {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
          margin-left: 10px;
          font-size: 12px;
          color: #333;
        }
        .active {
          color: #1d70f5;
        }
        .icon {
          margin-left: 5px;
          cursor: pointer;
        }
      }
      .body {
        flex: 1;
        overflow: auto;
        ul.list {
          padding: 10px 0px;
          text-align: left;
          li {
            cursor: pointer;
            .is-dir {
              display: flex;
              align-items: center;
              justify-content: left;
              .desc {
                margin-left: 8px;
              }
            }
          }
        }
        .active {
          background: rgb(184, 217, 253);
        }
        ul.grid {
          display: flex;
          flex-wrap: wrap;
          padding: 10px 0px;
          li {
            width: 70px;
            // height: 60px;
            display: flex;
            .is-dir {
              display: flex;
              flex-direction: column;
              align-items: center;
              img {
                width: 20px;
                height: 20px;
              }
              .desc {
                margin-top: 8px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
