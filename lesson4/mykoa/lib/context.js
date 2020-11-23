// 不能Object.defineProperty(obj, a, {})

// Proxy
const proto = {};

// __defineSetter__ __defineGetter__ 没有遵循任何规范 且是被废弃的，
// 但是浏览器兼容性还不错

// 定义context原型上setter getter
function defineGetter(target, key) {
    proto.__defineGetter__(key, function () {
        return this[target][key];
    });
}

function defineSetter(target, key) {
    proto.__defineSetter__(key, function (val) {
        this[target][key] = val;
    })
}
// 将ctx的以proto为原型，访问ctx.url 会顺着原型找到原型上的url，
// 访问url属性会根据上面定义的方法，
// 返回ctx.request.url
// 下同
defineGetter('request', 'url'); // ctx.url = ctx.request.url
defineGetter('request', 'path');
defineGetter('request', 'query');

defineSetter('response', 'body');
module.exports = proto;
