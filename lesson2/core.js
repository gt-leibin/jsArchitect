
// nodejs调试
// node --inspect-brk
// vscode
// node 命令行
// http://nodejs.cn/api/debugger.html

// http://nodejs.cn/api/inspector.html

// 会分析node源码
// loader.js
// module原型上有require方法
// module._load 加载模块 返回module.exports
// module.reoslveFilename 解析文件名
// module._cache 缓存模块
// new Module 创建模块 id exports 等属性
// tryModuleLoad 尝试加载模块
// module.paths 第三方模块加载路径
// 获取当前模块扩展名 策略模式

// 获取文件内容
// 调用module._compile方法
// 将用户内容包裹到一个字符串函数、
// 加上各种参数 vm.runInContext  虚拟机中运行

// module.exports 与 exports 区别  var exports = this.exports  ln 798





const a = '111';
console.log(a);


// 循环加载怎么处理
// moduele.exports  === exports === this

let exports = module.exports = {}
// 变量声明的时候 一块声明的


// module.exports = {}  exports.xx = xx  才有效 

// require 语法是同步的 fs.readFileSync
// 最终require返回的是module。exports的结果
// 模块是动态加载 每次require都是最新的module.exports 
// 循环引用一般不会出现，出现只能引用部分值





