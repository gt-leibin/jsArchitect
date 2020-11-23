// 管道流
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const { REPL_MODE_STRICT } = require('repl');

// let rs = fs.createReadStream(path.resolve('buffer.txt'), {
//     flags: 'r', // 读
//     encoding: null, // 默认buffer
//     mode: 0o666,
//     autoClose: true,
//     start: 2,
//     end: 8,
//     highWaterMark: 3
// });

// // 通过对外emit事件，解耦流事件处理  发布订阅模式 控制多个异步函数执行
// let buf = [];
// rs.on('open', fd => {
//     console.log('open file descriptor', fd);
// });

// rs.on('data', chunk => {
//     console.log('data', chunk);
//     buf.push(chunk);
// });

// rs.on('end', () => {
//     console.log('read end');
//     console.log(buf.toString('utf8'));
// });


// rs.on('error', err => {
//     console.log('err', err); 
// });

// rs.on('close', () => {
//     console.log('read close');
// });

// flags: 'r', // 读
//     encoding: null, // 默认buffer
//     mode: 0o666,
//     autoClose: true,
//     start: 2,
//     end: 8,
//     highWaterMark: 3
class ReadStream extends EventEmitter {
    constructor(path, opts = {}) {
        super();
        this.path = path;
        this.flags = opts.flags || 'r';
        this.encoding = opts.encoding || 'buffer';
        this.mode = opts.mode || 0o666;
        this.autoClose = opts.autoClose || true;
        this.start = opts.start || 0;
        this.end = opts.end;
        // 读取的数量默认是64k 如果文件大于64k，就可以采用流的方式
        this.highWaterMark = opts.highWaterMark || 64 * 1024;

        // 记录读取的偏移量
        this.pos = this.start;
        // 默认创建一个可读流，非流动模式，不会出发data，如果用户监听了data事件,变成流动模式
        this.flowing = false;
        this.open(); // 打开文件
        // 监听是否监听了某个事件
        this.on('newListener', type => {
            // 如果用户监听了data
            if (type === 'data') {
                this.flowing = true;
                this.read();
            }
        });
    }
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                throw err;
            }
            this.fd = fd;
            this.emit('open', fd);
        });
    }

    read() {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this.read());
        }
        // 文件已经打开，可以进行杜读操作
        const buf = Buffer.alloc(this.highWaterMark);
        let howMuchToRead = this.end ? Math.min(this.end - this.start + 1, this.highWaterMark) : this.highWaterMark;
        // fd通过文件描述符 读取二进制数据
        // buf 用来存放二进制数据的buf
        // 0 是从buf中哪个位置开始写入数据
        // howMuchToRead 需要读取多少字节
        // 从fd所指的文件中哪个位置开始读取
        fs.read(this.fd, buf, 0, howMuchToRead, this.pos, (err, bytesRead) => {
            if (bytesRead) {
                this.pos += bytesRead;
                this.emit('data', buf.slice(0, bytesRead));
                if (this.flowing) {
                    this.read();
                }
            }
            else {
                this.emit('end');
                if (this.autoClose) {
                    fs.close(this.fd, () => {
                        this.emit('close');
                    });
                }
            }
        });
    }
    pause() {
        this.flowing = false;
    }
    resume() {
        this.flowing = true;
        this.read();
    }
    // 管道优势，不会湮没可用内存
    pipe(dest) {
        this.on('data', chunk => {
            // 一个中英文都占用一个字节
            // 汉字占3个字节
            console.log('pipe chunk', chunk.toString());
            // 是否正在写入
            let flags = dest.write(chunk);
            if (!flags) {
                this.pause();
            }
        });
        // 可写流中的缓存都已经写入完成了，触发了drain事件，可以继续读数据了
        dest.on('drain', () => {
            console.log('pipe chunk drain');
            this.resume();
        });
    }
}


module.exports = ReadStream;
// let rs = new ReadStream(path.resolve(__dirname, 'buffer.txt'), {
//     highWaterMark: 30
// });

// let ws = fs.createWriteStream('results.txt');
// // rs.on('data', chunk => {
// //     // console.log('chunk', chunk.toString());
// // });

// rs.pipe(ws);
