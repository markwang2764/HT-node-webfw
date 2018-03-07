import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import jwtKoa from 'koa-jwt'
import { tokenKey } from '../../config'
export const addBodyParser = app => {
  app.use(bodyParser())
}
export const addToken = app => {
  app.use(
    jwtKoa({tokenKey}).unless({ path: [/^\/admin\/login/,/^\/admin\/register/] })
  )
}
export const addLogger = app => {
  app.use(logger())
}

