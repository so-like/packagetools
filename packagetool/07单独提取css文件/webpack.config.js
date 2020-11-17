


const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports ={
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            // 具体loader配置
            {
                test:/\.css$/,
                use:[
                    // 如果单独打包css文件这个style-loader就不能用了 需要下载一个插件
                    // 通过引入插件来处理css文件
                    // 'style-loader',

                    // 单独提取css文件的插件
                    MiniCssExtractPlugin.loader,
                    // 将css问价你整合到js文件中
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        // 具体插件配置
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        // 在这里引入打包css文件的插件
        // 这样的好处是键css文件抽离出来减小了js文件过大请求慢等问题
        new MiniCssExtractPlugin(
            {   
                // 给输出文件命名
                filename:'css/built.css'
            }
        )
    ],
    mode:'development'
}