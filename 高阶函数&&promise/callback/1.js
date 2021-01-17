// 高阶函数
// 一个函数的参数是一个函数（回调）
// 一个函数返回一个函数（拆分）


//  函数的before
// 希望 将核心函数提取出来， 在外面增加功能

/* 重写原型方法 */

// js 的核心就是回调
Function.prototype.before = function(beforeFun) {
  return (...args)=>{
    beforeFun()
    this(...args) // 箭头函数向上级作用域查找
  }
}

/* AOP 切片 装饰 */
const say = (...arg)=>{
  console.log('',arg);
  
}

const newSay = say.before(()=>{
 console.log('你好');
})


newSay('说话')

/* react 事务的概念 可以在前面和后面同时增加方法 */