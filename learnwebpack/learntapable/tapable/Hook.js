

class Hook {
    constructor(args) {
        this.args = args;
        if (!Array.isArray(args)) {
            this.args = [];
        }
        this.argss = args;
        this.taps = [];// 存放钩子函数
        this._x = undefined; // 用于村村

    },
    tap(name, fn) {
        
    }
    call() {}

}