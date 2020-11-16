
const {resolve} = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    // loader配置
    module:{
        rules:[
            // loader详细配置
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            // 打包除css js html意外的其他资源
            {
                exclude:/\.(css|js|html)$/,
                loader:'file-loader'
            }    
        ]
    },
    plugins:[
        // 插件详细配置
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development',

    // 配置devServer 自动编译打包 更新浏览器
    // 特点只会在内存中编译打包 不会有任何输出
    // 启动devServer命令 npx webpack-dev-server

    // webpack的版本过高会导致编译错误 以下命令适配
    // npm i webpack@4.43.0 webpack-cli@3.3.12 webpack-dev-server@3.11.0 webpack-dev-server -D
    devServer:{
        // 打包的文件路径
        contentBase:resolve(__dirname,'build'),
        // 启动gzip压缩
        compress:true,
        // 指定服务器端口号
        port:8099,
        // open为true为自动打开浏览器
        // open:true
    }

}