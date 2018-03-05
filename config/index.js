const HOST = process.env.HOST || 'localhost'
const env = process.env.NODE_ENV || 'development'
const database = require('./database')
module.exports = {
  HOST,
  env,
  ...database,
  port: env=='development'?3000:8080
}
