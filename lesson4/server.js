const http = require('http');
const url = require('url');

const server = http.createServer();

server.on('request', (req, res) => {
    let {pathname} = url.parse(req.url);

    res.setHeader('Access-Control-Allow-Origins', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // 设置发送options 频率 单位s 
    res.setHeader('Access-Control-Max-Age': '30');

    if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
    }
    if (pathname === '/login' && req.method === 'POST') {
        const arr = [];
        // req.on('data')
    }

    if (pathname === 'reg' && req.method === 'GET') {
        const arr = [];

        req.on('data', chunk => {
            arr.push(chunk);
        });
        req.on('end', () => {
            const qs = Buffer.concat(arr).toString('utf8');
            res.end(qs);
        });
    }
});

server.listen('8000', () => {
    console.log('server start 8000');
});

