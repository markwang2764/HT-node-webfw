import {HOST} from '../../config';
function crosConf (ctx,next) {
  if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
      ctx.set('Access-Control-Allow-Origin', '*')
    } else {
      ctx.set('Access-Control-Allow-Origin', HOST)
    }
    ctx.set("Access-Control-Allow-Headers", "authorization, x-requested-with, accept, origin, content-type")
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
    if(ctx.request.method == 'OPTIONS'){
      ctx.status = 200
    }else{
      return next()
    }
}
export const cros = app => {
  app.use(crosConf)
}