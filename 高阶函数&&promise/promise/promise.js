const PENDING = "PENDDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"

// promise 的 处理 函数
const resolvePromiise = (promise2, x, resolve, reject) => {
	//  利用 x 判断 promise2 是否成功
	//  处理 x 的 类型 决定  resolve  和 reject
	if (promise2 === x) {
		// 自己等待自己 promise2 返回 promise2
		return reject(new TypeError(`Chaing cycle detected for promise #<promise>`))
	}
	// 判断 x 是不是 普通值
	if ((typeof x === "object" && x != null) || typeof x === "function") {
		let called ; // 默认没有调用成功 和 失败 成功 true 失败 false
		// 可能是 promise
		// 查看是否有 then 方法 不过 有可能 抛出异常
		try {
			let then = x.then
		
			if (typeof then === "function") {
				//  是 pronmsie
				x.then(
					value => {},
					reason => {}
				)
				//  等价于 x.then(()=>{}, y => {})
				then.call(
					x,
					y => {
						if (called) return
						called = true 
						resolvePromiise(promise2, y, resolve, reject)
					}, // 成功
					r => {
						if (called) return  // 防止多次调用
						called = true
						reject(r)
					} // 失败
				)
			} else {
				resolve(x)
			}
		} catch (error) {
			if (called) return 
			called = true
			reject(error) // 取then 抛出 异常
		}
	} else {
		// 不是promise
		resolve(x)
	}
}

class Promise {
	//  执行器 立即执行
	constructor(executor) {
		//  成功 值 失败 原因

		//  先把 值 和 原因 保存 然后 赋值 导出
		this.status = "PENDDING"
		this.reason = "undefined"
		this.value = "undefined"
		this.onResolvedCallbacks = [] // 解决异步 导致的pending
		this.onRejectCallbacks = []

		let resolve = value => {
			//  只有当 状态 pending 的时候 才可以 修改状态
			if (this.status === PENDING) {
				this.value = value
				this.status = FULFILLED // 成功态
				//  发布 订阅的 事件
				this.onResolvedCallbacks.forEach(fn => {
					fn()
				})
			}
		}

		let reject = reason => {
			//  只有当 状态 pending 的时候 才可以 修改状态
			if (this.status === PENDING) {
				this.reason = reason
				this.status = REJECTED // 成功态

				//  发布 失败的 订阅
				this.onRejectCallbacks.forEach(fn => {
					fn()
				})
			}
		}
		//  执行器 之前 可能会 异常
		try {
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}
	then(onFULFILLED, onREJECTED) {
		// then 的 穿透处理
		//  可选参数 没传 就给 默认 规范
		onFULFILLED = typeof onFULFILLED === "function" ? onFULFILLED : val => val
		onREJECTED = typeof onFULFILLED === "function" ? onFULFILLED : err => {throw err}
		//  then 方法 调用后 应该 返回一个 新的 promise
		let promise2 = new Promise((resolve, reject) => {
			// 拿到 then 成功 或者失败后的 结果  抛出
			// let x = onFULFILLED(this.value) // 将 then 中的 方法执行
			// resolve(x) // 并将结果 传递到 resolve 中 去
			if (this.status === FULFILLED) {
				// 当 报错  就会 抛出 执行 reject

				// 当前 onFulfilled , on rejected  不能再当前的 上下文 中执行, 为了 确保 promise2 存在
				setTimeout(() => {
					try {
						let x = onFULFILLED(this.value)
						//  如果 返回 promise
						resolvePromiise(promsie2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				})
			}
			if (this.status === REJECTED) {
				setTimeout(() => {
					try {
						let x = onFULFILLED(this.value)
						//  如果 返回 promise
						resolvePromiise(promsie2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				})
			}
			//  异步情况下 导致的 pending 处理 同时满足 PromiseA+ 的 then 可以多次调用 发布订阅
			if (this.status === PENDING) {
				this.onRejectCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onFULFILLED(this.value)
							//  如果 返回 promise
							resolvePromiise(promsie2, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					})
				}),
					this.onResolvedCallbacks.push(() => {
						setTimeout(() => {
							try {
								let x = onFULFILLED(this.value)
								//  如果 返回 promise
								resolvePromiise(promsie2, x, resolve, reject)
							} catch (error) {
								reject(error)
							}
						})
					})
			}
		})
		return promise2
	}
}

module.exports = Promise
