// 使用dll技术对某些库进行单独打包、
// 默认webpack命令运行的是webpack.config.js文件，所以我们的命令要改为
// webpack --config webpack.dll.js

const {resolve} = require("path");
const webpack = require("webpack");

module.exports ={
    entry:{
        // 最终要打包生成的name
        // 数组含义所要打包的库是jquery
        jquery:['jquery']
    },
    output:{
        filename:'[name].js',
        path:resolve(__dirname,'dll'),
        library:'[name]_[hash]',//dll单独打包的库里面向外暴露出去的名字（取哈希值）
    },
    module:{
        rules:[
            // 具体样式配置
        ]
    },
    plugins:[
        // 聚体插件配置
        // 打包生成一个映射manifest.json -->提供jquery映射
        new webpack.DllPlugin({
            name:'[name]_[hash]',//映射库的暴露的内容名称
            path:resolve(__dirname,'dll/manifest.json'),//输出文件路径
        }),
    ],
    mode:'production',

}