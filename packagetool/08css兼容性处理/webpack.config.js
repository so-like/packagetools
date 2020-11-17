


const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置node.js的环境变量
process.env.NODE_ENV = 'development';
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',

                    // CSS兼容就必须要用到postcss库 要用到postcss-loader和postcss-preset-env插件
                    // 这个创建爱你会帮助postcss找到package.json中的browserlist里面的配置 通过配置
                    // 加载兼容的css样式

                    // "browserslist":{
                    //     "development":[
                    //       "last 1 chrome version",
                    //       "last 1 firefox version",
                    //       "last 1 safari version"
                    //     ],
                            // 默认是看production配置的
                    //     "production":[
                    //       ">0.2%",
                    //       "not dead",
                    //       "not op-mini-all"
                    //     ]
                    //   }

                    // 'postcss-loader' postcss-loader默认配置 要修改配置就要以对象的方式

                    // 配置问题中有个坑 webpack看不懂plugins中的配置必须将它改为下面的菜可以
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //       ident: "postcss",
                    //       plugins: () => [
                    //         require("postcss-preset-env")()
                    //       ]
                    //     }
                    //   }

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