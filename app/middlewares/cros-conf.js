function crosConf (ctx,next) {
    ctx.set('Access-Control-Allow-Origin', '*')
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