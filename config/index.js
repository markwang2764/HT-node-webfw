const HOST = process.env.HOST || 'localhost'
const env = process.env.NODE_ENV || 'development'
const mysql = require('./mysql')
const mongo = require('./mongdb')
module.exports = {
  HOST,
  env,
  md5Salt: 'ht_node_&&**!!',
  tokenKey: 'wqdjkwl1e21FQlk1j2',
  ...mysql,
  ...mongo,
  port: env=='development'?4455:8080
}
