import {
  Controller,
  Post,
  Auth,
  Get,
  Required,
} from '../decorator/router'
import jwt from 'jsonwebtoken'
import {tokenKey} from '../../config'
import { insertUserData,findDataByName } from '../service/mysql-admin-service';

@Controller('/api/admin')
export default class AdminRouter {
 /**
 * @apiGroup admin
 * @api {post} /admin/register
 * @apiParam {String} name  用户名
 * @apiParam {String} password     用户密码
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": "1",
 *       "success": true,
 *       "msg": "注册成功" 
 *     }
 */
  @Post('/register')
  @Required({
    body: ['name', 'password']
  })
  async adminRegister (ctx, next) {
    const { name, password } = ctx.request.body
    const result = await insertUserData(name.Trim(),password.Trim())
    console.log(result)
    return (ctx.body = result)
  }
 /**
 * @apiGroup admin
 * @api {post} /admin/login
 * @apiParam {String} name  用户名
 * @apiParam {String} password     用户密码
 *  @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": "1",
 *       "success": true,
 *       "msg": "登录成功",
 *       "token": 'dsajkdhskadsa'
 *     }
 */
  @Post('/login')
  @Required({
    body: ['name', 'password']
  })
  async adminLogin (ctx, next) {
    const { name, password } = ctx.request.body
    console.log(name,password)
    const result = await findDataByName(name.Trim(),password.Trim())
    if(result.success){
      let username = result.name
      let token = jwt.sign({username,exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)}, tokenKey)
      return (ctx.body = {...result,token})
    }
    return (ctx.body = result)
  }
}
