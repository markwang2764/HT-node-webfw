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
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( !err ) {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

