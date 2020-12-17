/*
 * @Descripttion: 封装axios函数
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-14 13:47:33
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-14 14:19:25
 */
import Axios from "./ajax";
import { message } from 'antd';
function axios(url, data = {}, type = 'get') {
  return new Promise((resolve, reject) => {
    let promise
    // 发get 请求
    if (type === 'get') {
      promise = Axios.get(url, {
        parsms: data
      })
    }
    // 发post 请求
    if (type === 'post') {
      promise = Axios.post(url, data);
    }
    // 如果成功了, 调用resolve(value)
    promise.then((res) => {
      resolve(res.data)
    }).catch((err) => {
      // 如果失败了, 不调用reject, 而是提示异常信息  
      message.error('请求出错了: ' + err)
    })
  })
}
export default axios;