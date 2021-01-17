//   after  调用多少次之后 执行 

/*  封装的实现 */
const after = (timers, fn) => { // after 可以生成一新的函数  等待海曙 执行次数 达到我们的预期后执行
  return ()=>{
   if (--timers === 0 ) {
     fn()
   } 
  }
} 


/* 使用方法 */
let newAfter = after(3, ()=>{
  console.log('执行三次之后执行')
})

newAfter()
newAfter()
newAfter()
