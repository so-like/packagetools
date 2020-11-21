

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
  

        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
        })
    ],
    mode:'production',
    externals:{
        // 要忽略的库
        // 格式 库名 --- npm下的包名
        // <!-- 当我们忽略jquery打包时必须手动引进jquery -->
        jquery:'jQuery',
    }
}