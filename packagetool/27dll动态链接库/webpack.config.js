

const {resolve} = require('path');
// loader 先下载后使用（配置loader）
// 而plugin 先下载 后引入 在使用
const webpack = require("webpack");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    // loader的配置文件
    module:{
        rules:[
            // 详细配置文件

        ]
    },
    plugins:[
        // 插件的详细配置文件
        // 这个插件它会自动引入.src/index.html文件 你不需要手动引入 不然会报错
        new HtmlWebpackPlugin({
            // 复制一份index.html文件 自动引入到入口文件中自动打包所有资源（css，js）
            // 插件会根据路径自己去找这个文件并引入带入口文件中
            template:'./src/index.html',
        }),

        // ****************忽略jquery*******************
        // 告诉我们的webpack那些库不需要打包，而且使用时名称也得变 
        new webpack.DllReferencePlugin({
            // 会去找dll文件下的manifest.json文件查看映射，看那些文件不需要打包
            manifest:resolve(__dirname,'dll/manifest.json')
        }),

        // *****************将jquery引进来****************
        // 这个插件的作用是将一些文件打包输出出去,并且将它们引入到html中
        new AddAssetHtmlWebpackPlugin({
            filepath:resolve(__dirname,'dll/jquery.js')
        })
    ],
    mode:'production',
}