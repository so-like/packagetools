// source_map是一种源代码到构建代码映射的技术 如果构建后代码出错了 可以映射到源代码的错误
// 开启source-map需要在配置文件中添加devtool:'source-map'
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { Server } = require('http');
const CommonCssLoader = [
    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [   
                                        {   
                                            // 缩进使用postcss规则
                                            ident: "postcss"
                                        }
                                    ]
                                ]
                            }
                        }
                    }
]

module.exports = {
    entry:['./src/js/index.js','./src/index.html'],
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            // 一个文件只会被一个loader处理 防止我一个问价你被多个文件过一遍而浪费时间所以用oneof来处理
            // 具体loader配置信息
            {
                test:/\.js$/,
                exclude:/node_modules/,
                // 先执行eslint-loader这样就不会产生冲突
                enforce:'pre',
                loader:'eslint-loader',
                options:{
                    // 语法错误检测修复
                    fix:true
                }
            },
            {
                oneOf:[
                    {
                        test:/\.css$/,
                        use:[...CommonCssLoader]
                    },
        
                    // less打包配置
                    {
                        test:/\.less$/,
                        use:[...CommonCssLoader,'less-loader']
                    },
        
                    // 图片的处理
                    {
                        test:/.(jpg|png|gif)$/,
                        use:[
                            'url-loader'
                        ],
                        // html中的图片时用commonjs来处理的 所以这里也要用commonjs语法所以要关闭es6语法
                        options:{
                            limit:8*1024,
                            name:'[hash:10].[ext]',
                            esModule:false,
                            outputPath:'images'
                        }
                    },
                    // 处理html中的图片
                    {
                        test:/\.html$/,
                        use:[
                            'html-loader'
                        ]
                    },
        
                    // 处理其他样式资源
                    {
                        exclude:/\.(js|html|css|less|jpg|png|gif)$/,
                        loader:'file-loader',
                        options:{
                            outputPath:'media'
                        }
                    },
        
                    // js语法检测 使用前应该现在package.json中配置eslintConfig -->airbnb
                    // 理论上来讲一个文件只能有一个loader来处理如果有多个loader来处理一个文件name一定要搞清楚loader的执行顺序
                    // 先执行eslint 在执行babel
        
                    // js语法兼容
                    {
                        test:/\.js$/,
                        exclude:/node_modules/,
                        loader:'babel-loader',
                        options:{
                            preset:[
                                [
                                    '@babel/preset-env',
                                    {   
                                        useBuildIns:'usage',
                                        coerjs:{
                                            version:3,
                                        },
                                        targets:{
                                            chrome:'60',
                                            firefox:'50',
                                            ie:'9',
                                            safari:'10',
                                            edge:'17'
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
            // 插件的具体配置
            // 通过new方法引进html插件来处理html
            new HtmlWebpackPlugin({
                template:'./src/index.html'
            }),
            new MiniCssExtractPlugin()
    ],
    mode:'development',

    devServer:{
            // 要打包的文件路径
            contentBase:resolve(__dirname,'build'),
            // compress代表可以压缩
            compress:true,
            // open:true,
            // 服务器的端口号
            port:8097,

            // 开启HMR服务 当修改了webpack.config.js配置后要重启服务
            hot:true
    },
    devtool:'source-map',
    // source-map还会配合inline hidden eval来使用
    // inline-source-map主要是在输出js文件中内部生成base64编码的文件与外不深沉的文件相比它的打包速度更快
    // （它只生成一个内联文件source-map）
    // hidden-source-map是外部生成文件 能找出错误原因但不能追踪到源代码的错误位置 但能追踪到构建会代码的位置
    // eval-source-map是内联source-map但他是每个文件都会生成source-map
    // chape-source-map生成外部
    // chape-module-source-map生成外部


}