const Koa = require('koa');
const Router = require('@koa/router');
const session = require('koa-session');
const app = new Koa();

let router = new Router();
app.keys = ['asdas'];

app.use(session({
    maxAge: 10 * 1000
}, app));

// session 是基于cookie的 一般存于redis
// const session = {};
const cardName = '';

router.get('/visit', async (ctx, next) => {
    // let visit = ctx.cookies.get('visit') || 0;
    // visit++;
    // ctx.cookies.set('visit', `${visit}`);
    // ctx.body = 'setr cookie';


    let visit = ctx.session.visit || 0;
    // visit++;
    ctx.sesion.visit = visit++;
    ctx.body = 'ctx.sesion.visit' + ctx.sesion.visit;

});


app.use(router.routes());
app.listen(9001, () => {
    console.log('app is listening 9001');
});


