const express = require('express');
// const express = require('./lib/express');
const fs = require('fs');
const path = require('path');
const app = express();

// app.get('/', (req, res, next) => {
//     console.log('1');
    
    
//     next();
// }, function (req, res, next) {
//     console.log('2');
//     next();
// },

// function (req, res, next) {
//     console.log('3');
//     next();
// });


// app.get('/', (req, res, next) => {
//     console.log('11');
//     next();
// }, function (req, res, next) {
//     console.log('22');
//     next();
// },function (req, res, next) {
//     console.log('33');
//     res.end('hello')
//     next();
// });


app.get('/iframe1.html', (req, res) => {
    fs.createReadStream(path.resolve(__dirname, './views/iframe1.html')).pipe(res);
});

app.get('/iframe2.html', (req, res) => {
    fs.createReadStream(path.resolve(__dirname, './views/iframe2.html')).pipe(res);
});

app.get('/', (req, res) => {
    fs.createReadStream(path.resolve(__dirname, './views/index.html')).pipe(res);
});

app.listen('8989', () => {
    console.log('listening ar 8989')
});