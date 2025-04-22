# HTTP Request Library

一个基于 Axios 封装的 HTTP 请求库，支持自定义配置和 hooks。

## 安装

```bash
npm install @z58362026/http-server
```

## 基本使用

```javascript
import { http } from '@your-org/http-request';

// 发送 GET 请求
const getData = async () => {
  try {
    const response = await http.get('/api/data');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// 发送 POST 请求
const postData = async () => {
  try {
    const response = await http.post('/api/data', {
      name: 'test',
      value: 123
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
```

## 自定义配置

### 创建自定义实例

```javascript
import { createAxios } from '@your-org/http-request';

// 创建自定义配置的实例
const customHttp = createAxios({
  timeout: 5000,
  requestOptions: {
    apiUrl: 'https://api.example.com',
    isShowErrorMessage: false,
    // 更多配置选项...
  }
});
```

### 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| timeout | number | 10000 | 请求超时时间(ms) |
| headers | object | { 'content-type': 'application/json' } | 请求头 |
| requestOptions | object | - | 请求选项 |

#### requestOptions 配置

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| isPending | boolean | true | 是否启用请求队列 |
| joinPrefix | boolean | true | 是否添加 URL 前缀 |
| isReturnNativeResponse | boolean | false | 是否返回原生响应 |
| isTransformResponse | boolean | true | 是否转换响应数据 |
| errorMessageMode | string | 'message' | 错误消息显示模式 |
| apiUrl | string | '/api' | API 基础地址 |
| urlPrefix | string | '' | URL 前缀 |
| joinTime | boolean | true | 是否添加时间戳 |
| ignoreCancelToken | boolean | true | 是否忽略取消令牌 |
| withZpToken | boolean | true | 是否携带 token |
| autoLogin | boolean | false | 是否自动登录 |
| isShowLoad | boolean | false | 是否显示加载状态 |
| isShowErrorMessage | boolean | true | 是否显示错误消息 |

## 自定义 Hooks

支持自定义以下 hooks：

1. `beforeRequestHook`: 请求前的处理
2. `afterResponseHook`: 响应后的处理
3. `errorHandler`: 错误处理

### 配置单个 Hook

```javascript
import { createAxios } from '@your-org/http-request';

// 只配置请求前的处理
const httpWithRequestHook = createAxios(
  {}, // 使用默认配置
  {
    beforeRequestHook: (config, options) => {
      // 添加自定义请求头
      config.headers['X-Custom-Header'] = 'value';
      return config;
    }
  }
);
```

### 配置多个 Hooks

```javascript
import { createAxios } from '@your-org/http-request';

// 配置多个 hooks
const httpWithMultipleHooks = createAxios(
  {}, // 使用默认配置
  {
    beforeRequestHook: (config) => {
      // 请求前的处理
      return config;
    },
    afterResponseHook: (axiosInstance, res) => {
      // 响应后的处理
      return res;
    },
    errorHandler: (axiosInstance, error) => {
      // 错误处理
      return Promise.reject(error);
    }
  }
);
```

### Hook 函数说明

#### beforeRequestHook

```typescript
(config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig
```

- 参数：
  - `config`: Axios 请求配置
  - `options`: 请求选项
- 返回值：修改后的请求配置

#### afterResponseHook

```typescript
(axiosInstance: AxiosInstance, res: AxiosResponse) => AxiosResponse
```

- 参数：
  - `axiosInstance`: Axios 实例
  - `res`: 响应对象
- 返回值：处理后的响应对象

#### errorHandler

```typescript
(axiosInstance: AxiosInstance, error: any) => Promise<any>
```

- 参数：
  - `axiosInstance`: Axios 实例
  - `error`: 错误对象
- 返回值：Promise，通常用于错误处理后的继续或中断

## 示例

### 添加认证信息

```javascript
const authHttp = createAxios(
  {},
  {
    beforeRequestHook: (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  }
);
```

### 自定义错误处理

```javascript
const errorHandlingHttp = createAxios(
  {},
  {
    errorHandler: (error) => {
      if (error.response?.status === 401) {
        // 处理未授权错误
        window.location.href = '/login';
      } else if (error.response?.status === 403) {
        // 处理权限错误
        Message.error('没有操作权限');
      } else {
        // 其他错误
        Message.error(error.message || '请求失败');
      }
      return Promise.reject(error);
    }
  }
);
```

### 响应数据处理

```javascript
const dataProcessingHttp = createAxios(
  {},
  {
    afterResponseHook: (axiosInstance, res) => {
      // 对响应数据进行处理
      if (res.data.code === 0) {
        return res.data.data;
      } else {
        throw new Error(res.data.message);
      }
    }
  }
);
```

## 注意事项

1. 所有配置项都是可选的，未配置的项将使用默认值
2. hooks 的配置也是可选的，可以只配置需要的部分
3. 建议在创建实例时保持配置的一致性
4. 错误处理时要注意 Promise 的返回

## License

MIT
