import {query} from '../../middlewares/mysql'
const admin=
`create table if not exists users(
 id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL,
 pass VARCHAR(40) NOT NULL,
 PRIMARY KEY ( id )
);`

let createTable = function( sql ) {
  return query( sql, [] )
}
// 建表
createTable(admin)
// 注册用户
let insertData = function( value ) {
  let _sql = "insert into users(name,pass) values(?,?);"
  return query( _sql, value )
}

// 通过名字查找用户
let findDataByName = function (  name ) {
  let _sql = `
    SELECT * from users
      where name="${name}"
      `
  return query( _sql)
}


export default {
  query,
  createTable,
  insertData,
  findDataByName
}