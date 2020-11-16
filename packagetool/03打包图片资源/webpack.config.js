

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports ={
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build'),
        publicPath:'./'
    },
    // 配置loader信息
    module:{
        rules:[
            // 详细loader配置信息
            {
                test:/\.less$/,
                // 如果这里有多个loader就要以数组的形式 如果只有一个就直接写了
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {   
                // 这里一定要用或| 不能用逗号负责会出错
                test:/\.(png|jpg|gif)$/,

                // 这里需要下载url-loader 和 file-loader
                loader:'url-loader',
                options:{
                    // 图片大小小于8kb 就会交给base64去处理
                    // 好处是可以减少页面请求 减轻服务器的压力
                    // 缺点是图片体体积会增大 文件请求速度慢
                    // 当图片的大小出超过limit设置的8*1024kb时才会生成静态资源图片否则会用一段base64编码表示
                    limit:8 * 1024,

                    // 默认url会以es6语法去解析图片路径 而html-loader是以commonjs语法去编译的 
                    // 所以这里要关闭es6语法webpack4.0版本
                    name:'[hash:10].[ext]'
                }
            },
            {
                test:/\.html$/,
                // 使用html-loader来解决html页面中引入图片问题 从而让图片被上面的url-loader来解析处理
                // html-loader默认使用es6语法进行解析
                loader:'html-loader'
            }
        ]
    },
    plugins:[
        // 插件详细配置信息
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })

    ],
    mode:'development',
}