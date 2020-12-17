/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-14 10:24:20
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-16 17:55:49
 */
import React from 'react';
import {Switch,Route,Redirect} from "react-router-dom"
import { Layout } from 'antd';
import Header from "../../components/header"
import Leftnav from "../../components/left-nav"
// import Home from "@/pages/home/home";
import User from "../user/user";
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
import Order from '../order/order'
import "./admin.less";
import store from "../../utiils/storageUtils";
// import componentList from "../../config/mainComponent";
const { Footer, Sider, Content } = Layout;
/*
后台管理的路由组件
 */
const Admin = () => {
  const user = store.getUser();
  if(!user || !user._id){
    return <Redirect to="/login"/>
  }
 const {role:{menus}} = store.getUser();
  return (
    <Layout style={{minHeight: '100%'}}>
      <Sider>
        <Leftnav></Leftnav>
      </Sider>
      <Layout>
        <Header></Header>
        <Content style={{margin: 20, backgroundColor: '#fff'}}>
          <Switch>
          {/* <Route path='/home' component={Home}/> */}
              {/* {componentList.map((item)=>{
                
              })} */}
              {/* <Redirect from='/' exact to='/home'/>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/pie" component={Pie}/>
              <Route path="/charts/line" component={Line}/>
              <Route path="/order" component={Order}/> */}
          </Switch>
        </Content>
        <Footer style={{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
      </Layout>
    </Layout>
  )
}
export default Admin;
