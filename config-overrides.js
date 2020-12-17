/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-14 10:20:42
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-17 11:25:26
 */
const {override, fixBabelImports, addLessLoader,addWebpackAlias} = require('customize-cra');
const path = require('path');
module.exports = override(
  // 配置路径别名
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
    // components: path.resolve(__dirname, 'src/components')
  }),

  // antd实现按需打包: 
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,  // 自动打包相关的样式
  }),

  // 使用less-loader对源码中的less的变量进行重新指定
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#1DA57A'},
  }),
)