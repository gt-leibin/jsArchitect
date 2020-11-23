const EventEmitter = require('events');
const http = require('http');
const request = require('./request');
const response = require('./response');
const context = require('./context');
const {Stream} = require('stream');


module.exports = class Application extends EventEmitter {
    constructor() {
        super();
        // 保存中间件函数
        this.middlewares = [];
        // 为了防止 多个实例 共享response request context
        this.response = Object.create(response);
        this.request = Object.create(request);
        this.context = Object.create(context);
    }
    use(callback) {
        // 将用户传递的callback组合起来
        this.middlewares.push(callback);
    }

    createContext(req, res) {
        // 每次请求都创建全新的上下文
        let response = Object.create(this.response);
        let request = Object.create(this.request);
        let context = Object.create(this.context);
        // 上下文中还有一个request、response对象 是自己封装的对象
        context.response = response;
        context.request = request;
        // 上下文中还有一个req 或者res 是只指代原生的req、 res
        context.request.req = context.req = req;
        context.response.res = context.res = res;
        return context;
    }

    compose(ctx) {
        const dipatch = i => {
            // 递归的终止条件，递归到最后一个的时候 直接返回 fulfiled promise
            if (i === this.middlewares.length) {
                return Promise.resolve();
            }
            let middleware = this.middlewares[i];

            // 实际执行的next 是对 用户自定义中间件的包装后的函数
            // 在这里将ctx 上下文传给每个中间件
            return Promise.resolve(middleware(ctx, () => dipatch(i + 1)));
            return Promise.resolve(middleware(ctx, () => dispath(i + 1)))
        };
        return dipatch(0);
    }
    handleRequest(req, res) {
        let ctx = this.createContext(req, res);
        this.compose(ctx).then(() => {
            let body = ctx.body;
            console.log('body', body);
            // body  string  buffer  object
            if (typeof body === 'string' || Buffer.isBuffer(body)) {
                res.end(body);
            }
            else if (typeof body === 'object') {
                res.end(JSON.stringify(body));
            }
            else if (body instanceof Stream) {
                res.setHeader('Content-Disposition', 'attachment;filename=download');
                body.pipe(res);
            }
        });

        // 当组合后的promise完成后，拿到最终的结果 响应回去
        // let body = ctx.body;
        // res.end(body);
    }

    listen(...args) {
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args);
    }
};