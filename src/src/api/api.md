<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-23 13:46:32
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-23 13:46:34
 * @FilePath: /zdjx-cmmp/src/api/api.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

根据统计，我将生成一个包含所有接口信息的表格：
| 接口描述 | 接口地址 | 请求方式 | 负责人 | 是否完成开发 |
|---------|---------|---------|--------|------------|
| 获取监控列表 | /modelEvaluationMonitor/queryMonitorList | POST | 待定 | 是 |
| 获取监控详情 | /modelEvaluationMonitor/queryDetail | GET | 待定 | 是 |
| 添加监控 | /modelEvaluationMonitor/addMonitor | POST | 待定 | 是 |
| 编辑监控 | /modelEvaluationMonitor/modifyMonitor | POST | 待定 | 是 |
| 删除监控 | /modelEvaluationMonitor/deleteMonitors | GET | 待定 | 是 |
| 启动/停用监控任务 | /modelEvaluationMonitor/taskPause | GET | 待定 | 是 |
| 获取通用配置 | /api/monitoring/common/config | GET | 待定 | 是 |
| 获取监控类型选项 | /modelEvaluationMonitor/getMonitorlType | GET | 待定 | 是 |
| 获取监控模型配置 | /api/monitoring/model/config | GET | 待定 | 是 |
| 获取监控模型版本配置 | /api/monitoring/model/version/config | GET | 待定 | 是 |
| 获取监控模型实例配置 | /api/monitoring/model/instance/config | GET | 待定 | 是 |
| 获取数据源库名配置 | /api/monitoring/model/datasource/config | GET | 待定 | 是 |
| 获取数据源表名配置 | /api/monitoring/model/datasource/table/config | GET | 待定 | 是 |
| 获取数据质量字段名配置 | /api/monitoring/model/datasource/field/config | GET | 待定 | 是 |
| 监控任务名称重复校验 | /api/monitoring/job/check/name | GET | 待定 | 是 |
| 获取监控记录列表 | /api/monitoring/record/list | GET | 待定 | 是 |
| 停止当前监控任务 | /api/monitoring/job/stop | POST | 待定 | 是 |
| 查看日志 | /api/monitoring/job/log | GET | 待定 | 是 |
| 获取监控指标 | /api/monitoring/metrics | GET | 待定 | 是 |
总结：
总共 19 个接口
接口类型分布：
GET 请求：13 个
POST 请求：6 个
接口分类：
监控基础操作（增删改查）：5 个
监控配置相关：8 个
监控任务控制：3 个
监控数据查询：3 个
注意：
所有接口的"负责人"和"是否完成开发"字段需要根据实际情况填写
部分接口（如获取模型实例指标配置）被注释掉了，可能需要确认是否还需要
建议添加接口文档，包含详细的参数说明和返回值说明
需要我帮你生成 Excel 文件吗？或者你需要对某些接口进行更详细的分析？
