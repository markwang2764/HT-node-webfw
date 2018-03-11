import {
  Controller,
  Post,
  Auth,
  Get,
  Required,
} from '../decorator/router'

@Controller('/api/home')
export default class Home {
   /**
 * @apiGroup home
 * @api {get} /home
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind3IiwiZXhwIjoxNTIwNTg0MzM5LCJpYXQiOjE1MjA0OTc5Mzl9.41NQDKypfVX2q7V9oicfwWSH1k92-DAv4G6JD"
 *     }
 */
@Get('/')
async getHome (ctx, next) {
  ctx.body = {
    token: ctx.header.authorization
  }
 }

//  @Post('/test')
// async testNewApi (ctx, next) {
//   const msg = ctx.request.body
//   ctx.body = {
//     code : 1,
//     success: true,
//     data: '新增的测试接口',
//     msg: msg
//   }
//  }
}