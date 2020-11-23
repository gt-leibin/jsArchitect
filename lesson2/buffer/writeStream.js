// createWriteStream 如果文件不存在，默认会创建，默认会清空再写入
const fs = require('fs');
const EventsEmitter = require('events');
const LinkedList = require('./linkedList');
// let rs = fs.createWriteStream('name.txt', {
//     highWaterMark: 3,// 预期占用的内存,不是每次写入的内存！！根据这个值控制写入速率
// });
// // 达到预期或者清空队列中的缓存
// rs.on('drain', () => {
//     console.log('drain');
// });


// 链表的操作性能比数组如何？
// 多个异步操作,操作同一个文件 ，队列

class Queue {
    constructor() {
        // 此链表用来存储多次写入的数据
        this.linkedList = new LinkedList();
    }

    offer(ele) {
        // 添加到最后一个
        this.linkedList.add(ele);
    }

    shift() {
        // 从头部取出
        return this.linkedList.remove(0);
    }
}
class WriteStream extends EventsEmitter {
    constructor(path, opts = {}) {
        super();
        this.path = path;
        this.mode = opts.mode || 0o666;
        this.autoClose = opts.autoClose || true;
        this.flags = opts.flags || 'w';
        this.start = opts.start || 0;
        this.encoding = opts.encoding || 'utf8';
        this.highWaterMark = opts.highWaterMark || 16 * 1024;

        // 维护当前存入的数据个数
        this.len = 0;
        // 是否正在写入
        this.writing = false;
        // 是否需要触发 drain 事件
        this.needDrain = false;
        // 写入的偏移量
        this.offset = 0;
        // 用来缓存多次的写入操作，除了第一次
        this.cache = new Queue();
        // 打开写入文件
        this.open();

    }

    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                throw err;
            }
            this.fd = fd;
            this.emit('open', fd);
        });
    }
    // 写入
    // chunk 是buffer或者string
    write(chunk, encoding = 'utf8', cb = () => { }) {
        // let buf = Buffer.alloc(this.highWaterMark);
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        this.len += chunk.length;
        // 这就是write方法的返回值，代表是否可以继续写
        let flag = this.len < this.highWaterMark;

        // drain事件触发条件 len >= highWaterMark,写入的个数达到或者超过i预期
        this.needDrain = !flag;
        if (this.writing) {
            this.cache.offer({
                chunk,
                encoding,
                cb
            });
        }
        else {
            // 正在写入
            this.writing = true;
            this._write(chunk, encoding, () => {
                cb();
                this.clearBuffer();
            });
        }
        return flag;


        // fs.write(this.fd, chunk, this.offset, )
    }
    clearBuffer() {
        let data = this.cache.shift();
        if (data) {
            let {chunk, encoding, cb} = data;
            this._write(chunk, encoding, () => {
                cb();
                // 递归的取缓存，清空缓存的chunk
                this.clearBuffer();
            });
        }
        else {
            // 缓存中都取完写完
            this.writing = false;
            if (this.needDrain) {
                this.needDrain = false;
                // 只要依次写入的内容长度唱过highWaterMark阈值就触发drain
                this.emit('drain');
            }

        }
    }
    _write(chunk, encoding, cb) {
        if (typeof this.fd !== 'number') {
            return this.once('open', fd => {
                this._write(chunk, encoding, cb);
            });
        }
        // 实际将 chunk 写入到文件
        // 将用户的数据写入文件
        // 0 决定 chunk 中要被写入的位置
        fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, writtenBytes) => {
            if (err) {
                throw err;
            }
            console.log('fs.write', this.fd, chunk, 0, chunk.length, this.offset);

            // 待写入的字节个数，减少writtenBytes个
            this.len -= writtenBytes;
            this.offset += writtenBytes;
            cb && cb();
        });
    }
}


module.exports = WriteStream;
