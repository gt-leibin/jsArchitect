// 后端缓存 强制缓存和协商缓存
// 强制缓存 以后的请求都不需要访问服务器 200
// 协商缓存 每次来都判断一下 告诉需要找缓存 304

const http = require('http');
const url =  require('url');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

http.createServer((req, res) => {
    const {pathname} = path.parse(req.url);
    const filePath = path.join(__dirname, pathname);


    // expires 老版本 浏览器支持  绝对时间
    // cache-control 相对时间 max-age： 10   单位s
    // max-stale[=<seconds>] 客户端愿意接受一个过期的资源但是不能超过设置的时间
    // res.setHeader('Expires', new Date())
    // 文件缓存 from cache  from disk
    // 首先访问的页面不会被缓存，页面引用的资源（js css  图片 字体）才会被缓存。如果主动浏览器访问一个css资源 也不会被缓存

    // res.setHeader('Cache-control', 'no-cache'); // 缓存 但是每次都会有请求，就是chrome     调试窗口中的disable-cache 意思是本地有缓存，但是还是会请求
    // res.setHeader('Cache-control', 'no-store'); // 不在浏览器进行缓存，每次请求服务器  彻底不缓存了 
    // 强制缓存不会像服务器发请求，会导致页面修改后，视图依旧用旧的

    // 对比缓存 比较一下 再决定用缓存还是用最新的

    // 客户端if-modified-since  服务端 Last-Modified
    // 缺点是 监控时间秒级别 如果一秒内改了多次 还是监控不到最新文件
    // 如果文件改动多次 最后文件内容没改动，也会重新读取。

    // res.setHeader('')
    // fs.stat(filePath, (err, statObj) => {
    //     let lastModified = statObj.ctime.toGMTString();

    // })



    // 修改文件内容 e-tag 
    // 通过文件算出一个唯一标示 比如  md5 摘要算法
    // 不是加密算法 1. 不可逆 2. 相同内容转化后相同，不同内容转化后结果不同，3. 转化后 字符串都是一样长的  4. 雪崩效应 担负有一点内容改变，转化后结果都完全不同
    // 第一次请求我，我需要根据内容产生一个唯一标示，对应当前文件
    // 缺点 每次请求都需要对文件产生一个摘要 性能较
    // 改善  etag + ifNoneMatch  实现对比缓存，比较方式比较精准，但是默认不会根据文件所有内容生成时间戳 可以取出3文件某一部分，（开头几行最为hash），
    // 为了保证精度，内容一部分和文件大小 最为hash戳
    // 视频内容的话 直接判断大小就好
    // 项目中 会适用强制缓存 + 对比缓存 两种策略并用

    

    let ifNoneMatch = req.headers['if-none-match'];

    fs.stat(filePath, (err, statObj) => {
        if (err) {
            return res.end();
        }
        const content = fs.readFileSync('');
        let contentHash = crypto.createHash('md5').update(content).digest('base64');

        res.setHeader('eTag', contentHash);

    })


});

// npm version patch 更新版本！项目中的版本管理工具
// npm adduser 
// npm public