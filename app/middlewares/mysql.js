const mysql = require('mysql');
const config = require('../../config')
import { join } from 'path'
import glob from 'glob'
const pool  = mysql.createPool({
  host     : config.HOST,
  user     : config.USERNAME,
  password : config.PASSWORD,
  database : config.DATABASE
});
export default  app => {
  console.log('mysql 连接池')
}
export const query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log('连接mysql失败')
        console.log(err)
        resolve( err )
      } else {
        console.log('连接mysql成功')
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            console.log('建表成功'+rows)
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}
glob.sync(join(__dirname, '../database/mysqlTables', '**/*.js')).forEach(require)

