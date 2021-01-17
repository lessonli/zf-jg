/*
 1) 解决 并发问题 (同步多个 一部方法的执行结果)
 2）链式 调用   第二个接口 依赖第一个接口  回调地狱 
*/

let Promise  = require('./promise')

//  Promise 是一个 类
//  1)每次 new 一个 promise 都需要传传递 一个执行器 executor 执行器 是立即 执行的
//  2)执行器 有两个参数  resolve  reject ;

//  3）默认 promise  有三个 状态  pending  resolve rejecr

//  4）状态 一旦 改变 将 不可再 改变
//  5） 每个 promise  都有·一个 then 方法
const p = new Promise((resolve, reject) => {
  setTimeout(()=>{
    resolve("我有钱")
  }, 3000)
  // reject('我没钱')
  // throw new Error ('失败')  // 如果`抛出异常 也会 执行失败 但是 不会执行 error
})

p.then((data)=>{
 console.log(data, 'success')
}, err=>{
  console.log(err, 'faile')
} )

p.then((data)=>{
 console.log(data, 'success')
}, err=>{
  console.log(err, 'faile')
} )

p.then((data)=>{
 console.log(data, 'success')
}, err=>{
  console.log(err, 'faile')
} )

p.then((data)=>{
 console.log(data, 'success')
}, err=>{
  console.log(err, 'faile')
} )



