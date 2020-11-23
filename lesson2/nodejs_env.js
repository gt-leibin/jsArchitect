const fs = require('fs');
const path = require('path');

// function someAsyncOperation(callback) {
//   // Assume this takes 95ms to complete
//   fs.readFile('/path/to/file', callback);
// }

// const timeoutScheduled = Date.now();

// setTimeout(() => {
//   const delay = Date.now() - timeoutScheduled;

//   console.log(`${delay}ms have passed since I was scheduled`);
// }, 100);

// // do someAsyncOperation which takes 95 ms to complete
// someAsyncOperation(() => {
//   const startCallback = Date.now();

//   // do something that will take 10ms...
//   while (Date.now() - startCallback < 10) {
//     // do nothing
//   }
// });


// ┌───────────────────────────┐
// ┌─>│           timers          │
// │  └─────────────┬─────────────┘
// │  ┌─────────────┴─────────────┐
// │  │     pending callbacks     │
// │  └─────────────┬─────────────┘
// │  ┌─────────────┴─────────────┐
// │  │       idle, prepare       │
// │  └─────────────┬─────────────┘      ┌───────────────┐
// │  ┌─────────────┴─────────────┐      │   incoming:   │
// │  │           poll            │<─────┤  connections, │
// │  └─────────────┬─────────────┘      │   data, etc.  │
// │  ┌─────────────┴─────────────┐      └───────────────┘
// │  │           check           │
// │  └─────────────┬─────────────┘
// │  ┌─────────────┴─────────────┐
// └──┤      close callbacks      │
//    └───────────────────────────┘

// 第一阶段 定时器
// setTimeout(()=> {
//     console.log('setTimeout first');
// }, 0);

// // 第四阶段  检测 check
// setImmediate(() => {
//     console.log('setImmediate first');

// });

// // 第三阶段
// // 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
// // fs readafile 属于 IO事件
// fs.readFile('./eventloop.html', (err, data) => {
//     setImmediate(() => {
//         console.log('setImmediate inner');
    
//     });
//     setTimeout(()=> {
//         console.log('setTimeout inner');
//     }, 0);
  
// });

// setTimeout(()=> {
//     console.log('setTimeout last');
// }, 0);
// setImmediate(() => {
//     console.log('setImmediate last');

// });

console.log(path.resolve('../module.md'));
console.log(path.join('./module.md', 'ddd'));

console.log(fs.readFileSync('module.md', 'utf8'));


const a = 100;
// 使用newFunction 创建一个带有沙箱的上下文
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
let fn = new Function('c', 'b', 'console.log(a)');

console.log(fn.toString());

// 模板引擎的实现原理 with

