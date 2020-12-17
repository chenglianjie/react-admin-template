import React from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Menu, Icon, } from 'antd';
import meunConfig from "../../config/meunConfig";
import Logo from "../../assets/images/logo.png";
import "./index.less";
import store from "../../utiils/storageUtils"
// import axios from "../../api/index"
const { SubMenu } = Menu;
class Leftnav extends React.Component {
  state = {
    role:[]
  }
  UNSAFE_componentWillMount() {
    this.menuNodes = this.renderMenu(meunConfig)
  }
  // 判断当前登录的用户可以访问那些页面
  hasAuth = (item) => {
    let {role={},username} = store.getUser();
    let {menus} = role;
    const {key, isPublic} = item;
    if( username === "admin"  || isPublic || menus.indexOf(key) !==-1 ){
      return true
    }else if(item.children){
      return !!item.children.find(child =>  menus.indexOf(child.key)!==-1)
    }
    return false
  }
  // 递归渲染出 left-nav
  renderMenu = (meunList) => {
    return meunList.map((item) => {
      if(this.hasAuth(item)){
        if (item.children) {
          let path = this.props.location.pathname;
          // 查找一个与当前请求路径匹配的子Item
          const items = item.children.find(cItem => path.indexOf(cItem.key)===0)
          // 如果存在, 说明当前item的子列表需要打开
          if (items) {
            this.openKey = item.key
          }
          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.renderMenu(item.children)}
            </SubMenu>
          )
        }
        return (
          <Menu.Item key={item.key}>
             <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
             </Link>
          </Menu.Item>
        )
      }
    })
  }
  render() {
    // 得到当前请求的路由路径
    let path = this.props.location.pathname;
    if(path==='/'){
      path='/home'
    }
    // 得到需要打开菜单项的key
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <Link to='/home' className="left-nav-header">
          <img src={Logo} alt="logo" />
          <h1>几维后台</h1>
        </Link>
        <Menu
          defaultSelectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
}
export default withRouter(Leftnav);