// 函数柯里化 就是将一个函数拆分成多个函数 
//  好处 把函数 功能柯里化
//  判断类型 Object.prototype,toString.call()
// console.log(Object.prototype.toString.call([]))

//  封装  高阶函数中包含柯里化  可以绑定参数 bind
// const checkType = type => {
// 	// return Object.prototype.toString.call(content) === `[object ${type}]`
// 	return content => {
// 		return Object.prototype.toString.call(content) === `[object ${type}]`
// 	}
// } 

// let utils = {},
// 	types = ["Number", "String", "Boolean"]
// types.forEach(type => {
// 	utils[`is${type}`] = checkType(type)
// })
// // 闭包
// // let isString = checkType("String")
// // console.log(isString('123'));
// // console.log(isString('4565'));

// /* 封装的更加灵活一些 */
// console.log("utils.isNumber(123)", utils.isNumber("123"))

// /* 面试题 函数 柯里化 怎么实现 ？ */
/* 通用的柯里化 */
// const add = (a, b, c, d, e) => {
// 	return a + b + c + d + e
// }

// const curring = (fn, resArr = []) => {
//   let size = fn.length
//   return (...res)=>{
//     resArr = resArr.concat(res)
//     if (resArr.length < size) {
//       return curring(fn, resArr )
//     }
//     return fn(...resArr)
//   }
// }

// const r = curring(add)(1)(2)(3,4,5)
// console.log(r)

//  使用封装的 柯里化函数
const curring = (fn, resArr = []) => {
  let size = fn.length
  return (...res)=>{
    resArr = resArr.concat(res)
    if (resArr.length < size) {
      return curring(fn, resArr )
    }
    return fn(...resArr)
  }
}
const checkType = (type,content) => {
	return Object.prototype.toString.call(content) === `[object ${type}]`
} 

let utils = {}, types = ['String', "Boolean", 'Number'];
types.forEach(type => {
 utils[`is${type}`] = curring(checkType)(type) // 先传入一个参数
});

let r = utils.isString(1)


console.log(r)


/*  after */