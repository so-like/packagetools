const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


process.env.NODE_ENV = 'production';

// 平时打包的时候入口文件所引入的js文件都会被打包进一个js文件中 code_split要做的就是把那些js文件都单独分离出来

module.exports = {
  // 单入口 也就是单页面配置
  entry: './src/js/index.js',

  // 多入口 以对象的形式  也就是多页面配置 有一个入口最终输出就会多一个bundle
  // entry:{
  //   main:'./src/js/index.js',
  //   test:'./src/js/test.js'
  // },
  output: {
    // 这里用name的话到时候输出就会取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  // 优化 将node_modules中的代码单独打包放进一个chunk最终输出 如果两个js页面中都引入了jquery那么它就只会被打包一次，
  // 两个js文件共用一个jquery

  // 自动分析多入口文件中有没有公共的chunk 如果有就会将公共的模块单独打包成一个chunk
  optimization:{
    // 分割chunks
    splitChunks:{
      chunks:'all'
    }
  },
  mode: 'production',
};
