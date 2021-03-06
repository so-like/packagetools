const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const { loader } = require('mini-css-extract-plugin');
const { workers } = require('cluster');

// PWA 渐进式网络开发应用程序(离线也可以访问)
// workbox ---> 在webpack中我们可以使用workbox-webpack-plugin插件

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

// 复用loader
const commonCssLoader = [
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
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        // 在package.json中eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        // 以下loader只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader]
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader']
          },
          /*
            正常来讲，一个文件只能被一个loader处理。
            当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
              先执行eslint 在执行babel
          */
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use:[
              // 开启多进程打包
              // 进程启动时间为600ms,进程之间通信也需要消耗时间
              // 只有进程消耗时间比较场它才需要多进程打包

              {
                loader:'thread-loader',
                options:{
                  workers:2 //表示进程只有两个
                }
              },
              {
                loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: { version: 3 },
                    targets: {
                      chrome: '60',
                      firefox: '50'
                    }
                  }
                ]
              ],
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true
            }
              }
            ]
            
          },
          {
            test: /\.(jpg|png|gif)/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
              esModule: false
            }
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            exclude: /\.(js|css|less|html|jpg|png|gif)/,
            loader: 'file-loader',
            options: {
              outputPath: 'media'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      // 帮助serviceWork快速启动 
      // 删除旧的serviceWork

      // 最终帮助我们生成一个serviceWork的配置文件 通过配置文件我们去注册serviceWork
      // "env":{
    //   "browser":true    
    // 由于eslint不认识window navigator所以需要配置
    // 在package.json配置文件中给eslintconfig文件配置env属性 browser为true表
        // 示支持浏览器的一些全局属性
    // 2.servicework必须运行在服务器上
// node创建服务器
// 通过npm i server -g

      clientsClaim:true,
      skipWaiting:true
    })
  ],
  mode: 'production',
  devtool: 'source-map'
};
