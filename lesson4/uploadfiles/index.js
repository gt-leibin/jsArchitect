const Koa = require('koa');
const fs = require('fs').promises;
const path = require('path');
const parseBody = require('./parse-body')
const app = new Koa();
// body-parse middleware
app.use(parseBody());
app.use(async (ctx, next) => {
    // console.log('ctx.request.path', ctx.request.path);
    await new Promise(async (resolve, reject) => {
        if (ctx.request.path === '/upload') {
            ctx.body = '收到';
            // const arr = [];
            // ctx.request.on('data', chunk => {
            //     arr.push(arr);
            // });
            // ctx.request.on('end', () => {
            //     const totalBuf = Buffer.concat(arr);
            // });
        }
        else {
            ctx.body = await fs.readFile(path.resolve('views/index.html'), 'utf8');
        }
        resolve();
    });
});

app

const port = 8989;
app.listen(port, () => {
    console.log('app listening at ' + port);
});