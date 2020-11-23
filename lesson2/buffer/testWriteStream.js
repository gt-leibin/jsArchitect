const WriteStream = require('./writeStream');
const ReadStream = require('./readStream');
const path = require('path');

const ws = new WriteStream(path.resolve(__dirname, 'tobeWritten.txt'), {highWaterMark: 0});
// ws.write('0987654321', 'utf8');

const rs = new ReadStream(path.resolve(__dirname, 'directory.js'), {
});
rs.pipe(ws);
