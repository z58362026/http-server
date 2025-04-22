/* eslint-disable no-param-reassign */
/* eslint-disable no-throw-literal */
import { cloneDeep, isString } from 'lodash-es';
// import { Message } from 'element-ui';
import { ContentTypeEnum, RequestEnum, ResultEnum } from './config';
import { deepMerge, getContentType, joinTimestamp } from './helper';
import { VAxios } from './Axios';
import retryRequest from './axiosRetry';
import { checkStatus } from './checkStatus';

/**
 * @description: 数据处理，方便区分多种处理方式
 */
export const transform = {
  /**
   * @description: 处理响应数据。如果数据不是预期格式，可直接抛出错误
   */
  transformResponseHook: (res, options) => {
    const { isTransformResponse, isReturnNativeResponse, errorMessageText } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 错误的时候返回
    const { data } = res;
    if (!data) {
      throw '请求错误';
    }
    // 通用 业务逻辑判断
    if (!checkStatus(res, options)) throw `${res.data}`;
    // 不进行任何处理，直接返回
    if (!isTransformResponse) {
      return res.data;
    }
    const { message, status } = res.data;
    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data && Reflect.has(data, 'status') && +status === ResultEnum.SUCCESS;
    if (hasSuccess) {
      /** 因为服务端把业务数据跟状态数据扁平化了，所以这里需要删除 */
      const result = res.data;
      delete result.status;
      delete result.message;
      return result;
    }
    if (options.isShowErrorMessage) {
      if (options.errorMessageMode === 'message') {
        // Message.error(errorMessageText || message || '操作失败！');
      }
    }
    throw '请求错误';
  },
  // 请求之前处理config
  beforeRequestHook: async (config, options) => {
    if (options.isPending && retryRequest.isPendingState()) {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => () => retryRequest.setCacheInstances(resolve));
    }
    /**
     * 添加content-type语法糖快捷设置。
     */
    if (options.toForm || options.toJson || options.toMulti) {
      config.headers = { ...config.headers, 'content-type': getContentType(options) };
    }
    const { apiUrl, joinPrefix, joinTime = true, urlPrefix } = options;
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
      config.params = Object.assign(params || {}, joinTimestamp(joinTime));
    } else if (
      Reflect.has(config, 'data') &&
      config.data &&
      (Object.keys(config.data).length > 0 || config.data instanceof FormData)
    ) {
      config.data = data;
      config.params = params;
    } else {
      // 非GET请求如果没有提供data，则将params视为data
      config.data = params;
      config.params = undefined;
    }
    return config;
  },
  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: async (config) => {
    return config;
  },
  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: async (axiosInstance, res) => {
    const { config } = res;
    console.log('%c [ config ]-101', 'font-size:13px; background:pink; color:#bf2c9f;', config);
    return res;
  },
  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (axiosInstance, error) => {
    const { code, message } = error || {};
    const err = error?.toString?.() || '';
    let errMessage = '';
    if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
      errMessage = '系统服务错误';
    }
    if (err?.includes('Network Error')) {
      errMessage = '网络服务错误';
    }
    if (errMessage) {
      return Promise.reject(error);
    }
    return Promise.resolve();
  },
};

// 默认配置对象，方便用户查看和覆盖
export const defaultConfig = {
  timeout: 10 * 1000,
  headers: { 'content-type': ContentTypeEnum.JSON },
  transform: cloneDeep(transform),
  requestOptions: {
    isPending: true,
    joinPrefix: true,
    isReturnNativeResponse: false,
    isTransformResponse: true,
    errorMessageMode: 'message',
    apiUrl: '/api',
    urlPrefix: '',
    joinTime: true,
    ignoreCancelToken: true,
    withZpToken: true,
    retryRequest: {
      isOpenRetry: true,
      count: 3,
      waitTime: 100,
    },
    autoLogin: false,
    appId: '',
    isShowLoad: false,
    isShowErrorMessage: true,
    toJson: false,
    toForm: false,
    toMulti: false,
  },
};

/**
 * 创建自定义的 axios 实例
 * @param {Object} opt 用户自定义配置
 * @param {Object} hooks 可选的钩子函数配置
 * @param {Function} hooks.beforeRequestHook 请求前的钩子函数
 * @param {Function} hooks.afterResponseHook 响应后的钩子函数
 * @param {Function} hooks.errorHandler 错误处理函数
 * @returns {VAxios} axios 实例
 */
export function createAxios(opt = {}, hooks = {}) {
  // 深度合并默认配置和用户配置
  const mergedConfig = deepMerge(defaultConfig, opt || {});
  
  // 只覆盖用户提供的 hook，保持其他 hook 使用默认值
  if (hooks.beforeRequestHook) {
    mergedConfig.transform.beforeRequestHook = hooks.beforeRequestHook;
  }
  if (hooks.afterResponseHook) {
    mergedConfig.transform.responseInterceptors = hooks.afterResponseHook;
  }
  if (hooks.errorHandler) {
    mergedConfig.transform.responseInterceptorsCatch = hooks.errorHandler;
  }

  return new VAxios(mergedConfig);
}

// 默认的 http 实例
export const http = createAxios();
