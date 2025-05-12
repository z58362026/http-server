/*
 * @Author: xiaoxueyu xxy13525861483@163.com
 * @Date: 2023-01-08 18:49:46
 * @LastEditors: xiaoxueyu xxy13525861483@163.com
 * @LastEditTime: 2023-02-16 14:55:14
 * @FilePath: \modelmagic-ui\src\api\base\base-role.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from '@/libs/api.request';

//角色管理列表接口
export const selectRoleList = (data) => {
  return axios.request({
    url: 'base/selectRoleList',
    params: data,
    method: 'get',
  });
};

//平台下拉列表接口
export const getServiceName = (data) => {
  return axios.request({
    url: 'base/getServiceName',
    method: 'get',
  });
};

//添加角色信息接口
export const saveRole = (data) => {
  return axios.request({
    url: 'base/saveRole',
    data,
    method: 'post',
  });
};

//修改角色信息接口
export const editRole = (data) => {
  return axios.request({
    url: 'base/editRole',
    data,
    method: 'put',
  });
};

//根据id删除角色信息接口
export const delRoleById = (data) => {
  return axios.request({
    url: 'base/delRoleById/'+data,
    method: 'delete',
  });
};
// 角色管理编辑状态
export const enableOrDisableRole = (data) => {
  return axios.request({
    url: 'base/enableOrDisableRole',
    data,
    method: 'put',
  });
};
// 根据平台查询该平台下的资源列表(授权)
export const platformResource = (data) => {
  return axios.request({
    url: 'base/platformResource',
    params:data,
    method: 'get',
  });
};
// 根据角色roleId查询对应的资源id
export const selectRoleRes = (id) => {
  return axios.request({
    url: `base/selectRoleRes/${id}`,
    method: 'get',
  });
};

// 根据角色roleId添加对应的资源信息
export const saveResByRoleId = (data) => {
  return axios.request({
    url: 'base/saveResByRoleId',
    data,
    method: 'post',
  });
};
// 根据 roleId 查询所有用户id
export const selUserByRoleId = (data) => {
  return axios.request({
    url: 'base/selUserByRoleId',
    data,
    method: 'post',
  });
};


