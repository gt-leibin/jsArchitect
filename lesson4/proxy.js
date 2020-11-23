const http = require('http');

let client = http.request({
    path: '/login',
    port: 3000,
    hostname: 'localhost',
    method: 'POST',
    headers: {
        'Content-type': 'application/json',

    }
}, res => {
    res.on('data', chunk => {
        console.log();
    });
});

client.end();