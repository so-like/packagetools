

const {resolve} = require('path');
// loader 先下载后使用（配置loader）
// 而plugin 先下载 后引入 在使用

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    // loader的配置文件
    module:{
        rules:[
            // 详细配置文件

        ]
    },
    plugins:[
        // 插件的详细配置文件
        // 这个插件它会自动引入.src/index.html文件 你不需要手动引入 不然会报错
        new HtmlWebpackPlugin({
            // 复制一份index.html文件 自动引入到入口文件中自动打包所有资源（css，js）
            // 插件会根据路径自己去找这个文件并引入带入口文件中
            template:'./src/index.html',
        })
    ],
    mode:'development',
}