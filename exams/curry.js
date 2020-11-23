
/**
 * curry化函数
 *
 * @param {Function} fn 待反curry化的函数
 * @return curry化后的函数
 */
function curry(fn) {
    const fnParamsLength = fn.length;

    let params = [];
    return function next(...args) {
        params = [...params, ...args];
        if (params.length < fnParamsLength) {
            // 保存一下先
            return next;
        }
        return fn.apply(null, params);
    };
}


// function add(a, b, c, d, e) {
//     return a + b + c + d + e;
// }

// const sum = curry(add);
// console.log(sum(1)(1, 2, 3)(3));
// console.log(sum(1));
// console.log(sum(1));




// 反 curring 就是把原来已经固定的参数或者 this 上下文等当作参数延迟到未来传递.
// 达到 将不属于某对象的方法，用于某对象的效果

// Function.prototype.uncurrying = function() {
//     const self = this;
//     return function () {
//         Function.prototype.call.apply(self, arguments);
//     };
// }

/**
 * uncurry化函数
 *
 * @param {Function} fn 待反curry化的函数
 * @return uncurry化后的函数
 */
function uncurrying(fn) {
    return function (...args) {
        const that = args.shift();
        return fn.apply(that, args);
    };
}

// class Duck {
//     constructor () {
//         this.name = 'duck';
//     }

//     speak() {
//         console.log('speak:', this.name);
//     }
// }

// const Dog = {
//     name: 'dog'
// }


// const speak = uncurrying(Duck.prototype.speak);
// speak(Dog);



/**
 * 防抖函数 将多次执行变为一次执行
 * 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次.
 * 如果设定时间到来之前，又触发了事件，就重新开始延时。也就是说当一个用户
 * 一直触发这个函数，且每次触发函数的间隔小于既定时间，那么防抖的情况下只会执行一次。
 *
 * @param {Function} fn 需要防抖处理的fn
 * @param {number} delay 延迟时间
 * @return {Function} 处理过的fn
 */
function debounce(fn, delay) {
    const self = this;
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(self, args);
        }, delay);
    }
}

// let debounced = debounce(tag => {
//     console.log(tag);
// }, 1000);

// debounced(100);
// debounced(200);
// debounced(500);
// debounced(800);
// debounced(1000);
// debounced(1200); 

/**
 * 节流函数
 * 当持续触发事件时，保证在一定时间内只调用一次事件处理函数，
 * 假设一个用户一直触发这个函数，且每次触发小于既定值，函数节流会每隔这个时间调用一次
 *
 * @param {Function} fn 需要防抖处理的fn
 * @param {number} delay 延迟时间
 * @return {Function} 处理过的fn
 */
function throttle(fn, delay) {
    let start = Date.now();
    return function (...args) {
        const self = this;
        console.log('self', self);

        const end = Date.now();
        if ((end - start) >= delay) {
            fn.apply(self, args);
            start = Date.now();
        }
    };
}

// let throttled = throttle((tag) => {
//     console.log(tag);
// }, 3000);


// throttled('11');
// throttled('11');
// throttled('112');
// setTimeout(() => {
//     throttled(1000);
// }, 1000);
// setTimeout(() => {
//     throttled(2000);
// }, 2000);
// setTimeout(() => {
//     throttled(3000);
// }, 3000);
// setTimeout(() => {
//     throttled(4000);
// }, 4000);
// setTimeout(() => {
//     throttled(5000);
// }, 5000);
// setTimeout(() => {
//     throttled(6000);
// }, 6000);
// setTimeout(() => {
//     throttled(7000);
// }, 7000);



// base 64 没有加密功能 只是一种编码
// 可以用于传输数据 减少http请求

