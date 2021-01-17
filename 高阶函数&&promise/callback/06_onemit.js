/*  发布订阅 */
const fs = require('fs')
let person = {}

/*  声明一个 发布订阅 模型 */
let e = {
  arr: [], // 存放订阅的 事件
  on(fn){ // 订阅
    this.arr.push(fn) // 每次调用 on 的时候 我就把 调用on 的 函数存放到 数组中
  },
  emit() {
    this.arr.forEach((fn) => {
     fn()
    })
  }
}

e.on(()=>{
 if (Object.keys(person).length == 2){
   console.log('执行person',person);
 }
})

// e.on(()=>{
//  console.log('ok')
// })

fs.readFile('name.txt', 'utf8', (error, data)=>{
  console.log(data, 'data')
 //  console.log(error, 'err')
   person['name'] = data 
   e.emit() // 发布
 })
 
 fs.readFile('age.text', 'utf8' , (error, data)=>{
   // console.log('data',data);
   person['age'] = data
   e.emit()
 })
 /*  观察者 模式 */ 
//   发布订阅 和 观察者 模式 区别

//  发布和 订阅 主机之间 没有 关系 发布方 声明了 一个  空间 订阅方  往这个空间里 存放事件  
//  发布订阅 没有 关系
//  观察者模式（vue watch）   我家 小宝宝 小宝宝 ： 被观察者   我 观察者   