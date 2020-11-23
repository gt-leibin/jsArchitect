// 自定义一个对象的类型 改变 Object.prototype.toString.call(obj) 的返回值
// Object[Symbol.Tag]


// 定义属性
let obj = {};
let ageVal = 20;
Object.defineProperty(obj, 'age', {
    // value: 20,
    // writable: true,
    get() {
        return ageVal;
    },
    set(newVal) {
        ageVal = newVal;
    }
});
console.log('obj', obj.age);

// 二进制运算 
let a = 0b1000;
let b = 0b110;

console.log(a | b);


console.log('this', global)