// 分割buffer 珠峰我珠峰我珠峰我我dd  用【我】分割
// 珠峰  珠峰 珠峰 '' dd
// 二进制数据

const querystring = require('querystring');
const response = require('../mykoa/lib/response');

function bufSplit(buf, sep) {
    let findInd = 0;
    let sepLen = Buffer.from(sep).length;
    let curBuf = buf;
    const arr = [];
    while ((findInd = curBuf.indexOf(sep)) > -1) {
        arr.push(curBuf.slice(0, findInd));
        // ind = findInd + sepLen;
        curBuf = curBuf.slice(findInd + sepLen);
    }
    arr.push(curBuf);
    // console.log('arr', Buffer.concat(arr).toString());
    return arr;
}

// bufSplit(Buffer.from(`------WebKitFormBoundaryKbBwYA6cQ0nMZhTe
// Content-Disposition: form-data; name="ddd"

// 123123
// ------WebKitFormBoundaryKbBwYA6cQ0nMZhTe
// Content-Disposition: form-data; name="zip"; filename="info.txt"
// Content-Type: text/plain

// ------WebKitFormBoundaryKbBwYA6cQ0nMZhTe--`), '------WebKitFormBoundaryKbBwYA6cQ0nMZhTe').forEach(i => {
//     console.log('content----\n', i.toString());
// });

// function handleFormData(buf) {
//     return 
// } 


module.exports = function () {
    return async function (ctx, next) {
        await new Promise( (resolve, reject) => {
            if (ctx.method === 'POST') {
                const arr = [];
                ctx.req.on('data', chunk => {
                    arr.push(chunk);
                });
                ctx.req.on('end', () => {

                    const contentType = ctx.get('Content-type');
                    if (contentType.includes('application/x-www-form-urlencoded')) {
                        const result = Buffer.concat(arr).toString();
                        ctx.request.body = querystring.parse(result);
                    }
                    else if (contentType.includes('multipart/form-data')) {
                        const totalBuf = Buffer.concat(arr);
                        const boundaryLength = 40;

                        // console.log(totalBuf.slice(0, boundaryLength).toString());

                        const boundary = totalBuf.slice(0, boundaryLength);
                        // console.log('boundary', boundary.toString());
                        // console.log('totalBuf', totalBuf.toString());
                        ctx.request.body = {};
                        // 按照分割线分开
                        const submitFormData = bufSplit(totalBuf, boundary.toString()).slice(1, -1);
                        submitFormData.forEach(item => {
                            // console.log('item', item.toString());
                            const obj = {};
                            // const result = item.toString();
                            
                            // const [head, body] = item.indexOf('\r\n\r\n');
                            const splitLineInd = item.indexOf('\r\n\r\n');
                            const head = item.slice(0, splitLineInd).toString();
                            const content = item.slice(splitLineInd + 4);

                            const filenameResult = head.match(/filename="(.+?)"/);
                            const nameRegResult = head.match(/name="(.+?)"/);
                            
                            let name = nameRegResult && nameRegResult[1] || '';
                            console.log('name', name);
                            ctx.request.body[name] = {};

                            if (filenameResult && filenameResult[1]){
                                let filename = filenameResult[1];
                                ctx.request.body[name].filename = filename;
                                ctx.request.body[name].content = content;
                                // obj.content = content;
                            }
                            else {
                                ctx.request.body[name].filename = '';
                                ctx.request.body[name].content = content;
                            }

                        });
                        console.log('ctx.request.body', ctx.request.body);
                    }
                    resolve();
                });
            }
            else {
                resolve();
            } 
        });
        await next();
    }
}