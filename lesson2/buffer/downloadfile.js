const express = require('express');
const app = express();

app.get('/download', (req, res, next) => {
    res.download('')
})

