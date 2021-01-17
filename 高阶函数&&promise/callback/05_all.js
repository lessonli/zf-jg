//  我们希望 读取数据 node 同步 会等待同步 代码都知执行 完毕 后再执行
const fs = require('fs')

let person = {}
fs.readFile('name.txt', 'utf8', (error, data)=>{
 console.log(data, 'data')
//  console.log(error, 'err')
  person['name'] = data 
  newAfter()
})

fs.readFile('age.text', 'utf8' , (error, data)=>{
  // console.log('data',data);
  person['age'] = data 
  newAfter()
})
/*  如何实现 同步呢   并发的 问题 怎么解决 ？  */
/*  1 利用after  定时器 或者? 生命 变量*/
const after = (timers, fn) => { 
  return ()=>{
   if (--timers === 0 ) {
     fn()
   } 
  }
} 

let newAfter =  after(2, ()=>{
  console.log('newAfter',person);
  
})
/*  2. 利用 发布订阅  */
/*  观察者模式   发布订阅  */
