const Koa = require('koa');
const Router = require('@koa/router');
const session = require('koa-session');
const app = new Koa();

// base64 有三个特殊符号 需要替换  / = +


// jwt 签名 解析签名的过程