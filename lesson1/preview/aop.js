/**
 * 切面编程 aop, 在执行真正的任务前 ，添加前置或者后置的逻辑，也就是添加一层，添加自己的逻辑, 不更改原函数的功能代码
 */

function fn() {
    console.log('我要执行某些任务');
}

// // 高阶函数，参数是函数，或者返回值也是函数 
// // 像react vue中的高阶组件，就是返回组件的组件
// // 函数carry化
// Function.prototype.before = function(preAction) {
//     // 保存函数执行时的上下文
//     const self = this;
//     // 返回改造过的函数
//     return function (...args) {
//         preAction();
//         // 一般来说 self都是一个上下文对象，但是在这里self是一个函数，是执行before时的函数对象
//         self.apply(self, args);
//         return 'action done';
//     }
// }

Function.prototype.before = function (fn) {
    const self = this;
    return function(...args) {
        fn();
        self.apply(self, args);
    };
}


const newfn = fn.before(() => {
    console.log('执行任务前先搞点事情');
});

newfn();