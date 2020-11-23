function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
}

Layer.prototype.match = function (pathname) {
    reture this.path === pathname;
}


Layer.prototype.handleRequest = function (pathname) {
    reture this.path === pathname;
}

module.exports = Layer;