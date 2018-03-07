import { join } from 'path'
import mongoose from 'mongoose'
import glob from 'glob'
import config from '../../config'

mongoose.Promise = global.Promise

glob.sync(join(__dirname, '../database/mongoSchema', '**/*.js')).forEach(require)

export const database = app => {
  const { mongodb } = config
  let maxConnectTimes = 0
  if (config.env === 'development') {
    mongoose.set('debug', true)
  }

  mongoose.connect(mongodb)

  mongoose.connection.on('disconnected', () => {
    maxConnectTimes ++
      if(maxConnectTimes<5){
        mongoose.connect(mongodb)
      }else{
        throw new Error('数据库出错')
      }
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB -> ', mongodb)
  })
}
