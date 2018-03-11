# 					<center>node.js - koa2文档</center>
## 目录结构

```html
  ht-node
  |--apidoc(api文档)
  |--app
     |——dababase(数据库)
     |   |——mongoSchemas(mongoose模型文件夹)
     |       ↪︎admin.js(用户登录数据表)
     |   |——mysqlTables(mysql建表文件夹)
     |       ↪︎admin.js(用户登录数据表)
     |——decorator(装饰器文件)
     |   ↪︎router.js(路由装饰器：扩展路由方法)
     |——middlewares(koa2中间件)
     |   ↪︎cors-corf.js(cors跨域配置)
     |   ↪︎general.js(koa2常用中间件)
     |   ↪︎mongodb.js(mongodb连接池)
     |   ↪︎mysql.js(mysql连接池)
     |   ↪︎router.js(初始化路由)
     |——routes(路由文件夹[Controller:解析用户的输入处理返回响应的结果])
     |   ↪︎home.js(测试用户主页)
     |   ↪︎mongo-admin.js(mongo登录注册路由)
     |   ↪︎mysql-admin.js(mysql登录注册路由)
     |——service(model文件夹[编写业务逻辑层])
     |   ↪︎mongo-admin-service.js(mongo登录注册业务逻辑)
     |   ↪︎mysql-admin-service.js(mysql登录注册业务逻辑)
     |——utils(工具文件夹[可选])
     |↪︎index.js(服务入口)
  |--config(配置文件)
      ↪︎index.js
      ↪︎mongodb.js
      ↪︎mysql.js
  |--test(用于单元测试)
  

```