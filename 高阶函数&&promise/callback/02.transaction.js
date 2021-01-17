//  事务 开始的时候做某些事 结束的时候再做某些事

const perform = (anymethods, wrapperss) => {
	wrapperss.forEach(wrap => {
    wrap.initilizae()
    wrap.clse()
  })
}

perform(() => {
	console.log("说话")
}, [
	{
		//  wrapper1
		//  初始化
		initilizae() {
			console.log("你好1")
		},
		clse() {
			console.log("再见1")
		}
	},
	{
		//  wrapper2
		//  初始化
		initilizae() {
			console.log("你好2")
		},
		clse() {
			console.log("再见2")
		}
	}
])