// base64的编码规则
// Base64要求把每三个8Bit的字节转换为四个6Bit的字节（3*8 = 4*6 = 24），然后把6Bit再添两位高位0，组成四个8Bit的字节，也就是说，转换后的字符串理论上将要比原来的长1/3。
// 将8bit * 3 表示二进制拆解成6bit * 4，然后将字母表大小写和数字 +/ 连成长度为64的字符串，将分成的6位二进制数转换成的10进制，作为序号在这个64位长度的字符串中取对应的字符，就是被转换的base64编码
// node环境 utf8编码 一个字符一个字节 一个汉字3个字节总共 24位 
// Buffer.from('我') 0xe6  0x88 0x91  
// 0xe6 => 11100110
// 0x88 => 10001000
// 0x91 => 10010001
// 不够8位自动左侧补0 凑齐8位
// 11100110 10001000 10010001 => 111001 101000 100010 010001 => 57 40 34 17
// const alphabet = ABCDEFGHIJKLMNOPKRSTUVWXYZabcdefghijklmnopkrstuvwxyz0123456789+/
// alphabet[57]+ alphabet[40] + alphabet[40] + alphabet[17]

// 不满3个字节的如何处理 https://blog.csdn.net/weixin_34361881/article/details/85699114
// a）二个字节的情况：将这二个字节的一共16个二进制位，按照上面的规则，转成三组，最后一组除了前面加两个0以外，后面也要加两个0。这样得到一个三位的Base64编码，再在末尾补上一个"="号。

/**
 * 将数组分成多个含有指定项数目的子数组
 * @param {Array|Buffer|string} arr 待分组的数组
 * @param {number} number 每组含有几项
 * @return {Array} 分好组的数组
 */
function splitByNumber(arr, number) {
    if (arr || number) {
        if ((number === 0) || (number === 1)) {
            return [arr];
        }
        const groups = [];
        // for (let i = 0; ((i+1) * number) <= arr.length; i++) {
        //     groups.push(arr.slice(i * number, (i+1) * number ));
        // }
        let i = 0;
        while (arr[(i) * number]) {
            groups.push(arr.slice(i * number, (i + 1) * number));
            i++;
        }
        return groups;
    }
}
// console.log(splitByNumber(Buffer.from('asdasds'), 2))


/**
 * 普通字符串转成base64
 * @param {string} str 需要转的字符串 
 * @return {string} 转换后的base字符串
 */
function binaryToBase64(str) {
    if (!str) {
        return;
    }

    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    function handle24byte(buf) {
        // let str = 'Mand';
        // const buf = Buffer.from(str);
        console.log('buf', buf.length);
        let totalBinaryStr = '';
        const SEP_LENGTH = 6;
        let newGroup = [];


        for (let i = 0; i < buf.length; i++) {
            // 自动补充完整8位
            let binstr = buf[i].toString('2').padStart(8, '0');
            totalBinaryStr += binstr;
            console.log(totalBinaryStr);
        }

        if (buf.length === 3) {
            let groupInd = 0;
            while ((groupInd + 1) * SEP_LENGTH <= 24) {
                newGroup.push(totalBinaryStr.slice(groupInd * SEP_LENGTH, (groupInd + 1) * SEP_LENGTH).padStart(8, '0'));
                groupInd++;
            }

        }
        // 处理只有一个字节的情况 分为3组 
        else if (buf.length === 1) {
            // 0101 0001  => 010100 01
            // 自动补充完整8位

            newGroup.push(totalBinaryStr.slice(0, 6).padStart(8, '0'));
            newGroup.push('00' + totalBinaryStr.slice(6) + '0000');

            console.log('newGroup', newGroup);

        }
        // // 处理只有两个个字节的情况 16位 需要分成3组  先取前两组 后面一组补0
        else if (buf.length === 2) {
            newGroup.push(totalBinaryStr.slice(0, 6).padStart(8, '0'));
            newGroup.push(totalBinaryStr.slice(6, 12).padStart(8, '0'));
            newGroup.push('00' + totalBinaryStr.slice(12) + '00');

            console.log('newGroup', newGroup);
        }
        console.log('newGroup', newGroup.map(binary => ALPHABET[parseInt(binary, 2)]).join('') + '='.repeat(4 - newGroup.length));

        return newGroup.map(binary => ALPHABET[parseInt(binary, 2)]).join('') + '='.repeat(4 - newGroup.length);
    }

    return splitByNumber(Buffer.from(str), 3).map(handle24byte).join('');
}

// console.log('binaryToBase64', binaryToBase64('2ds达到cdMM'));


//  控制最大访问量  

