/**
 * 手写promise记录
 *
 * @file promise.js
 * @author binlabs00@gmail.com
 * @description 参考https://promisesaplus.com/ Promises/ A+ 规范
 */



const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
const PENDING = 'PENDING';


/**
 * 
 * @param {*} promise promise实例
 * @param {*} x onResolved 或者onRejected 的返回值
 * @param {*} resolve promise构造函数中的成功处理函数
 * @param {*} reject promise构造函数中的失败处理函数
 */
function resolvePromise(promise, x, resolve, reject) {
    // 循环使用，不允许自己等待自己完成的错误实现
    if (promise === x) {
        return reject(new TypeError('Chainding cycle deteced for promise #<Promise>'));
    }
    // 防止多次执行
    let called = false;
    // 如果是对象或者函数
    // TODO typeof x === 'function' ??什么时候？
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                // 直接调用then.call 就可以，因为x.then 会再次取值
                then.call(x, y => {
                    if (called) {
                        return;
                    }
                    called = true;
                    // 根据promise状态决定成功还是失败
                    resolvePromise(promise, y, resolve, reject);
                }, e => {
                    if (called) {
                        return;
                    }
                    called = true;
                    reject(e);
                });
            }
            else {
                resolve(x);
            }
        }
        catch (e) {
            if (called) {
                return;
            }
            called = true;
            reject(e);
        }
    }
    // 一个普通值 value  比如 123 undefined {} 数组等没可以看
    else {
        resolve(x);
    }

    // 后续的逻辑，需要保证各个不同的库实现相互调用
}

class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.value = null;
        this.reson = null;
        // 存成功的回调
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        const reject = reason => {
            // 确定状态变化，从 PENDING => REJECTED
            if (this.state === PENDING) {
                this.reason = reason;
                this.state = REJECTED;
                // 当rejected时，将所有的失败的回调onRejected都执行一遍

                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };

        const resolve = data => {

            // 递归解析 ，直到获得一个普通值
            if (data instanceof Promise) {
                return data.then(resolve, reject);
            }

            // 确定状态变化，从 PENDING => RESOLVED
            if (this.state === PENDING) {
                this.value = data;
                this.state = RESOLVED;

                // 当resolve时，将所有的成功的回调onFulfiled都执行一遍
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        };

        try {
            // 立即执行
            executor(resolve, reject);
        }
        catch (e) {
            reject(e);
        }
    }
    // 发布订阅模式，当前状态是pending 先存一下成功失败 回调，等有结果之后在调用
    // 异步逻辑 发布订阅模式
    // promise then 中成功和失败的回调返回值可以传递到下一个then中
    // 如果返回的是普通值【promise/A+ 规范中定义了这个普通值为 'value'， 这个value 只要是一个普通值，包括undefined null 一个成功的promise等】 都会传入下一个then的成功的回调中
    // 如果return 一个error throw new error 或者 一个 rejected的promise，传递到下一个then中的失败回调中
    // 如果离自己最近的then没有错误处理（没写onrejected），则会继续向下找
    // 每次执行完promise.then 方法返回的都是一个新的promise，如果返回上一个promise的上下文this，则意味着之前有结果的promsie，状态重新产生了变化，不符合规范

    // then 链式调用,每次调用then 都返回一个新的promise,一旦成功或者失败，就不能更改状态


    then(onFulfiled, onRejected) {
        // onFulfiled , onRejected 可以为空，如果是空的 黑一个默认的方法，确保多次调用then，resove的值多次往下传递 p.then().then().then(console.log)
        onFulfiled = typeof onFulfiled === 'function' ? onFulfiled : v => v;
        // 妙啊
        // 如果有错误，then中没有rejected，就默认往下传递错误
        onRejected = typeof onRejected === 'function' ? onRejected : e => {
            throw e;
        };
        const promise2 = new Promise((resolve, reject) => {
            if (this.state === RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = onFulfiled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
               
            }
    
            if (this.state === PENDING) {
                // 没直接存onFulfiled方法，而是对其做了一层拦截，也就是切片，方便添加其他逻辑
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfiled && onFulfiled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);

                  
                });
    
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected && onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    }


    catch(errcb) {
        // 利用已有的promise实例，只不过一个onFulfiled 参数为空then方法，还可以继续返回值 供下面的then处理
        return this.then(null, errcb);
    }

    // 不管上一个then十成功还是失败，都会进入finally，执行一个处理逻辑，但是该处理逻辑的返回值不会继续乡下传递，而是传递finally接受到的返回值给下一个then，
    finally(callback) {
        return this.then(
            value => Promise.resolve(callback()).then(() => value),
            reason => Promise.resolve(callback()).then(() => {
                throw reason;
            }));
    }

    // 返回一个新的resolved的promise
    static resolve(data) {
        return new Promise((resolve, reject) => {
            resolve(data);
        });
    }

    // 返回一个新的rejected的promise
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    }


}


// Promise.resolve(new Promise((res, rej) => {
//     setTimeout(() => {
//         rej('ok');
//     }, 100);
// })).finally(value => {
//     console.log('finally');
//     return 'lllok';
// }).catch(err => {
//     console.log('err', err);
//     return  'received err' + err;
// }).then(val => {
//     console.log('val', val);
// }, reason => {
//     console.log('reason', reason);
// });


module.exports = Promise;
// let p = new Promise((resolve, reject) => {
//     // throw 
//     setTimeout(() => {
//         resolve(' ok');
//     }, 1000);
// });


// p.then(res => {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             res(new Promise((rr, rj) => {
//                 // rr(2009);
//                 throw 'eeeeerr'
//             }));
//         }, 1000);
//     });
// }, reason => {
//     console.log('reason', reason);
//     //   return new Error('error');
// }).then().then().then(res => {
//     console.log('res2', res);
// }, rej => {
//     console.log('rej2', rej);
// });

// promise2.then(res => {
//    console.log('res2', res);

// }, rejected => {
//     console.log('reason2', reason);
// });

// TODO
// 箭头函数this 是声明时候的上下文？


