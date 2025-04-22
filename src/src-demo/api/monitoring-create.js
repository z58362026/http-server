import { http } from '@/utils/http';
// Server 获取监控模型配置
export function getMonitoringModelConfig() {
  return http.get({
    url: '/api/monitoring/model/config',
  });
}

// Server 获取监控模型版本配置
export function getMonitoringModelVersionConfig(params) {
  return http.get({
    url: '/api/monitoring/model/version/config',
    params,
  });
}
// Server 获取监控模型实例配置
export function getMonitoringModelInstanceConfig(params) {
  return http.get({
    url: '/api/monitoring/model/instance/config',
    params,
  });
}

// Server 获取数据源库名配置

export function getDataSourceConfig(params) {
  return http.get({
    url: '/api/monitoring/model/datasource/config',
    params,
  });
}
// Server 获取数据源表名配置

export function getDataSourceTableConfig(params) {
  return http.get({
    url: '/api/monitoring/model/datasource/table/config',
    params,
  });
}
// Server 获取数据质量字段名配置

export function getDataSourceFieldConfig(params) {
  return http.get({
    url: '/api/monitoring/model/datasource/field/config',
    params,
  });
}

// Server  获取模型实例指标配置， 也可以在模型实例给我

// export function getDataSourceMetricConfig(params) {
//   return http.get({
//     url: '/api/monitoring/model/datasource/metric/config',
//     params,
//   });
// }

// Server 监控任务名称重复校验

export function checkMonitoringJobName(params) {
  return http.get({
    url: '/api/monitoring/job/check/name',
    params,
  });
}
