import { http } from '@/utils/http';
// Server 获取监控记录列表
export function getMonitoringRecordList(params) {
  return http.get({
    url: '/api/monitoring/record/list',
    params,
  });
}
// Server 停止当前监控任务
export function stopMonitoringJob(id) {
  return http.post({
    url: '/api/monitoring/job/stop',
    params: { id },
  });
}

// Server 查看日志
export function getMonitoringJobLog(id) {
  return http.get({
    url: '/api/monitoring/job/log',
    params: { id },
  });
}
// Server 获取监控指标
export function getMonitoringMetrics(id) {
  return http.get({
    url: '/api/monitoring/metrics',
    params: { id },
  });
}
