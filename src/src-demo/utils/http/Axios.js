import axios from 'axios';
import qs from 'qs';
import { AxiosCanceler } from './axiosCancel';
import { cloneDeep, isFunction } from 'lodash-es';
import { ContentTypeEnum, RequestEnum } from './config';
import { Loading } from 'element-ui';

/**
 * @description:  axios module
 */
export class VAxios {
  constructor(options) {
    this.loadCount = 0;
    this.load = null;
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  // 获取转换方法
  getTransform() {
    const { transform } = this.options;
    return transform;
  }

  getAxios() {
    return this.axiosInstance;
  }

  /**
   * @description:  拦截器配置
   */
  setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } =
      transform;

    const axiosCanceler = new AxiosCanceler();

    // 请求拦截器请求配置
    this.axiosInstance.interceptors.request.use((config) => {
      return new Promise(async (resolve) => {
        const { ignoreCancelToken } = config.requestOptions;
        const ignoreCancel =
          ignoreCancelToken !== undefined ? ignoreCancelToken : this.options.requestOptions?.ignoreCancelToken;

        !ignoreCancel && axiosCanceler.addPending(config);

        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = await requestInterceptors(config, this.options);
        }
        resolve(config);
      });
    }, undefined);

    // 请求拦截器请求错误配置
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // 请求拦截器响应配置
    this.axiosInstance.interceptors.response.use((res) => {
      res && axiosCanceler.removePending(res.config);
      return new Promise(async (resolve) => {
        if (responseInterceptors && isFunction(responseInterceptors)) {
          res = await responseInterceptors(this.axiosInstance, res);
        }
        resolve(res);
      });
    }, undefined);

    // 请求拦截器响应错误配置
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, (error) => {
        return responseInterceptorsCatch(this.axiosInstance, error);
      });
  }

  // form-data 数据处理
  supportFormData(config) {
    const headers = config.headers || this.options.headers;

    const contentType = headers?.['content-type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  get(config, options) {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post(config, options) {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put(config, options) {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete(config, options) {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  async request(config, options) {
    let conf = cloneDeep(config);
    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = await beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);
    if (opt.isShowLoad) {
      this.loadCount += 1;
      this.load = Loading.service({});
    }
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('请求错误'));
            }
            return;
          }
          resolve(res);
        })
        .catch((e) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        })
        .finally(() => {
          if (opt.isShowLoad) {
            this.loadCount -= 1;
            if (this.loadCount === 0) {
              this.load?.close();
            }
          }
        });
    });
  }
}
