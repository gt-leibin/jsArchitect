const fs = require('fs');
const path = require('path');

// with用法
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with
// new Function使用 在模板引擎解析
// 拼接成一个函数执行
const renderFile = (filePath, data, cb) => {
    fs.readFile(filePath, 'utf8', (err, html) => {
        if (err) {
            cb(err);
            return;
        }

        html.replace(/\{\{([^{]+)\}\}/g, (...args) => {
            console.log(args);
            const key = args[1].trim();
            return '${' + key + '}';
        });
        const head = `let str = '';\r\n with (obj){ \r\n`;
        head += 'str += ';
        html

    });
}



renderFile('./eventloop.html', {name: 121});
