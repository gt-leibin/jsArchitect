
const http = require('http');
const url = require('url');

const methods = require('methods');

const Router = require('./router/index');

// 箭头函数没有原型
// 创建应用，路由和 逻辑分离
/**
 * 应用
 *
 * @class
 */
function Application() {
    this._router = new Router();
}
// 准备所有的路由，存到栈中
methods.forEach(method => {
    Application.prototype[method] = function (path, handler) {
        this._router[method](path, handler);
    };
});




Application.prototype.listen = function () {
    const server = http.createServer((req, res) => {
        function done() {
            res.end(`can not find ${req.method} ${req.url}`);
        }
        // 当请求来到后去遍历查找匹配的路由
        this._router.handle(req, res, done);
    });

    server.listen(...arguments);
}


module.exports = Application;
