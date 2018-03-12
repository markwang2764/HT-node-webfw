import bodyParser from 'koa-bodyparser'
import views from 'koa-views'
import serve from 'koa-static'
import logger from 'koa-logger'
import jwtKoa from 'koa-jwt'
import jwt from 'jsonwebtoken'

import { tokenKey } from '../../config'
import {join} from 'path'

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

export const publicStatic = app => {
  app.use(serve(join(__dirname, '../../apidoc/')))
  app.use(views(join(__dirname, '../../apidoc/')))
}

export const addToken = app => {
  app.use(
    jwtKoa({secret:tokenKey}).unless({ path: [/^\/admin\/login/,/^\/admin\/register/,/^\/apidoc/] })
  )
}

export const addBodyParser = app => {
  app.use(bodyParser())
}

export const addLogger = app => {
  app.use(logger())
}
