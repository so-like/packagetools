
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
}