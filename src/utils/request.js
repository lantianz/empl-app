import axios from "axios";
import Cookie from "js-cookie";


const http = axios.create({
    // 后端通用请求地址前缀
    baseURL: '/api',
    timeout: 10000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前将token放入请求头
    //const token = Cookie.get('menu');
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['A-Token'] = token;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default http;