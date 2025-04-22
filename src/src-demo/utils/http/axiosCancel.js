/*
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-11-14 18:43:59
 * @LastEditTime: 2025-04-22 09:47:58
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/util/http/axiosCancel.js
 * @Desc: 头部注释配置模板
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
 */
import axios from 'axios';
import { isFunction } from 'lodash-es';

let pendingMap = new Map();

export const getPendingUrl = (config) => [config.method, config.url].join('&');

export class AxiosCanceler {
  /**
   * 添加请求
   * @param {Object} config
   */
  addPending(config) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果没有请求，添加他
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description: 清除所有请求
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   * 删除请求
   * @param {Object} config
   */
  removePending(config) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      /**
       * 如果有当前请求，当前请求需要删除
       */
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  /**
   * @description: reset
   */
  reset() {
    pendingMap = new Map();
  }
}
