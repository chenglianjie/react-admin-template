import React, { useState, useEffect } from 'react';
import "./index.less";
import moment from "moment";
import menuList from "../../config/meunConfig";
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd';
import store from "../../utiils/storageUtils";
const Header = (props) => {
  // 获取title
  const getTitle = () => {
    // 得到当前请求路径
    const path = props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title
      } else if (item.children) {
        // 在所有子item中查找匹配的
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        // 如果有值才说明有匹配的
        if (cItem) {
          // 取出它的title
          title = cItem.title
        }
      }
    })
    return title
  }
  // 退出功能
  const logout = () => {
    Modal.confirm({
      content: '确定退出登录嘛？',
      onOk: () => {
        store.removeUser();
        // 跳转到登录界面
        props.history.replace("/login");
      }
    })
  }
  const title = getTitle();
  const [currentTimem, setCurrentTimem] = useState(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"))
  const [user,setUser] = useState('');
  useEffect(() => {
    let users = store.getUser().username;
    setUser(users)
    let timer = setInterval(() => {
      let time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      setCurrentTimem(time);
    }, 1000)
    return () => {
      console.log("我执行了");
      clearInterval(timer);
    }
  }, [])
  return (
    <div className="header-index">
      <div className="header-top">
        <p>欢迎 {user} <span className="logout" onClick={logout}>退出</span></p>
      </div>
      <div className="header-bottom">
        <div className="title">{title}</div>
        <div className="tiem-weather">{currentTimem} 多云转晴</div>
      </div>
    </div>
  )
}
export default withRouter(Header);