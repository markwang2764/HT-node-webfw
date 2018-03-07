import mongoose from 'mongoose'
import { md5Salt } from "../../config";
const Admin = mongoose.model('Admin')
const utils = require('utility')

export async function findDataByName(name, pass) {
  const result = await Admin.findOne({name,pass:md5Pwd(pass)})
  if(result){
    if(md5Pwd(pass)===result.pass&&name===result.name){
      return {
        name: result.name,
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
  const res = await Admin.findOne({name})
  if(res){
    return {
      success: false,
      data: 0,
      msg: '用户名已存在'
    }
  }else{
    const adminModel = new Admin({name,pass:md5Pwd(pass)})
    await adminModel.save()
    return {
      success: true,
      data: 1,
      msg: '注册成功'
    }
  }
 }
function md5Pwd(pwd) {
  return utils.md5(utils.md5(pwd+md5Salt))
}