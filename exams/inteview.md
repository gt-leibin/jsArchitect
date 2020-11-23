1. flat 数组打平实现 原生数组flat 方法 
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
2. 使用reduce 模拟map
```
const arr = [1,3,34,4];
const res = arr.map(x => x * 2);
console.log(res);


arr.reduce((acu, cur) => {
    acu.push(cur * 2);
    return acu;
}, [])

```


3. 排序 数组排序
function quickSort(arr = []) {
    if (arr && arr.length < 2) {
        return arr;
    }

    const pivotInd = Math.round((arr.length - 1) / 2);
    const pivot = arr.splice(pivotInd, 1);
    let left = [];
    let right = [];
    arr.forEach(x => {
        if (x <= pivot) {
            left.push(x);
        }
        else {
            right.push(x);
        }
    })
    return quickSort(left).concat(pivot, quickSort(right));

}


4. 性能优化方面的实践 小程序业务线性能优化
5. js数组和链表 插入 查询 复杂度对比 操作对比  http://www.jsphp.net/js/show-9-330-1.html
JavaScript 数组的长度和元素类型都是非固定的。因为数组的长度可随时改变，并且其数据在内存中也可以不连续，所以 JavaScript 数组不一定是密集型的，这取决于它的使用方式。一般来说，数组的这些特性会给使用带来方便，但如果这些特性不适用于你的特定使用场景的话，可以考虑使用类型数组 TypedArray。

https://blog.csdn.net/Donspeng/article/details/83444861
js 中的数组 并不都是连续的内存空间 大部分是哈希映射方式存在的 对于读取操作 哈希表效率并不高 对于增删操作效率很高 
同构（元素都是一样的）数组 会创建连续的内存分配  js中为了特定操作 可以使用arraybuffer，使用连续的内存分配

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays




6. 数组中splice方法 参数 
7. 数组中flat
- 循环+ 递归 
- 使用Array.prototype.toString()
- 使用迭代器 yield 解决递归内存 爆栈


8. 排序复杂度 https://blog.csdn.net/pange1991/article/details/85460755
9. for循环和forEach的异同

https://blog.csdn.net/ZhushiKezhang/article/details/79912434
10. JSON.stringfy 性能 安全性

//建议刷刷 https://zhuanlan.zhihu.com/p/108289604
头条二面
1. 数组中5个不重复的字符  返回3个组合 C(3,5)

```
    const combine = (n, k) => {
        const res = [];
        const helper = (start, path) => {
            if (path.length === k) {
                // 保存结果路径
                res.push(path.slice());
                return;
            }
            for (let i = start; i <= n; i++) {
                path.push(i);
                helper(i + 1, path);
                path.pop();
            }
        }
        helper(1, []);
        return res;
    }


    console.log(combine(6, 5));



```
2. 实现一个const uls = createElement('ul',{id:'aa'}, [
    createElement('ol',{id:'bb'}, ['text1']),
    createElement('ol',{id:'cc'},['text2'])
    ])

调用 uls.render() 
<ul id="aa">
    <ol id="bb">text1</ol>
    <ol id="cc">text2</ol>
</ul>

3. 实现一个lodash 中的get 方法 
{
    aa: {bb: {cc: 2}}
    bb: [2,{aa:'cc'},4]
}

get('bb..[1].aa')

4. css实现一个正方形  宽度是屏幕一半
5. jsbridge 实现 同步的调用js中的方法  同步调用端能力
6. http 队头阻塞问题  http2 是不是可以解决这个问题
7. commonjs 和 es6 模块的异同
8. 业务上性能优化措施
9. transfer-encoding  逐跳消息传输首部，仅应用于两个节点的消息传递 而不是所请求的资源本身  
分块编码 需要传输大量的数据，但是在请求没有被处理完之前不知道相应的长度  transfer-encoding: chunked 
transfer-encoding： compress
content-type 
10. cors 跨域资源共享  跨域访问其他站点资源 /client/server通过添加请求/响应头 来控制

