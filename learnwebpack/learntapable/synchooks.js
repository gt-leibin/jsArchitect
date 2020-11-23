const {SyncHook, SyncBailHook, SyncWaterfallHook, SyncLoopHook} =  require('tapable');

// 每个钩子都是一个类 构造函数 参数是字符串数组 表示参数的列表 

let hook = new SyncHook(['name', 'age', 'classs']);
hook.tap('这是第一个监听', (name, age, classs) => {
    console.log(1, name, age, classs);
});
hook.tap('这是第二个监听', (name, age, classs) => {
    console.log(2, name, age, classs);
});
hook.tap('这是第三个监听', (name, age, classs) => {
    console.log(3, name, age, classs);
});


hook.call('zhufeng', 10);


// 有一个返回 就不往下执行了
let bailhook = new SyncBailHook(['name', 'age', 'classs']);
bailhook.tap('这是第一个监听', (name, age, classs) => {
    console.log(1, name, age, classs);
});
bailhook.tap('这是第二个监听', (name, age, classs) => {
    console.log(2, name, age, classs);
    return 'lll';
});
bailhook.tap('这是第三个监听', (name, age, classs) => {
    console.log(3, name, age, classs);
});
bailhook.call('zhufeng', 10);


let syncWaterhook = new SyncWaterfallHook(['name', 'age', 'classs']);
syncWaterhook.tap('这是第一个监听', (name, age, classs) => {
    console.log(1, name, age, classs);
    return ['A', 'B', 'C'];
});
syncWaterhook.tap('这是第二个监听', (name, age, classs) => {
    console.log(2, name, age, classs);
    return 'lll';
});
syncWaterhook.tap('这是第三个监听', (name, age, classs) => {
    console.log(3, name, age, classs);
});
syncWaterhook.call('zhufeng', 10);



// 一直循环到所有钩子返回值为undefined为止   如果不是undefined 从头！！！开始循环
let syncLoophook = new SyncLoopHook(['name', 'age', 'classs']);
let count= 3;
let count1 = 2;
let count2 = 1;
syncLoophook.tap('这是第一个监听', (name, age, classs) => {
    console.log('count', count);
    if (count === 0) {
        return;
    }
    count--;
    return true;
});
syncLoophook.tap('这是第二个监听', (name, age, classs) => {
    console.log('count', count);
    if (count1 === 0) {
        return;
    }
    count--;
    return true;
    console.log(2, name, age, classs);
});
syncLoophook.tap('这是第三个监听', (name, age, classs) => {
    console.log('count', count);
    if (count2 === 0) {
        return;
    }
    count--;
    return true;
    console.log(3, name, age, classs);
});
syncLoophook.call('zhufeng', 10);


