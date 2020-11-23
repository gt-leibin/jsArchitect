const Koa = require('koa');
// const Koa = require('./lib/application');
const app =  new Koa();

app.use(async (ctx, next) => {
    ctx.body = 'hello body1';
    // next();
    // 以后适用cts变量时， 很少适用原生req res  一般使用request response
    // ctx.request 
});

app.on('error', err => {
    console.log('err', err);
})
// app.use(async (ctx, next) => {
//     await next();
//     // 以后适用cts变量时， 很少适用原生req res  一般使用request response
//     // ctx.request 
// });

// app.use(async (ctx, next) => {
//     ctx.body = 'hello body2';
//     // 以后适用cts变量时， 很少适用原生req res  一般使用request response
//     // ctx.request 
// });


// koa 中间件原理 会将所有中间件组合成一个大的promise，当这个promise 执行完毕后，会采用当前ctx.body进行结果的响应
// next前面必须有await 否则 会导致执行顺序不符合预期

// 如果都是同步函数 加不加await 都可以
// 通过多个next 将多个模块链接起来，可以决定是否向下执行 比如做权限校验
// 在中间价中封装一下方法
// 中间件 使用！！！

const port = 8001;
app.listen(port, () => {
    console.log(`server is running at ${port}`);
});