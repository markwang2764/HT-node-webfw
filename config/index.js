const HOST = process.env.HOST || 'localhost'
const env = process.env.NODE_ENV || 'development'
const mysql = require('./mysql')
module.exports = {
  HOST,
  env,
  ...mysql,
  port: env=='development'?4455:8080
}
