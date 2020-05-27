// 函数柯里化

// Function.length 一个函数的形参数量
// length 是函数对象的一个属性值，指该函数有多少个必须要传入的参数，即形参的个数。

// 形参的数量不包括剩余参数(...args这样)个数，仅包括第一个具有默认值b（（a,b = 2,c ）=> {}）之前的参数个数。

// 与之对比的是，  arguments.length 是函数被调用时实际传参的个数。

// 通用的函数柯里化，通过 判断多次传给函数的参数的长度满足要求，才真正执行
const currying = (fn, arr = []) => {
    let len = fn.length;

    return function (...args) {
        const parameterArr = [...arr, ...args];
        if (parameterArr.length < len) {
            return currying(fn, parameterArr);
        }

        fn(...parameterArr);
    }
};
function sum(a, b, c, d, e, f) {
    console.log(a + b + c + d + e + f);
}
let fn = null;
fn = currying(sum)(1);
console.log(fn);

fn = fn(2);
console.log(fn);

fn = fn(3);
console.log(fn);

fn = fn(4);
console.log(fn);

fn = fn(5);
console.log(fn);

fn = fn(6);
console.log(fn);

fn = fn(7);
console.log(fn);

