1. 对于基本类型 commonjs输出的是值的拷贝 。对于引用类型，效果同引用类型的赋值操作， es6模块输出的值的引用 对于对象类型来说 同commonjs
2. commonjs  require  是同步的 执行完毕后才会继续往下执行，
3. commonjs 模块是运行时加载 es6模块是编译时输出接口
4. export 有变量提升的效果 import 优先执行 
5. commonjs循环引用问题  CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。  es6模块中  任何时候都能引用最新当前值
6. import 支持动态导入 pormise