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

## 前言：安装node.js=>https://nodejs.org/en/=>稳定版本 
本框架基于node.js v8.9.1
***
## Middleware 中间件
 中间件形式是基于koa2,基于洋葱圈模型。每次我们编写一个中间件，就相当于在洋葱外面包了一层。
### 编写中间件

***
### 写法 在middleware文件夹下general.js内添加如下代码或是新建文件并将文件名添加进app/index.js MIDDLEWARES数组里引入
```javascript
export const addBodyParser = app => {
  const middleFn = (ctx,next) => {
    // ...
  }
  app.use(middleFn)
}
```
## Router&Controller

简单的说 Controller 负责解析用户的输入，处理后返回相应的结果，例如

* 在 RESTful 接口中，Controller 接受用户的参数，从数据库中查找内容返回给用户或者将用户的请求更新到数据库中。
* 在 HTML 页面请求中，Controller 根据用户访问不同的 URL，渲染不同的模板得到 HTML 返回给用户。
* 在代理服务器中，Controller 将用户的请求转发到其他服务器上，并将其他服务器的处理结果返回给用户。

### 编写路由及controller
***
### 写法 在routes文件夹下新建.js文件写法如下 @Controller()是路径的前缀符合restful的api架构 @符号是指代修饰器 修饰下面的controller类
* https://api.example.com/api/admin/:id
* https://api.example.com/api/admin/login
```javascript
import {
  Controller,
  Post,
  Auth,
  Get,
  Put,
  Delete,
  Required,
} from '../decorator/router'

@Controller('/api/admin')
export default class Home {
@Get('/:id')
async getHome (ctx, next) {
  ctx.body = {
    token: ctx.header.authorization,
    data: list,
  }
 }

@Post('/login')
@Required({    
  body: ['name', 'password']
})
async login (ctx, next) {
  const { name, password } = ctx.request.body
  //...
 }
}

```
## Service
 
 Service 就是在复杂业务场景下用于做业务逻辑封装的一个抽象层，提供这个抽象有以下几个好处：
 * 保持 Controller 中的逻辑更加简洁。
 * 保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。
 * 将逻辑和展现分离，更容易编写测试用


### 编写service
***
### 写法 在service文件夹下新建.js文件写法如下 引入数据库模型编写业务逻辑并暴露接口
```javascript
import utils from 'utility'
import { md5Salt } from "../../config";
import adminModel from '../database/mysqlTables/admin'

export async function findDataByName(name, pass){
  const result = await adminModel.findDataByName(name)
  if(result.length !== 0){
    const res = JSON.parse(JSON.stringify(result))[0]
    if (name === res['name'] && md5Pwd(pass) === res['pass']) {
      return {
        name: res.name,
        success: true,
        data: 1,
        msg: '登录成功'
      }
    }
  }
  return {
    success: false,
    data: 0,
    msg: '用户名或密码错误'
  }
}

```
## 单元测试
 
它能带给我们很多保障：
 * 代码质量持续有保障。
 * 重构正确性保障 Controller 重复调用。
 * 自动化运行。

基础配置
 * 测试框架：Mocha
 * 断言库：should
 * 测试HTTP接口：superTest
***
### 写法 参考test文件夹 运行测试 mocha test/test2.js || npm test test/test2.js
```javascript
var request = require('supertest')
const should = require('should')

it("should return success",function(done){
  request('http://120.78.139.243')
          .post('/admin/login')
          .send({
            name: 'ww',
            password:  "ww"
          })
          .expect(200)
          .expect(function (res) {
            var data = res.body
            console.log(data)
            data.name.should.equal('ww')
          })
          .end(done)
})
```
## pm2上线部署
 
安装pm2 npm i pm2 -g

***
### 将服务器的公钥和本地公钥 加入git私有库然后运行 npm run fdeploy(第一次部署) 以后部署运行npm run deploy

### pm2.json
```javascript
{
  "apps": [
    {
      "name": "ht-node",//服务名称
      "script": "./start.js",//默认
      "env": {
        "COMMON_VARIABLE": "true"//默认
      },
      "env_produciton": {
        "NODE_ENV": "production"//默认
      }
    }
  ],
  "deploy": {
    "production": {
      "user": "root",//服务器用户名
      "host": ["120.78.139.243"],//服务器IP
      "prot": "22",//服务器端口
      "ref": "origin/master",//管理git分支
      "repo": "git@gitee.com:markwang2764/ht-node.git",//git
      "path": "/www/website/production",//部署服务器路径
      "ssh_options": "StrictHostKeyChecking=no",//默认
      "post-deploy": "npm i --registry=https://registry.npm.taobao.org && pm2 startOrRestart pm2.json --env production",//默认
      "env":{
        "NODE_ENV": "production"      }//默认
    }
  }
}
```
## npm 命令
 
* npm start : 启动服务
* npm test test/test.js : 测试用例
* npm run fdeploy : 第一次线上部署
* npm run deploy : 正常部署
* npm run api : 导出apidoc