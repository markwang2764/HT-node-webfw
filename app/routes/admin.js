import {
  Controller,
  Post,
  Auth,
  Get,
  Required,
} from '../decorator/router'
import { insertUserData,findDataByName } from '../service/mysql-admin-service';

@Controller('/admin')
export default class AdminRouter {
  @Post('/register')
  @Required({
    body: ['name', 'password']
  })
  async adminRegister (ctx, next) {
    const { name, password } = ctx.request.body
    const result = await insertUserData(name,password)
    return (ctx.body = result)
  }
  @Post('/login')
  @Required({
    body: ['name', 'password']
  })
  async adminLogin (ctx, next) {
    const { name, password } = ctx.request.body
    const result = await findDataByName(name,password)
    return (ctx.body = result)
  }
}
