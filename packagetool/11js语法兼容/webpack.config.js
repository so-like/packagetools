
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
            // 1.js语法兼容性处理babel-loader @babel/preset-env  @babel/core
            // 缺点：只基本兼容语法 只兼容一些基本的es6语法如promise不能兼容
            {   
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                options:{
                    // 预设 知识babel做什么样的处理
                    // presets:['@babel/preset-env']

                    presets:[
                        [
                            '@babel/preset-env',
                            {   
                                // 按需加载
                                useBuiltIns:'usage',
                                // 指定corejs版本
                                corejs:{
                                    version:3
                                },
                                // 指定具体配置兼容性做到那个版本浏览器
                                targets:{
                                    chrome:'60',
                                    firefox:'50',
                                    safari:'10',
                                    ie:'9',
                                    edge:'17'
                                }
                            }

                        ]

                    ]
                }
            },
            // 2.全部兼容es6语法 --> @babel/polyfill 一种比较暴力的方法兼容所有es6语法
            // 缺点将所有es6语法兼容代码引进，体积太大了

            // 3.需要做兼容性处理的就做 实现按需加载 --> core-js
            {

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