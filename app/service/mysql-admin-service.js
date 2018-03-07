import utils from 'utility'
import { md5Salt } from "../../config";
import adminModel from '../database/mysqlTables/admin'

export async function findDataByName(name, pass){
  const result = await adminModel.findDataByName(name)
  if(result.length !== 0){
    const res = JSON.parse(JSON.stringify(result))[0]
    if (name === res['name'] && md5Pwd(pass) === res['pass']) {
      return {
        name: res.name,
        success: true,
        data: 1,
        msg: '登录成功'
      }
    }
  }
  return {
    success: false,
    data: 0,
    msg: '用户名或密码错误'
  }
}
export async function insertUserData(name, pass) {
 const result = await adminModel.findDataByName(name)
 const res=JSON.parse(JSON.stringify(result))[0]
 console.log(res)
 console.log(pass)
  if(!res){
    adminModel.insertData([name, md5Pwd(pass)])
    return {
      success: true,
      data: 1,
      msg: '注册成功',
    }
  }
  return {
    success: false,
    data: 0,
    msg: '用户名已存在'
  }
}
function md5Pwd(pwd) {
  return utils.md5(utils.md5(pwd+md5Salt))
}