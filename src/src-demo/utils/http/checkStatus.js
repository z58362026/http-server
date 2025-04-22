/*
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-11-14 18:43:59
 * @LastEditTime: 2024-11-15 13:17:15
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/util/http/checkStatus.js
 * @Desc: 头部注释配置模板
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
 */
import { notLoginConfig } from './config';
export function checkStatus(res) {
  const { data, status } = res.data;
  /**
   * 当前需要重新登录
   */
  // if (notLoginConfig.some((item) => item.includesConfig.includes(data?.[item.key])) || [401].includes(status)) {
  //   // logoutFunc();
  //   return false;
  // }
  return true;
}
