import {
  Controller,
  Post,
  Auth,
  Get,
  Required,
} from '../decorator/router'

@Controller('/admin')
export default class AdminRouter {
  @Get('/login')
  async adminLogin (ctx, next) {
    return (ctx.body = {
      msg: '登录成功'
    })
  }
}
