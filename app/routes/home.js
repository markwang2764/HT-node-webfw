import {
  Controller,
  Post,
  Auth,
  Get,
  Required,
} from '../decorator/router'

@Controller('/home')
export default class Home {
   /**
 * @apiGroup home
 * @api {get} /home
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": "1",
 *       "success": true,
 *       "msg": "注册成功" 
 *     }
 */
@Get('/')
async getHome (ctx, next) {
  console.log(ctx.header)
  ctx.body = {
    token: ctx.header.authorization
  }
 }
}