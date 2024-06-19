/**
 * 封装 axios
 * 1. 根域名配置
 * 2. 超时时间
 * 3. 请求拦截、响应拦截
 */

import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";

const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0", // 根域名
  timeout: 5000,
});

// 添加请求拦截器: 在发送请求之前做些什么
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器: 响应回到客户端之前做拦截
http.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // console.dir(error);
    const status = error.response.status;
    switch (status) {
      case 401: // 401 表示 token 已经失效了
        removeToken();
        window.location.reload(); // 强制刷新
        router.navigate("/login");
        break;

      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default http;
