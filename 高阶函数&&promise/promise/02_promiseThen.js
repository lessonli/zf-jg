let fs = require("fs")
// fs.readFile('./name.txt', 'utf8', (err, data)=>{
//  if(err) {
//    return console.log(err, 'err')
//  }
//  fs.readFile(data, 'utf8', (err,data)=>{
//   if(err) {
//     return console.log(err, 'err2')
//   }
//   console.log(data)
//  })
// })

function readFile(...args) {
	// console.log('object', args)
	return new Promise((resolve, reject) => {
		fs.readFile(...args, (err, data) => {
			if (err) return reject(err)
			resolve(data)
		})
	})
}
//  如果返回的是一个 promise 并且 执行 并且 采用他的状态
readFile("./name.txt", "utf8")
	.then(
		data => {
			return data // 这里 如果返回的是普通值（！promise） 就会返回到外层 中去
		},
		err => {
			console.log(err)
		}
	)
	.then(value => {
		// 想让下一个 then 走失败 需要 1， 返回一个 失败的promise 2 抛出一个异常
		console.log(value + "demo")
	})
	.then(
		value => {
			//  throw new Error ('我想走catch') // 抛出错误之后会走 会在下一轮 的 err 返回
		return new Promise((resolve, reject)=>{
    //  reject('手动执行失败')
     resolve('手动执行成功')
    })
		},
		err => {
			// 如果 下一个 then 继续执行 则会 继续走 then 的成功态
			 console.log(err, '走到了err');
		}
	)
	.then(
		data => {
      console.log(data + "失败之后的then")
      return data
		},
		err => {
			console.log(err, "err123")
			return "失败之后的then"
		}
	)
	.then(
		value => {
			console.log(value, 'wewewe')
		},
		err => {
			console.log(err, "失败之后走到最后")
		}
	)

// const p = new Promise((resolve, reject)=>{

// })

// p.then()
//  链式调用