/**
 * 控制并发度的调度器
 *
 * @file maxAsyncConcurrencyLimit
 * @author leibin04
 */

/**
 * 模拟请求
 * @param {string} url 请求url
 * @return {Promise} promise 
 */
function fetchMock(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('url', url);
            resolve(url);
        }, 2000)
    });
}

/**
 * 并发控制请求，共有多个urls，每次并发maxNum个
 *
 * @param {Array} urls 请求url列表
 * @param {number} maxNum 最大个个数
 */
async function multiRequest(urls, maxNum) {
    if (urls && urls.length) {
        const tasks = [];
        const len = urls.length;
        const MAX_CONCURRENCY = maxNum;

        let idx = 0;

        while (idx < len) {
            const taskfn = url => fetchMock(url);
            tasks.push({
                taskfn,
                param: urls[idx]
            });
            idx++;
        }
        // 存放多组任务
        const groups = splitByNumber(tasks, MAX_CONCURRENCY);

        if (groups.length) {
            for (let group of groups) {
                await Promise.all(group.map(task => task.taskfn(task.param)));
            }
        }
    }

}

/**
 * 控制最大并发
 * @param {Promise} tasks 异步任务
 * @param {numbner} maxNum 最大并发📖
 */
async function multiRequest(urls, maxNum) {
    if (urls && urls.length) {
        const tasks = [];
        const len = urls.length;
        const MAX_CONCURRENCY = maxNum;

        let idx = 0;

        while (idx < len) {
            const taskfn = url => fetchMock(url);
            tasks.push({
                taskfn,
                param: urls[idx]
            });
            idx++;
        }
        // 存放多组任务
        const groups = splitByNumber(tasks, MAX_CONCURRENCY);

        if (groups.length) {
            for (let group of groups) {
                await Promise.all(group.map(task => task.taskfn(task.param)));
            }
        }
    }

}

// multiRequest(['url1', 'url2', 'url3', 'url4', 'url5', 'url6', 'url7'], 3);



function multiRequest2(urls = [], limit) {
    let tasks = [];
    let concurrent = 1;
    let res = [];
    let runner = () => {
        if (tasks.length && (concurrent++) < limit) {
            console.log('concurrent', concurrent);
            console.log('tasks', tasks);

            const done = data => {
                concurrent--;
                res.push(data);
                return;
            };

            let next = tasks.pop()().then(done).catch(done);
            next.then(runner);
        }
        else {
            console.log('res', res);
        }
    }

    if (urls && urls.length) {
        tasks = urls.map(url => () => {
            return fetchMock(url);
        });
    }

    runner();
}


multiRequest2(['url1', 'url2', 'url3', 'url4', 'url5', 'url6', 'url7'], 3);
// class LimitPromise {
//     constructor(max) {
//         // 异步任务“并发”上限
//         this._max = max
//         // 当前正在执行的任务数量
//         this._count = 0
//         // 等待执行的任务队列
//         this._taskQueue = []
//     }

//     /**
//      * 调用器，将异步任务函数和它的参数传入
//      *
//      * @param caller 异步任务函数，它必须是async函数或者返回Promise的函数
//      * @param args 异步任务函数的参数列表
//      * @return {Promise<unknown>} 返回一个新的Promise
//      */
//     call(caller, ...args) {
//         return new Promise((resolve, reject) => {
//             const task = this._createTask(caller, args, resolve, reject)
//             if (this._count >= this._max) {
//                 // console.log('count >= max, push a task to queue')
//                 this._taskQueue.push(task)
//             } else {
//                 task()
//             }
//         })
//     }

//     /**
//      * 创建一个任务
//      * @param caller 实际执行的函数
//      * @param args 执行函数的参数
//      * @param resolve
//      * @param reject
//      * @returns {Function} 返回一个任务函数
//      * @private
//      */
//     _createTask(caller, args, resolve, reject) {
//         return () => {
//             // 实际上是在这里调用了异步任务，并将异步任务的返回（resolve和reject）抛给了上层
//             caller(...args)
//                 .then(resolve)
//                 .catch(reject)
//                 .finally(() => {
//                     // 任务队列的消费区，利用Promise的finally方法，在异步任务结束后，取出下一个任务执行
//                     this._count--
//                     if (this._taskQueue.length) {
//                         // console.log('a task run over, pop a task to run')
//                         let task = this._taskQueue.shift()
//                         task()
//                     } else {
//                         // console.log('task count = ', count)
//                     }
//                 })
//             this._count++
//             // console.log('task run , task count = ', count)
//         }
//     }
// }
// const limitP = new LimitPromise(3);
// limitP.call(fetchMock, ['1','2','3','4','5', '6'], '')




