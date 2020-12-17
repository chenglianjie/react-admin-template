/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-14 11:40:53
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-16 16:25:51
 */

import React from 'react';
import { Card, Button, Table, Modal, Input, Tree, message } from "antd";
import menuList from "../../config/meunConfig";
import axios from "axios";
import store from "../../utiils/storageUtils"
const { TreeNode } = Tree;
class Role extends React.Component {
  state = {
    selectedRowKeys:[], // 选中的角色的数组
    role:{},  // 选中的role
    roleList:[], // role数组
    isShowAuth: false, // 是否显示设置权限界面
    treeCheckedKeys:[], // tree中选中的数组
  }
  UNSAFE_componentWillMount(){
    this.treeNodes = this.getTreeNode(menuList)
  }
  async componentDidMount(){
    const {data:{data}} = await axios.get("http://120.55.193.14:5000/manage/role/list");
    this.setState({
      roleList:data
    })
  }
  
  getTreeNode = (menuList)=>{
    return menuList.map((item)=>{
      return(
        <TreeNode title={item.title} key={item.key}>
          {item.children?this.getTreeNode(item.children):null}       
        </TreeNode>
      )
    })
  }

  onCheck = (treeCheckedKeys) => {
    this.setState({ treeCheckedKeys });
  }
  // 点击行的函数
  onRow = (role) =>{
    return {
      onClick:(e)=>{
        console.log("roleyayayy",role)
        this.setState({
          role,
          selectedRowKeys:[role._id],
          treeCheckedKeys:role.menus
        })
      } // 点击行
    }
  }
  handleOk =async () => {
    let {role} = this.state;
    role.menus = this.state.treeCheckedKeys;
    // console.log('上传的role',role);
    const {data} = await axios.post("http://120.55.193.14:5000/manage/role/update",role);
    if(data.status === 0 ) {
      let currentRole = store.getUser().role;
      this.setState({isShowAuth:false});
      console.log("对比",currentRole.name,role.name);
      if(currentRole.name === role.name){
        store.removeUser();
        this.props.history.replace('/login');
        message.success('当前用户角色权限成功')
      }else{
        const {data:{data}} = await axios.get("http://120.55.193.14:5000/manage/role/list");
        this.setState({
          roleList:data
        })
        message.success('设置角色权限成功');
      }
    }
  }
  render() {
    const {selectedRowKeys,role,isShowAuth,treeCheckedKeys} = this.state;
    console.log("treeCheckedKeys",treeCheckedKeys)
    let {roleList} = this.state
    if(!Array.isArray(roleList)){
      roleList=[];
    }
    const title = (
      <span>
        <Button type='primary'>创建角色</Button> &nbsp;&nbsp;
        <Button 
          type='primary' 
          disabled={!role._id} 
          onClick={() => this.setState({isShowAuth: true })}
        >
          设置角色权限
        </Button>
      </span>
    )
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key:'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key:'create_time'
        // render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key:'auth_time'
        // render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key:'auth_name'
      },
    ]
    return (
      <div>
        <Card title={title}>
          <Table
            key="roeltable"
            rowKey = {record => record._id }
            dataSource={roleList}
            bordered
            columns={columns}
            rowSelection={
              {
                type:'radio',
                selectedRowKeys:selectedRowKeys,
                onChange:(selectedRowKeys,role)=>{
                  this.setState({
                    selectedRowKeys,role:role[0],
                    treeCheckedKeys:role[0].menus,
                  })
                }
              }
            }
            onRow={this.onRow}
          />
        </Card>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.handleOk}
          onCancel={()=>{this.setState({isShowAuth:false})}}
        >
          <div><span>角色名称：</span><Input disabled style={{ width: 300 }} value={role.name} /></div>
          <Tree
            checkable
            defaultExpandAll={true}  // 默认展开所有节点
            checkedKeys={treeCheckedKeys}
            onCheck={this.onCheck}
          >
            <TreeNode title="平台权限" key="all">
              {this.treeNodes}
            </TreeNode>
          </Tree>
        </Modal>
      </div>
    )
  }
}
export default Role;