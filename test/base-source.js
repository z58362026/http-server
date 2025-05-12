/*
* @Autor: Modelor
* @Date: 2024-07-25 01:53:19
* @LastEditors: Modelor
* @LastEditTime: 2024-07-25 01:53:19
* @FilePath: \src\api\base\base-source.js
* @Description:
* Copyright (c) 2024 by Gientech, All Rights Reserved.
*/
import axios from '@/libs/api.request';

//资源管理列表接口
export const queryResource = (data) => {
  return axios.request({
    url: 'base/admResourceInfo/queryAllResource',
    params: data,
    method: 'get',
  });
};
// 编辑资源列表状态
export const enableOrDisableResource = (data) => {
  return axios.request({
    url: 'base/admResourceInfo/enableOrDisableResource',
    data,
    method: 'post',
  });
};


//添加资源接口
export const addResource = (data) => {
  return axios.request({
    url: 'base/admResourceInfo/addResource',
    data: data,
    method: 'post',
  });
};


//修改资源接口
export const editResource = (data) => {
  return axios.request({
    url: 'base/admResourceInfo/editResource',
    data: data,
    method: 'post',
  });
};



//根据iD删除资源接口
export const delResourceById = (data) => {
  return axios.request({
    url: 'base/admResourceInfo/deleteByIds',
    data: data,
    method: 'delete',
  });
};

//根据种类查询父资源列表
export const selectResourcePNameByType = (data) => {
  return axios.request({
    url: 'base/selectResourcePNameByType/'+data,
    params: data,
    method: 'get',
  });
};
