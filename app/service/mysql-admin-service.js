import adminModel from '../database/mysqlTables/admin'
let success = false
let data = 0
let msg = ''
export async function findDataByName(name, password){
  await adminModel.findDataByName(name)
  .then(result=>{
    // var res=JSON.parse(JSON.stringify(reslut))
    console.log(result)
    if (result.length){
      try {
        data = 1
        success = true
        msg= '登录成功'
      }catch (error){
        resolve(error)
        console.log(error)
      }
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
export async function insertUserData(name, password) {
 await adminModel.findDataByName(name)
  .then(result=>{
    // var res=JSON.parse(JSON.stringify(reslut))
    console.log(result)
    if (result.length){
      try {
        data = 0
        success = false
        msg= '用户存在'
      }catch (error){
        resolve(error)
        console.log(error)
      }
    }else{
      data = 1
      success = true
      msg= '注册成功'
      adminModel.insertData([name, password])
    }
  })
  return {
    success,
    data,
    msg
  }
}