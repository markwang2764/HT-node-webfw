import mongoose from 'mongoose'
import { md5Salt } from "../../config";
const Admin = mongoose.model('Admin')
const utils = require('utility')
const _filter = {'pass':0,'__v':0}
let success = false
let data = 0
let msg = ''
export async function findDataByName(name, pass) {
  Admin.findOne({name,pass:md5Pwd(pass)},_filter,function(err,doc){
    if(!doc){
      success = false
      data = 0
      msg = '用户名或者密码错误'
    }else{
      success = true
      data = 1
      msg = '登录成功'
    }
  })
  return {
    success,
    data,
    msg
  }
}
export async function insertUserData(name, pass) {
  const res = await Admin.findOne({name})
  if(res){
    success = false
    data = 0
    msg = '用户名重复'
  }else{
    const adminModel = new Admin({name,pass:md5Pwd(pass)})
    await adminModel.save()
    success = true
    data = 1
    msg = '注册成功'
  }
  return {
    success,
    data,
    msg
  }
 }
function md5Pwd(pwd) {
  return utils.md5(utils.md5(pwd+md5Salt))
}