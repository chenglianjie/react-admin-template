/*
 * @Descripttion: 将数据保存到localStorage工具函数
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-16 11:16:41
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-16 11:24:06
 */
// 引入store库 可以支持所有浏览器
import store from "store";
const USER_KEY = 'user_key'
const stors = {
  /*
  保存user
   */
  saveUser(user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(USER_KEY, user)
  },

  /*
  读取user
   */
  getUser() {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    return store.get(USER_KEY) || {}
  },

  /*
  删除user
   */
  removeUser() {
    // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
  }
}
export default stors;