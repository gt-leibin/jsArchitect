// 发布订阅 事件驱动 事件通知 发布订阅模式

const EventEmitter = require('events');

// 实例属性和方法 每个人都有一份 互不干扰， 原型上的方法 所有人公用一份，

//  三种继承方式
// myEventEmitter.prototype.__proto__ = EventEmitter.prototype;
// myEventEmitter = Object.create(EventEmitter.prototype)
// Object.setPrototypeOf(myEventEmitter.prototype, EventEmitter.prototype)
// class myEventEmitter extends EventEmitter {}
//require('utils').inherate(myEventEmitter,EventEmitter )


// 实现一个观察者模式

// 函数对比cb === fn ？什么原理？细节  两个函数toString() 之后对比？

