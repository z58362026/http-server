// BINARY_CLASSIFICATION 二分类
// MULTI_CLASSIFICATION  多分类
// REGRESSION                   回归
// CLUSTERING                   聚类
// OTHER                            其他
export const prometheusModelConfig = [
  {
    modelType: 'BINARY_CLASSIFICATION',
    modelName: '二分类',
    options: [
      { label: '准确率' },
      { label: '精准率' },
      { label: '召回率' },
      { label: 'F1得分' },
      { label: 'AUC' },
      { label: 'KS 值' },
    ],
  },
  {
    modelType: 'MULTI_CLASSIFICATION',
    modelName: '多分类',
    options: [
      { label: '准确率' },
      { label: 'Kappa 系数' },
      { label: '加权精准率' },
      { label: '加权 F1 得分' },
      { label: '加权召回率' },
    ],
  },
  {
    modelType: 'CLUSTERING',
    modelName: '聚类',
    options: [{ label: '轮廓系数' }, { label: 'Calinski-Harabaz指数' }, { label: 'Davies-Bouldin指数' }],
  },
  {
    modelType: 'REGRESSION',
    modelName: '回归',
    options: [
      { label: '解释方差' },
      { label: 'R2 决定系数' },
      { label: '均方误差' },
      { label: '均方根误差' },
      { label: '归一化均方根误差' },
      { label: '平均绝对误差' },
      { label: '平均绝对误差百分比' },
      { label: '均方对数误差' },
    ],
  },
];
export const prometheusDataConfig = {
  options: [
    { label: '最大值' },
    { label: '最小值' },
    { label: '零值率' },
    { label: '缺失率' },
    { label: '峰度' },
    { label: '偏度' },
    { label: '数量' },
    { label: '四分之一分位值' },
    { label: '四分之三分位值' },
    { label: '平均数' },
    { label: '众数' },
    { label: '中位数' },
    { label: '标准差' },
    { label: '方差' },
    { label: '极差' },
    { label: '变异系数' },
    { label: '四分位间距' },
    { label: 'CSI' },
  ],
};
