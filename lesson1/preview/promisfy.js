const fs = require('fs');
const path = require('path');

const tareget = path.join(__dirname, 'observer.js');
// fs.readFile(tareget, (err, data) => {
//     if (err) {
//         console.log('err', err);
//     }
//     else {
//         console.log(data.toString());
//     }
// });



function promisify(fn) {
    const self = this;
    return function (...args) {
        return new Promise((resolve, reject) => {
            const cb = (err, data) => {
                if (!err) {
                    resolve(data);
                }
                else {
                    reject(err);
                }
            }
            fn.apply(self, [...args, cb]);
        });
    };
}


const read = promisify(fs.readFile);
read(tareget).then(data => {
    console.log('data', data.toString());
}).catch(e => {
    console.log('e', e);
});

