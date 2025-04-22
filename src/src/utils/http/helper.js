/*
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-11-14 18:43:59
 * @LastEditTime: 2024-11-14 18:58:48
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/util/http/helper.ts
 * @Desc: 工具类文件
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
 */
import { isObject } from 'lodash';
import { ContentTypeEnum } from './config';

export function joinTimestamp(join) {
  if (!join) {
    return {};
  }
  const now = new Date().getTime();
  return { _t: now };
}

// 跳转登录页面拦截
export async function toLogin(appId, autoLogin = false) {
  if (!autoLogin) {
    alert('重新登录');
    // await showDialog({
    //   title: '温馨提示',
    //   message: '登录信息失效，请重新登录',
    //   confirmButtonText: '重新登录',
    // });
  }
  toLoginPage(appId);
}

// 跳转登陆页面
export async function toLoginPage() {
  // 退出登录
}
/**
 * 添加content-type语法糖快捷设置。
 */
export function getContentType(options) {
  if (options.toJson) return ContentTypeEnum.JSON;
  else if (options.toMulti) return ContentTypeEnum.FORM_DATA;
  else if (options.toForm) return ContentTypeEnum.FORM_URLENCODED;
  return ContentTypeEnum.FORM_URLENCODED;
}

// 深度合并
export function deepMerge(origin = {}, target = {}) {
  let key;
  for (key in target) {
    origin[key] = isObject(origin[key]) ? deepMerge(origin[key], target[key]) : (origin[key] = target[key]);
  }
  return origin;
}
