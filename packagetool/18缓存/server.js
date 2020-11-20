// 使用node中express模块搭建服务器
const express = require('express');
const app = express();
// 将build文件暴露出去 有效期为一个小时
app.use(express.static('build',{maxAge:1000*3600}));
// 服务器的端口号为8769
app.listen(8769);