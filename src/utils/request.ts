import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getToken } from '@/utils/auth';
import useStore from '@/store';

// 创建 axios 实例
const service = axios.create({
  baseURL: window.config.baseUrl,
  timeout: 1000 * 30
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(
        'Expected "config" and "config.headers" not to be undefined'
      );
    }
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      ElMessage.error(res.message || 'Error');

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        ElMessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(async () => {
          const { user } = useStore();
          await user.logout();
          location.reload();
        });
      }
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    console.log('error', error);
    const { msg } = error.response.data;
    ElMessage({
      message: msg || '系统出错',
      type: 'error'
    });
    return Promise.reject(new Error(msg || 'Error'));
  }
);

export const _post = (url, data = {}, extraConfig = {}) => {
  return service.post(url, {
    ...data,
    ...extraConfig
  });
};

export const _get = (url, params = {}, extraConfig = {}) => {
  return service.get(url, {
    params,
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
    ...extraConfig
  });
};

export const _put = (url, data = {}, extraConfig = {}) => {
  return service.put(url, {
    data,
    ...extraConfig
  });
};

export const _delete = (url, params = {}, extraConfig = {}) => {
  return service.delete(url, {
    params,
    ...extraConfig
  });
};

// 导出 axios 实例
export default service;
