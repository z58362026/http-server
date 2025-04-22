import { http } from '@/utils/http';

// Server 获取监控列表
export function getMonitoringList(params) {
  return http.post({
    url: '/modelEvaluationMonitor/queryMonitorList',
    params,
  });
}
// Server获取监控详情
export function getMonitoringDetail(id) {
  return http.get({
    url: '/modelEvaluationMonitor/queryDetail',
    params: { id },
  });
}
// Server添加监控
export function postCreateMonitoringJob(data) {
  return http.post({
    url: '/modelEvaluationMonitor/addMonitor',
    params: data,
  });
}

// Server编辑监控
export function postEditMonitoringJob(data) {
  return http.post({
    url: '/modelEvaluationMonitor/modifyMonitor',
    params: data,
  });
}
// Server删除监控
export function deleteMonitoringJob(id) {
  return http.get({
    url: '/modelEvaluationMonitor/deleteMonitors',
    params: { id },
  });
}
// Server启动和停用监控任务,
/**
 * type: 1开启  0暂停
 * @param {*} data
 * @returns
 */
export function startOrStopMonitoringJob(data) {
  return http.get({
    url: '/modelEvaluationMonitor/taskPause',
    params: data,
  });
}
// 获取服务端码值通用配置
export function getCommonConfig(params) {
  return http.get({
    url: '/api/monitoring/common/config',
  });
}

// 下拉框监控类型
export function getMonitorlType(params) {
  return http.get({
    url: '/modelEvaluationMonitor/getMonitorlType',
    params,
  });
}
