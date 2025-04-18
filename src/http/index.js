/* eslint-disable no-param-reassign */
/* eslint-disable no-throw-literal */
import { cloneDeep, isString } from 'lodash-es';
import { Message } from 'element-ui';
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
        Message.error(errorMessageText || message || '操作失败！');
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

export function createAxios(opt = {}) {
  /** 这里需要跟现有的封装逻辑同步 */
  // TODO 这里需要调整
  const apiUrl = '/api';
  return new VAxios(
    // 深度合并
    deepMerge(
      {
        timeout: 10 * 1000,
        headers: { 'content-type': ContentTypeEnum.JSON },
        // 数据处理方式
        transform: cloneDeep(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // isPending
          isPending: true,
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl,
          // 接口拼接地址
          urlPrefix: '',
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withZpToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 3,
            waitTime: 100,
          },
          // 是否自动登录
          autoLogin: false,
          // boss内appId登陆使用
          appId: '',
          // 是否显示loading
          isShowLoad: false,
          // 是否显示失败信息
          isShowErrorMessage: true,
          // toJson、toForm、toMulti 三选一
          // content-type类型: application/json;charset=UTF-8
          toJson: false,
          // content-type类型: application/x-www-form-urlencoded;charset=UTF-8
          toForm: false,
          // content-type类型: multipart/form-data;charset=UTF-8
          toMulti: false,
        },
      },
      opt || {},
    ),
  );
}

export const http = createAxios();
