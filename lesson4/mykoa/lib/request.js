const url = require('url');

const request = {
    get url() {
        return this.req.url;
    },

    get path() {
        return url.parse(this.req.path).pathname;
    },

    get query() {
        return url.parse(this.req.url).query;
    }
    // ...继续添加其他的扩展属性
}

// __defineGetter__  不属于任何规范 但是支持程度还不错
function defineGetter() {
    proto.__defineGetter__(key, function() {
        return this[target][key];
    })
}

module.exports = request;