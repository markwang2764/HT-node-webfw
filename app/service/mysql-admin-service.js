import utils from 'utility'
import { md5Salt } from "../../config";
import adminModel from '../database/mysqlTables/admin'
let success = false
let data = 0
let msg = ''
export async function findDataByName(name, pass){
  await adminModel.findDataByName(name)
  .then(result=>{
    var res=JSON.parse(JSON.stringify(result))[0]
    if (name === res['name'] && md5Pwd(pass) === res['pass']) {
        data = 1
        success = true
        msg= '登录成功'
    }else{
      data = 0
      success = false
      msg= '登录名或密码错误'
    }
  })
  return {
    success,
    data,
    msg
  }
}
export async function insertUserData(name, pass) {
 await adminModel.findDataByName(name)
  .then(result=>{
    // var res=JSON.parse(JSON.stringify(reslut))
    if (result.length){
      try {
        data = 0
        success = false
        msg= '用户名重复'
      }catch (error){
        resolve(error)
        console.log(error)
      }
    }else{
      data = 1
      success = true
      msg= '注册成功'
      adminModel.insertData([name, md5Pwd(pass)])
    }
  })
  return {
    success,
    data,
    msg
  }
}
function md5Pwd(pwd) {
  return utils.md5(utils.md5(pwd+md5Salt))
}