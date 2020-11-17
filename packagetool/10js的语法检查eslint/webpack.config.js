
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports ={
    entry:'./src/js/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            // 具体loader配置
            // 语法检查 eslint-loader 和eslint 只检查源代码 排除三方
            // 设置检查规则 可以在我们的package.js中eslintConfig里设置 airbnb规则
            {   
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'eslint-loader',
                options:{
                    // 修复语法错误
                    fix:true
                }
            }


        ]
    },
    plugins:[
        // 具体插件配置
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development',
}