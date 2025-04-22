/*
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2024-11-14 18:58:17
 * @LastEditTime: 2024-11-14 19:18:54
 * @LastEditors: wangming ming.wang24@gientech.com
 * @FilePath: /modelmagic-ui/src/util/http/config.js
 * @Desc: 配置文件
 * Copyright (c) 2024 by Gientech, All Rights Reserved.
 */

export const RequestEnum = {
  GET: 'GET',
  POST: 'POST',
};

/**
 * @description:  contentType
 */
export const ContentTypeEnum = {
  // json
  JSON: 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA: 'multipart/form-data;charset=UTF-8',
};

export const ResultEnum = {
  SUCCESS: 0,
};
/**
 * @description:  不需要token的配置
 */
export const notLoginConfig = [
  {
    key: 'data',
    includesConfig: ['licenseExpired', 'notLogin', 'sessionExpired'],
  },
  { key: 'status', includesConfig: ['400'] },
  { key: 'message', includesConfig: ['session不存在'] },
];
