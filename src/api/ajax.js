/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-14 13:47:33
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-14 15:04:59
 */
import Axios from "axios";
import host from "./host";
import { Modal } from 'antd';
// 是否在开发环境中  默认在开发环境中  
let isDev = true;
// 如果在生产环境中 isDev为false   development 开发环境   production 生产环境
if(process.env.NODE_ENV === 'production'){
  isDev = false;
}
// 引入外部的配置文件 根据环境，请求名字不同，配置不同的baseurl
host.map((item)=>{
  return { name: item.name, origin: isDev ? item.dev : item.prod };
}).forEach((item)=>{
 Axios.defaults[item.name] = item.origin
})
// ***********渲染出来是这样的 **********
// Axios.defaults.baseURL = "http://127.0.0.1:3030";
// Axios.defaults.test = "http://www.baidu.com";
Axios.defaults.withCredentials = true;  // 默认为false  表示跨域请求时是否需要使用凭证
const axios = Axios.create({});
// 请求拦截器
axios.interceptors.request.use((request) => {
  try {
    console.error("request.url",request.url, request.baseURL)
    // 如果请求url里面有test 就用5000端口请求
    if(/test/.test(request.url)){
      request.baseURL = Axios.defaults.test
    }
    // 每次请求时，都把tokne带上 默认先注释 有需求就打开
    // const kiwi = localStorage.getItem('kiwi');
    // const token = JSON.parse(kiwi);
    // request.headers.Authorization = `Bearer ${token}`;
  } catch (err) {
    console.error('axios请求拦截出错',err);
  }
  return request;
}, error => Promise.reject(error));
// 响应拦截器
axios.interceptors.response.use((response = {}) => { return response;},
  (error) => {
    const { response = {} } = error;
    // 401时 说明用户认证失败了
    if (response.status === 401) {
      Modal.warning({
        title: '用户认证失败，请重新登录！',
        onOk() {
          // localStorage.removeItem("kiwiCert");
          window.location.href = '/login';
        },
      });
    }
    return Promise.reject(error);
});

export default axios;
