/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/*
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-11-14 18:43:59
 * @LastEditTime: 2024-11-14 18:51:29
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/util/http/axiosRetry.js
 * @Desc: 请求重试机制
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
 */

export class AxiosRetry {
  constructor() {
    this.cacheAxiosInstance = [];
    this.cacheState = '';
  }

  isPendingState() {
    return this.cacheState === 'pending';
  }

  setState(state = 'pending') {
    this.cacheState = state;
  }

  setCacheInstances(callback) {
    this.cacheAxiosInstance.push(callback);
  }

  continueCacheInstances() {
    this.cacheAxiosInstance.forEach((fn) => fn());
    this.cacheAxiosInstance = [];
    this.cacheState = '';
  }

  /**
   * 重试
   */
  retry(AxiosInstance, config) {
    const { waitTime, count } = config.requestOptions?.retryRequest || {};
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= count) {
      return Promise.reject('请求失败');
    }
    config.__retryCount += 1;
    return this.delay(waitTime).then(() => AxiosInstance(config));
  }

  /**
   * 延迟
   */
  delay(waitTime) {
    return new Promise((resolve) => setTimeout(resolve, waitTime));
  }
}

export const createAxiosRetry = () => {
  return new AxiosRetry();
};

export default createAxiosRetry();