-  简单请求  使用方法 get head post 请求资源 accept accept-language content-language content-type（text-plain、multipart/form-data、application/x-www-form-urlencoded）
- 复杂请求
-- 先发送预检请求
比如 Access-Control-Request-Method: POST
会接收到服务端反馈的响应头
Access-Control-Allow-Origin： *
Access-Control-Allow-Methods: POST, GET,
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
ccess-Control-Allow-Credentials: true
--在发送实际请求

11. options cors跨域资源共享中的预检请求 
12. transform: translateZ(0) 作用 开启GPU加速 为什么会开启gpu加速 
13. 盒模型 标准盒模型 ie 怪异盒模型



## genshuixue
1. script 脚本中的async defer DOMContentLoaded 
https://blog.csdn.net/zhq2005095/article/details/89205343
- 都是异步下载 不影响html的下载和解析
- 但是执行时机不同 defer 是在 html下载解析完在执行  async 下载完就执行
- 对DOMContentLoaded 事件触发影响也不一样 defer 会按照脚本顺序执行 都执行完了之后触发DOMContentLoaded async 执行时机不固定，谁先下载完就执行 可能在html下载渲染过程中执行 不阻塞DOMContentLoaded事件触发

2. 性能优化的一些方法
3. dom拖动实现
4. 控制最大并发请求实现
5. cors
6. 安全问题 xss csrf
###  xss 

* 做了 HTML 转义，并不等于高枕无忧。
* 对于链接跳转，如 <a href="xxx" 或 location.href="xxx"，要检验其内容，禁止以 javascript: 开头的链接，和其他非法的 scheme。
* 在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入。
* 在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
* 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
* 在标签的 href、src 等属性中，包含 javascript: 等可执行代码。
* 在 onload、onerror、onclick 等事件中，注入不受控制代码。
* 在 style 属性和标签中，包含类似 background-image:url("javascript:..."); 的代码（新版本浏览器已经可以防范）。
* 在 style 属性和标签中，包含类似 expression(...) 的 CSS 表达式代码（新版本浏览器已经可以防范）。

- DOM  类型

存储型
攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。
反射性
反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。

### csrf 跨站请求伪造
- 验证 HTTP Referer 字段
- 请求地址中添加 token 并验证
7. csp
内容安全策略 用于检测或者减轻web站点特定类型的攻击 例如xss 数据注入。该策略的实现是基于一个称作content-security-policy

Content-Security-Policy：default-src 'self'  网站管理者要求所有内容均来自站点的同一个源
Content-Security-Policy: default-src 'self' *.trusted.com
8. 网络缓存 几个缓存头信息
9. 实现一个支持过期时间的localStorage 集中处理国有过期时间


## ali 

1. service worker webworker v8 woker
2. 小程序设计从哪几个方面 优化，怎么更快？
3. 


## 猿辅导
1. es5 原型链继承 
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
  每个实例对象都有一个私有属性 __proto__ 指向它的构造函数的原型对象（prototype属性）

  __proto__ 的作用等同于 Object.getPrototypeOf Reflect.getPrototypeOf 
  __proto__ 是一个非标准但是各大浏览器都实现的属性访问符

  使用多种方式来创建原型对象 1. new 和fn.prototype   2. Object.create(fn.prototype) 3. Object.setPrototypeOf  4. __proto__  不建议使用

2. webpack gulp rollup 构建工具流程

rollup实现tree-shaking 
- 1. ES6的模块引入是静态分析的，故而可以在编译时正确判断到底加载了什么代码。 通过语法分析得知使用了哪些模块中的哪些方法
- 2. 分析程序流，判断哪些变量未被使用、引用，进而删除此代码。 
    只声明只赋值 未使用为读取的



webpack 实现tree-shaking
- 1. 配置：
```
module.exports = {
+    mode:'production',
+    devtool:false,
     module: {
        rules: [
            {
                test: /\.js/,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "babel-loader",
                        options: {
+                            presets: [["@babel/preset-env", { "modules": false }]],
                        },
                    },
                ],
            }
     }
}
```


3. 实现一个mybind方法
if (!Function.prototype.bind) (function(){
  var slice = Array.prototype.slice;
  Function.prototype.bind = function() {
    var thatFunc = this, thatArg = arguments[0];
    var args = slice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    return function(){
      var funcArgs = args.concat(slice.call(arguments))
      return thatFunc.apply(thatArg, funcArgs);
    };
  };
})();
4. 


