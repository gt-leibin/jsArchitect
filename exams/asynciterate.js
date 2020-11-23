// 串行异步

function forEach(arr, asyncCb) {
    arr.reduce((pre, cur) => {
        return pre.then(() => asyncCb(cur));
    }, Promise.resolve())
};

forEach([1,2,3,4], i => {
    return new Promise((resolve, rej) => {
        setTimeout(() => {
            console.log(i);
            resolve(i);
        }, i * 1000);
    });
});



