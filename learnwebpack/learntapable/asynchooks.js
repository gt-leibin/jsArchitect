const {AsyncParallelHook, AsyncParallelBailHook} =  require('tapable');


let hook = new AsyncParallelHook(['name', 'age', 'classs']);
console.log(hook)
hook.tapPromise('这是第一个监听', (name, age, classs) => {
    console.log(1, name, age, classs);
    return Promise.resolve();
});
hook.tapPromise('这是第二个监听', (name, age, classs) => {
    console.log(2, name, age, classs);
    return Promise.resolve();
});
hook.tapPromise('这是第三个监听', (name, age, classs) => {
    console.log(3, name, age, classs);
    return Promise.resolve();
});


hook.callAsync('zhufeng', 10);

// AsyncParallelBailHook 有一个失败就都失败了 callback

// callback方式  ''  null 都是合法的返回值 都会阻止继续往下执行  undefined 才是继续往下执行



