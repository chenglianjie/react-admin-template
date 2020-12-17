/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-14 13:37:01
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-17 15:37:13
 */
// 新增加的模块 要写进来
const maincomponent = [
  {
    path:'/home',
    component:()=>import("@/pages/home/home"),
  },
  {
    path:'/category',
    component:()=>import("@/pages/category/category"),
  },
  {
    path:'/product',
    component:()=>import('@/pages/product/product'),
  },
  {
    path:'/user',
    component:()=>import("@/pages/user/user"),
  },
  {
    path:'/role',
    component:()=>import("@/pages/role/role"),
  },
  {
    path:'/bar',
    component:()=>import('@/pages/bar/bar'),
  },
  {
    path:'/line',
    component:()=>import('@/pages/line/line'),
  },
  {
    path:'/pie',
    component:()=>import('@/pages/pie/pie'),
  },
  {
    path:'/order',
    component:()=>import('@/pages/order/order'),
  },
]
export default maincomponent