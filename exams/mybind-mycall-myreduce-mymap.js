// 自己实现mybind mycall

console.log([1,2,3].reduce((accu, cur) => {
    return accu + cur;
}, 0));
// callback(accu, curr): accu 
Array.prototype.myreduce = function(callback, initial) {
    let accu = (initial == undefined) ? this[0] : initial;
    
    for (let ind =  0; ind < this.length; ind++) {
        accu = callback(accu, this[ind], ind, this);
    }

    return accu;
}

console.log([1,2,3].myreduce((accu, cur) => {
    return accu + cur;
}, 0));

const obj = {
    x: 12,
    showx() {
        console.log(this.x);
    }
};
// obj.showx() // 12
const showx = obj.showx;
// showx(); // undefined
// showx.call(obj); // 12
Function.prototype.mycall = function(context, ...args) {
    const ctx = context || window;
    ctx.fn = this;
    const res = ctx.fn(...args);
    return res;
}
showx.mycall(obj); // 12
