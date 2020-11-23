// 模块化规范
## commonjs规范
- es6 module
- umd （如果浏览器不支持commonjs requirejs 直接放到window上）
- amd  require.js 
- cmd sea.js 

## commonjs规范
- 可以将复杂的代码查分成小的模块，方便管理维护
- 每个模块之间内容都是相互独立的，互不影响，解决变量名冲突问题  单例模式

### 规范定义 http://www.commonjs.org/
- 每个文件都是一个模块
- 如果你希望模块中的变量被别人使用，可以使用module.exports 导出这个变量
- 如果另一个模块想使用这个模块导出的结果 需要使用require 来引入

## 模块的分类
- require('fs') 核心模块、内置模块 node运行时自己提供的
- require('command') 别人写的模块 通过npm github 安装的
- 自定义的模块require('./promise') 引用时带着路径

## 核心模块