快手 1面
1. 
```
console.log(a);

var a = 1;


暂时性死区
console.log(b); // Uncaught ReferenceError: b is not defined

let b = 2;


console.log(f()); 

function f() {

return "f";

}


console.log(g()); //  Uncaught TypeError g is not a function  

var g = function () {

return "g";

};

// 与通过  var 声明的有初始化值 undefined 的变量不同，通过 let 声明的变量直到它们的定义被执行时才初始化。
// 在变量初始化前访问该变量会导致 ReferenceError。该变量处在一个自块顶部到初始化处理的“暂存死区”中。
```


```
for (var i = 0; i < 5; i++) {

setTimeout(function () {

  console.log(i);

});

}
 输出 55555
var => let 输出 0 12345

var => const 报错  Uncaught TypeError: Assignment to constant variable.
```


```
const obj = {

name: "John",

f: function () {

  console.log(this.name);

},

g: () => {

  console.log(this.name);

},

};

const f = obj.f;

const g = obj.g;

f();

obj.f();

g();

obj.g();
```


```
实现一个函数cube，使得下面的等式成立
// 调用三次返回相乘的结果
cube(1)(2)(3) === 1 * 2 * 3;

cube(1, 2)(3, 4)(5, 6) === 1 * 2 * 3 * 4 * 5 * 6;

cube(1, 2, 3)(4, 5)(6) === 1 * 2 * 3 * 4 * 5 * 6;

```



```

实现一个函数flatten，使flatten([1,[2,3],4,[[5,6],7]]) 的结果是[1, 2, 3, 4, 5, 6, 7]

yield *  vs  yield

concat  

```

```
实现一个深拷贝函数deepClone，deepClone支持传object或array

deepClone([1,2,3])

[{a:1},{b:2}]

IM，Kim，electron+react
```


// 跟谁学
```
/*
字母异位词指字母相同，但排列不同的字符串。
示例:
输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
*/

function findWords(strArr) {
	// TODO
    const res = {}
    // const output = [];
    strArr.forEach(item => {
        const sorted = item.split('').sort().join('');

        if (!res[sorted]) {
            res[sorted] = [];
        }
        res[sorted].push(item);
    });
//     Object.keys(res).forEach(key => {

//         output.push(res[key])
//         return output;
//     })
    return res.values()
}
```

```
实现一个简单的四则运算器。

calc([ 1,  "+", 2, "*", 3, "-", 4, "+", 5])

输出：
3


function calc(arr) {
    const multiDiv = ['*', '/'];
    
    const addMinus = ['+', '-'];
    
    const multi = (x, y) => x * y;
    const div = (x, y) => x / y;
    const add = (x, y) => x + y;
    const minus = (x, y) => x - y;
    
    const calMap = {
        '*': multi,
        '/': div,
        '+': add,
        '-': minus
    }
    const multiDivIndx = arr.map((item,ind) => multiDiv.includes(item) ? ind : 0).filter(i => i > 0);
//    console.log('multiDivIndx', multiDivIndx)
    const addMinusInd = arr.map((item, ind) => addMinus.includes(item) ? ind : 0).filter(i => i > 0);
//    console.log('addMinusInd', addMinusInd)

    
    for (let ind = 0; ind< multiDivIndx.length; ind++) {
        const newarr = arr.splice(multiDivIndx[ind] - 1, 3);
//         console.log('newarr', newarr)
        // 2 * 3
        const newArrCalu = calMap[newarr[1]];


        const res = newArrCalu.call(null, newarr[0], newarr[2]);
  //      console.log('res', res)
        arr.splice(multiDivIndx[ind] - 1,0, res);

    }
    
    for (let ind = 0; ind< addMinusInd.length; ind++) {

        const newarr = arr.splice(multiDivIndx[ind] - 1, 3);
        // 2 * 3


        const newArrCalu = calMap[newarr[1]];
        const res = newArrCalu.call(null, newarr[0], newarr[2]);

        arr.splice(multiDivIndx[ind] - 1,0, res);
                console.log('arr',arr)
    }
    return arr[0];
} 


console.log(calc([ 1,  "+", 2, "*", 3, "-", 4 , '+', 5, '-', 4]))

```