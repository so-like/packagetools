// 开发环境的配置 能让代码运行

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Server } = require('http');

module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            // 具体loader配置信息
            {
                // 打包css样式资源 样式会被打包到js文件中所以它不会输出！！！！！！！！！！！！！！
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                // 打包less样式资源
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ] 
            },

            {
                // 打包图片（css样式表中的图片)
                test:/\.(jpg|png|gif)$/,
                loader:'url-loader',
                options:{
                    // 规定图片大小
                    limit:8*1024,
                    // 规定要打包的图片名
                    name:'[hash:10].[ext]',
                    // 关闭es语法启用commonjs编译
                    esModule:false,
                    outputPath:'image'
                }        
            },
            {
                // 处理html页面中的图片
                test:/\.html$/,
                loader:'html-loader'
            },

            {
                // 打包其他样式资源
                exclude:/\.(css|js|html|less|gif|jpg|png)$/,
                // url-loader要比fil-loader多一些功能比如压缩图片为base64的编码方式
                loader:'file-loader',
                options:{
                    name:'[hash:10].[ext]',
                    outputPath:'media'
                }
            }
        ]
    },
    plugins:[
            // 插件的具体配置
            // 通过new方法引进html插件来处理html
            new HtmlWebpackPlugin({
                template:'./src/index.html'
            })
    ],
    mode:'development',

    devServer:{
            // 要打包的文件路径
            contentBase:resolve(__dirname,'build'),
            // compress代表可以压缩
            compress:true,
            // 服务器的端口号
            port:8099
    }


}