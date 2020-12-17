/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-14 10:24:20
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-17 15:27:24
 */
import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom"
import { Layout,Spin } from 'antd';
import Header from "../../components/header"
import Leftnav from "../../components/left-nav"
import NotFound from "@/pages/not-found/not-found"
import store from "../../utiils/storageUtils";
import componentList from "../../config/mainComponent";
import "./admin.less";

const { Footer, Sider, Content } = Layout;
/*
后台管理的路由组件
 */
const Admin = () => {
  const suspenseStype = { margin: '0 auto', display: 'block' };
  const user = store.getUser();
  if (!user || !user._id) {
    return <Redirect to="/login" />
  }
  const  roles  = store.getUser();
  const {role:{menus}} = roles;
  const {username} = roles;
  const hasAuthority = (item) => {
    // console.error("menus",menus,username)
    if(menus.includes(item.path) || username==="admin" ){
      return true
    }
    return false;
  }
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider>
        <Leftnav></Leftnav>
      </Sider>
      <Layout>
        <Header></Header>
        <Content style={{ margin: 20, backgroundColor: '#fff' }}>
          <Suspense
          fallback={(
            <Spin
              spinning
              style={ suspenseStype }
            />
          )}
          >
            <Switch>
              <Redirect from='/' exact to='/home'/>
              {
              componentList.map((item,index) => {
                if(hasAuthority(item)){
                  const Asynccomponent = lazy(item.component)
                  return (
                    <Route
                      key={index*99}
                      path={item.path}
                      render={
                        (props) => {
                          if (true) {
                            return <Asynccomponent {...props} />
                          }
                     
                        }
                      }
                    />
                  )
                }else{
                  console.log("我进来了")
                  return <NotFound/>
                }
              })}
              <Route component={NotFound}/>
            </Switch>
          </Suspense>
        </Content>
        <Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
      </Layout>
    </Layout>
  )
}
export default Admin;
