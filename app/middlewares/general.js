import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import jwtKoa from 'koa-jwt'
import jwt from 'jsonwebtoken'

import { tokenKey } from '../../config'

import { promisify } from '../utils/promisify';
const verify = promisify(jwt.verify)


export const errorHandle = app => {
  const errorHandlefn = (ctx, next) => {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          error: err.originalError ? err.originalError.message : err.message,
        };
      } else {
        throw err;
      }
    });
  }
  app.use(errorHandlefn)
}

export const addToken = app => {
  app.use(
    jwtKoa({secret:tokenKey}).unless({ path: [/^\/admin\/login/,/^\/admin\/register/] })
  )
}

export const addBodyParser = app => {
  app.use(bodyParser())
}



// export const verifyToken = app => {
  
//   console.log(2)
//   const verifyfn = async (ctx,next) => {
//     console.log(ctx.header)
//     try{
//       const token = ctx.header.token
//       console.log('token'+!token)
//       console.log(token.split(' ')[1])
//       if(!!token){
//           let payload
//           payload = await verify(token.split(' ')[1], tokenKey)
//           await next()
//           console.log(payload)
//       }else{
//         ctx.body = {
//           message: 'token 错误',
//           code: '-1'
//         }
//       }
//     }catch(err){
//       console.log(err)
//       if (err.status === 401) {
//         ctx.body = {
//           code: -1,
//           message: '认证失败'
//         }
//       } else {
//         err.status = 404
//         ctx.body = '404'
//       }
//     }
//   }
//   app.use(verifyfn) 
// }


export const addLogger = app => {
  app.use(logger())
}

