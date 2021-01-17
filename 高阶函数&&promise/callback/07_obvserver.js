
class Subject { // 被观察着
  constructor(){
    this.arr = [],  // 存放 观察者 
    this.state = 'happy'
  }
  attach(guardian){  // guardian 监护人  
    this.arr.push(guardian)
  }
  setState(newState) { // 状态发生改变
    this.state = newState
    //  通知 监护人 
    this.arr.forEach((guardian)=>{
     return guardian.update(newState)
    })
  }
}

class Observer {  // 观察者 可能有多个
  constructor(nickName) {
    this.nickName = nickName
  }
 update(newState){
  console.log(this.nickName, `baby is ${newState}`);
  
 }
}



let baby = new Subject('baby')
let father = new Observer('father');
let mather = new Observer('mather');

//  观察者 与 被观察者 建立关系
baby.attach(father);
baby.attach(mather);

//  baby 的状态改变
baby.setState('cry')
baby.setState('small')