// 当一个地址从输入到展示到浏览器有哪些步骤，（从网络层面来说）
// URL输入
// DNS解析
// TCP连接
// 发送HTTP请求
// 服务器处理请求
// 服务器响应请求
// 浏览器解析渲染页面
// 连接结束

// 输入浏览器回撤，会先找对应的ip地址，浏览器缓存--> 操作系统缓存--> 本地host文件 --> 路由器缓存--> ISP DNS缓存 --> 顶级DNS服务器/根DNS服务器
// 拿到ip后会 如果是http请求， 会经历三次握手，发出请求，拿到返回数据，
// 如果是基于udp的 协议  不会三次握手
// 一个请求和相应 会有多个请求、相应头信息和请求、相应体 来控制浏览器的一些行为，比如请求方法、请求状态、持久链接 、缓存、cookie 等
// 拿到对应的资源后，浏览器会根据资源类型进行相应操作 一般首先拿到的是html html会引入css js font等资源 
// 构建dom树 -> 构建render树 -> 布局render树 -> 绘制render树   这个过程一般会伴随着 reflow回流 repaint 重绘
// 浏览遇到js解析会先阻塞html渲染，因为js执行过程可能会修改DOM 所以一直到js执行结束，html才会继续渲染，这就涉及到了一些性能优化手段了
// 将js放在最后再执行，先将主要静态内容渲染出来。
// js引擎（chrome V8）是主线程是单线程，同步任务在主线程，一些耗时的任务如果执行事件过长，就会阻塞其他任务的执行
// 页面要关闭的时候 对于一些开启持久连接的请求，最后还有4次握手的关闭过程 （关闭tab标签）





/**
 * 实现一个compose函数  koa中的compose
 *
 * @param {Object} ctx 一个koa实例上下文
 */
function compose(ctx) {
    const dispatch = i => {
        if (i === this.middlewares.length) {
            return Promise.resolve();
        }
        let middleware = this.middlewares[i];
        if (middleware) {
            return Promise.resolve(middleware(ctx, () => {
                dispatch(i + 1);
            }));
        }
    };
    dispatch(0);
}


// function reduceCompose(ctx) {
//     this.middlewares.reduce((pre, cur => {
//         return pre.next(fulfiled => {
//             return cur(ctx);
//         }, reason => {
//             throw reason;
//         });
//     }, Promise.resolve()))
// }


// const EventEmitter = require('events');
// class Queue extends EventEmitter {
//     constructor(maxNum, task = () => {}) {
//         super();
//         this.list = [];
//         this.max = maxNum || 5;
//     }
//     produce() {
//         if () {

//         }
//     }

//     consume() {

//     }
// }

// 不代表不能用apply call
Function.prototype.myBind = function (...args) {
    console.log('args', args);
    const context = args[0] || {};
    // 为什么要将函数挂在context上，因为函数在执行的时候，会去找上下文，fn执行的上下文就变成了context
    // 一个对象属性函数的上下文默认就是该对象！
    context.fn = this;
    const defaultArgs = args.slice(1);
    console.log('defaultArgs', defaultArgs);

    return function (...newarg) {
        console.log('newarg', newarg);
        return context.fn(...defaultArgs, ...newarg);
    };
};

// console.log(Math.min(1, 3));
// const mymodule = {
//     x: 1,
//     showx() {
//         console.log('this.x', this.x);
//     }
// }
// const showx = mymodule.showx;
// showx();
// mymodule.showx();
// showx.myBind(mymodule)();

// // console.log(Math.min.myBind(null, 1, 3)(0, 4, 5));

// // 原型连 cocos
// Function.prototype.myapply = function () {

// }

