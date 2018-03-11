import Koa from 'koa'
import { resolve } from 'path'
import R from 'ramda'
import chalk from 'chalk'
import config from '../config'
require('./utils')
const MIDDLEWARES = ['cros-conf','mongodb','general','router']
 
const userMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        fn=>fn(app)
      ),
      require,
      name=>resolve(__dirname,`./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}
async function start(){
  const app = new Koa()
  const { port, env } = config
  await userMiddlewares(app)
  const server = app.listen(port, () => {
    console.log(
      process.env.NODE_ENV === 'development'
      ? `Open ${chalk.green('http://localhost:'+port)}`
      : `App listening on port ${port}`
    )
  })
  
}
start()
