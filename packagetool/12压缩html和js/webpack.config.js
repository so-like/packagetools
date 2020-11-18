
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports ={
    entry:'./src/js/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    plugins:[
        // 具体插件配置
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify:{
                // 移除空格
                collapseWhitespace:true,
                // 移除注释
                removeComments:true
            }
        })
    ],
    // mode:'development',
    // 生产环境下会自动压缩js代码
    mode:'production',
}