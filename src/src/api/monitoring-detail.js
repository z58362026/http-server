/*
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-16 15:29:01
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-25 15:46:59
 * @FilePath: /zdjx-cmmp/src/api/monitoring-detail.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { http } from '@/utils/http';
/**
 * 获取监控记录列表
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 当前页码
 * @param {number} params.pageSize - 每页条数
 * @returns {Promise}
 * {
 *   status: 0,
 *   message: "成功",
 *   data: {
 *     total: "2",
 *     totalPage: 1,
 *     pageNum: 1,
 *     pageSize: 10,
 *     list: [
 *       {
 *         detailId: 4365,           // 监控记录ID
 *         monitorName: "压测模型21", // 监控任务名称
 *         createPerson: "2025-04-22 19:12:40", // 任务创建时间
 *         cycleDay: "自定义",       // 任务执行频率
 *         startTime: "2025-04-22 16:29:02", // 任务执行时间
 *         endTime: "2030-04-22 16:29:02",   // 任务结束时间
 *         jobDetailStatus: "成功"     // 任务执行状态
 *       }
 *     ]
 *   }
 * }
 */
export function getMonitoringRecordList(params) {
  return http.get({
    url: '/modelEvaluationMonitor/monitorRecordList',
    params,
  });
}

/**
 * 停止当前监控任务
 * @param {number} id - 监控任务ID
 * @returns {Promise}
 */
export function stopMonitoringJob(detailId) {
  return http.get({
    url: '/modelEvaluationMonitor/stopJob',
    params: { detailId },
  });
}

/**
 * 查看日志
 * @param {number} id - 监控任务ID
 * @returns {Promise}
 */
export function getMonitoringJobLog(id) {
  return http.get({
    url: '/api/monitoring/job/log',
    params: { id },
  });
}

/**
 * 获取监控指标
 * @param {number} id - 监控任务ID
 * @returns {Promise}
 */
export function getMonitoringMetrics(params) {
  return http.post({
    url: '/modelEvaluationMonitor/metrics',
    params,
  });
}
/**
 * 获取告警记录
 * @param {number} id - 监控任务ID
 * @returns {Promise}
 */
export function getMonitoringWarnList(params) {
  return http.get({
    url: '/modelEvaluationMonitor/warnRecordList',
    params,
  });
}
