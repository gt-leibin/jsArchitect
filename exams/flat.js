// https://github.com/pfan123/Articles/issues/50
// 递归展平数组

const testarr = [1, 2, [4, 5, [6, 7, 8, [7, 8, 6]]]];
function flatDeep(arr) {
    // Recursively flatten arrays (susceptible to call stack limits)

    function isFlatable(val) {
        return val && Array.isArray(val) && val.length;
    }
    const result = [];
    // 最大限制
    let depth = 1 / 0;

    function _flatDeep(arr) {
        let res = [];
        if (!isFlatable(arr)) {
            return [arr];
        }
        const length = arr.length;
        let ind = 0;

        while (ind < length && depth) {
            if (isFlatable(arr[ind])) {
                return res.concat(_flatDeep(arr[ind]));
            }
            else {
                res.push(arr[ind]);
                // console.log(result);
            }
            ind++;
            depth--;
        }
        return res;
    }
    return _flatDeep(arr);

}
console.log(flatDeep([1,2,[3,4,[5,7,[7,8,[8,10]]]]]))

// 解决递归栈溢出 递归爆栈
// 循环代替递归
// 使用尾递归优化 es6 标准但是实现起来 看浏览器具体情况，并不是每个浏览器都实现了优化
// 事件驱动


// 事件驱动 将函数引用存储起来，并在适当的时候调用，不会形成一层嵌套一层，下一个函数执行时，进入了另一个宏任务中。上一个函数已经执行完毕，不会同步去执行
// 如何知道结束了递归？

function flatDeep2(arr) {
    const result = [];
    function isFlatable(val) {
        return val && Array.isArray(val) && val.length;
    }

    if (!isFlatable(arr)) {
        return arr;
    }
    function _flatDeep(arr) {
        if (!isFlatable(arr)) {
            return arr;
        }
        const length = arr.length;
        let ind = 0;

        // 循环
        while (ind < length) {
            if (isFlatable(arr[ind])) {
                (val => {
                    setTimeout(() => {
                        _flatDeep(val);
                    }, 0);
                })(arr[ind]);
            }
            else {
                result.push(arr[ind]);
                console.log(result);
            }
            ind++;
        }
    }
    _flatDeep(arr);

}

// flatDeep2([1,2,[3,4,[5,7,[7,8,[8,10]]]]])



// 如果只有数字 字符串 布尔值
// console.log([1,2,[3,4,[5,7,[7,8,[8,10]]]]].toString())
function easyFlat(arr) {
    return arr.toString().split(',');
}

console.log(easyFlat([1, 2, [3, true, 4, 'cc', [5, 7, [7, '8', 'www', [8, 10]]]]]));

// 测试调用栈有多深？
function maxCallStack() {
    const aa = 12;
    try {
        return 1 + maxCallStack();
    }
    catch(e){
        return 1;
    }
}
console.log(maxCallStack());



function* genFlat(arr) {
    const len = arr.length;
    for (let i = 0; i<len; i++) {
        if (!Array.isArray(arr[i])) {
            yield arr[i];
        }
        else {
            yield* genFlat(arr);
        }
    }
}

function* genFlat1(arr) {
    let ind = 0;
    const len = arr.length;
    for (ind=0;ind< len; ind++){
        if (Array.isArray(arr[ind])) {
            yield* genFlat(arr[ind])
        } 
        else {
            yield arr[ind];
        }
    }

}
// const gen = genFlat(testarr);
// console.log([...gen]);
function timeSpend(name = '', count = 100000, work = () => {}) {
    console.time(name)
    let _count = count;
    while (count--) {
        work && work();
    }
    console.timeEnd(name);
}

function genFlatCount() {
    console.time('flat arr')
    let count = 100000
    while (count--) {
        [...genFlat(arr)]
    }
    console.timeEnd('flat arr')
    
}



function isObj(tar) {
    return Object.prototype.toString.call(tar) === '[object object]';
}


console.log(Object.prototype.toString.call({}))
