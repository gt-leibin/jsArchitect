// 遍历一个对象
const aa = {
    a: '1',
    b: true,
    cc: {
        cc: 33
    }
};

aa[Symbol.iterator] = function () {
    const keys = Object.keys(this);
    let ind = 0;
    const self = this;
    return {
        next() {
            const curr = keys[ind++];
            return {
                value: self[curr] || null,
                done: ind >= keys.length
            }
        }
    }
};

const gen = aa[Symbol.iterator]();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
