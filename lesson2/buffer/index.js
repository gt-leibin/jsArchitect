// 编码
const fs = require('fs');
// emlji 四个字符？
// iconv-lite  编码转换工具包


// 进制转换 将任意进制转换成10进制 第一个参数时数字自字符串 第二个数字时数字的进制
console.log(parseInt('11', 2));
console.log(parseInt('21', 8));
console.log(parseInt('0x11'));

// 将十进制转换成任意进制
console.log('(300).toString(2)', (300).toString(2));
console.log('(12).toString(7)', (12).toString(7));
console.log('(54).toString(16)', (54).toString(16));

// buffer的初始化

// 一个汉字占3个字符  一个字符8个字节 （2个16进制数字|16进制字节序列） 所以一个汉字占24个字节 6个16进制数字标识
// 一个英文字符串占一个字符8位，对应着其ascii码表
// 
console.log('Buffer.alloc(9)', Buffer.alloc(9));
console.log('Buffer.from("a")', Buffer.from('a'));
console.log('Buffer.from("A")', Buffer.from('A'));
console.log('(0x61).toString(10)', (0x61).toString(10));
console.log('(0x41).toString(10)', (0x41).toString(10));
console.log('Buffer.from("小九")', Buffer.from('小九'));
console.log('Buffer.from([e5 b0 8f])', Buffer.from([0xe5, 0xb0, 0x8f]).toString());



// Buffer类是uint8Array的子类
// Buffer 类是 JavaScript 语言内置的 Uint8Array 类的子类。 支持许多涵盖其他用例的额外方法。 只要支持 Buffer 的地方，Node.js API 都可以接受普通的 Uint8Array。
// buffer与字符编码
const bf = Buffer.from('hello world');
bf.toString('');
bf.toString('hex');
bf.toString('base64');




// base64 没有加密功能 用于传输数据， 编码图片小图标，可以减少http请求
// base64 编码原理
// gzip 重复性高的 可以压缩  替换

// canvas 压缩图片？性能

// 浏览器中的二进制
// 文件类型 继承自 Blob
// new Blob() 包装成文件类型


// 前端实现下载功能
// const str = 'asdasd';
// const blob = new Blob([str], {
//     type: 'text/html'
// });

// const a = document.createElement('a');
// a.setAttribute('download', 'index.html');
// // 创建链接!!!
// a.href = URL.createObjectURL(blob);
// a.click();


// 前端实现预览功能 读取二进制中的内容  fileReader

// 读取图片文件内容，显示出来
// file.addEventListener('change', e => {
//     let file = e.target.files[0];
//     let filereader = new FileReader();

//     // 读取图片文件内容，显示出来
//     filereader.readAsDataURL(file);
//     filereader.onload = () => {
//         let img = new Image();
//     };

//     // 读取图片路径 做预览 推荐方式 读取路径！
//     const imgsrc = URL.createObjectURL(file);
//     //
// URL.revokeObjectURL（）静态方法释放现有的对象URL，该对象URL是先前通过调用URL.createObjectURL（）创建的。
// 使用完对象URL后，请调用此方法，以使浏览器知道不再保留对该文件的引用。
//     // URL.revokeObjectURL(url)


// Buffer 应用场景 文件分片上传，文件拼接   二进制  Request Response 都是buffer
// 
// Buffer.isBuffer
// Buffer.copy
// Buffer.concat 拼接  不能用 + ，会转换成字符串，

// 二进制流 边读边消耗

// nodejs主线程是单线程  依靠libuv 多线程
// 手动实现流?

// io操作  输入输出？
// 读文件 到内存 写内存
// 写文件 到存储介质（硬盘） 读出

// 先读取三个到内存
// const buf = Buffer.alloc(3);
// fd 文件描述  file descriptor
// fs.open('name.txt', 'r', (err, fd) => {
//     fs.read(fd, buf, 0, 3, (err, bytesRead) => {
//         console.log(bytesRead, buf);
//     })
// })






// });


// 写操作
const wBuffer = Buffer.from('珠峰架构');
// d rwx(当前所属人) r-x 工作组 r-x 其他人
// mode 权限 chmod -R 777 八进制 666
fs.open('./buffer.txt', 'w', (err, fd) => {
    if (err) {
        console.log('err', err);
        return;
    }
    console.log('文件描述符fd: ', fd);
    console.log('wBuffer.length: ', wBuffer.length);
    // offset 决定 buffer 中要被写入的部位

    fs.write(fd, wBuffer, (err, bytesWritten, buffer) => {
        if (err) {
            console.log('err', err);
        }
        console.log('err, bytesWritten, buffer', err, bytesWritten, buffer.toString());
    });
});

// 实现一个流？
// 解耦 用发布订阅

// 总结浏览器中的二进制数据处理和nodejs中二进制数据的处理异同














