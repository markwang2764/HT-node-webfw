export const promisify = (f) => (...args) => new Promise((resolve,reject)=>{
  args.push((err, result)=>{
    if(err) reject(err)
    else resolve(result)
  })
  f.apply(null, args)
})