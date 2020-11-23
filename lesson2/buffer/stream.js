// async iterator handle stream

const {Readable}  = require('stream');

async function* gen() {
    yield 'a';
    yield 'b';
    yield 'c';
}

const readable = Readable.from(gen());
readable.on('data', chunk => {
    console.log('chunk', chunk);
});

const arr = [1,2,3,4,5,6];
const arrToStream = Readable.from(arr[Symbol.iterator]());
arrToStream.on('data', data => {
    console.log('data', data.toString());
});
