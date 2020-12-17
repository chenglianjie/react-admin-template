/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-14 11:34:58
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-16 13:52:36
 */
import React from 'react';
import {Card, Button, Table} from "antd";
const User = () => {
  const title =(
    <Button type="primary">创建用户</Button>
  )  
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },

    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      render: (role_id) => this.roleNames[role_id]
    },
    {
      title: '操作',
      render: (user) => (
        <span>
          <span onClick={() => this.showUpdate(user)}>修改</span>
          <span onClick={() => this.deleteUser(user)}>删除</span>
        </span>
      )
    },
  ]
  return (
    <div className="user">
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          columns={columns}
          dataSource={[]}
        />
      </Card>

    </div>
  )
}
export default User;