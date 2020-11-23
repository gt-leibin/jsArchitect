// sha256 是一种加盐算法
// base64 是一种编码方式

const crypto = require('crypto');
const val = 'asdasd';
const sign = val => {
    const str = crypto.createHmac('sha256', 'xxz').update(val).digest('base64');
    return str.replace(/\/|=|\+/, '');
}

console.log(sign('ad'));





