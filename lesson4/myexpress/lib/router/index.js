const url = require('url');
const methods = require('methods');
const Route = require('./route');
const Layer =  require('./layer');

/**
 * Router
 *
 * @class
 */

function Router() {
    // 维护所有的路由数据
    this.stack = [];
}

methods.forEach(method => {
    Router.prototype[method] = function(path, handlers) {
        // 用户调用get 时，需要保存成一个layer 放到栈中
        // 产生一个Route实例，和当前layer创造关系
        // 要将route的dispatch方法存在layer上
        let route = this.Route(path);
        // 让route 记录用户传入的方法
        route.get(handlers);
    };
})


// 循环查找路由 找不到 done 处理
Router.prototype.handle = function (req, res, out) {
    let idx = 0;
    const {pathname} = url.parse(req.url);

    let next = () => {
        if (idx >= this.stack.length) return out();
        let layer =  this.stack[idx++];
        if (layer.path === pathname) {
            layer.handler(req, res, next);
        }
        else {
            next();
        }

    }
};


Router.prototype.route = function (path) {
    const route =  new Route();
    const layer =  new Layer(path, route.dispatch.bind(route));
    layer.route = route; // 每个路由都具有一个route 属性，Shoah欧匹配到会调用route的dispath
    this.stack.push(layer);
    return route;
}
module.exports = Router;