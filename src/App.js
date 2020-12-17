/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-14 10:24:20
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-17 11:46:24
 */
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/login/login.js'
import Admin from '@/pages/admin/admin.js'
function App() {
  return (
    <BrowserRouter>
      <Switch> 
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
