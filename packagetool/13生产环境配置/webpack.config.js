
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 单独提取css插件的引入
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css的插件引入
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 设置node.js的环境变量
process.env.NODE_ENV = 'development';

// 定义处理css单独提取以及兼容问题的loader
const CommonCssLoader = [
    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            postcssOptions: {
                                plugins: [
                                  [
                                    'postcss-preset-env',
                                    {
                                      ident: "postcss"
                                    },
                                  ],
                                ],
                              },
                        }
                    }
]
module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            // 具体loader的配置
            // css打包配置
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
                loader:'url-loader',
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
                loader:'html-loader'
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

            // js语法兼容
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                options:{
                    presets:[
                        [
                            '@babel/preset-env',
                            {   
                                useBuiltIns:'usage',
                                corejs:{
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
    },
    plugins:[
        // 具体插件配置
        // 打包html
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify:{
                // 移除空格
                collapseWhitespace:true,
                // 移除注释
                removeComments:true
            }
        }),
        // css压缩
        new MiniCssExtractPlugin({
           filename:'css/built.css'
        }),

        // css兼容处理
        new OptimizeCssAssetsWebpackPlugin(),
    ],
    mode:'production'
}