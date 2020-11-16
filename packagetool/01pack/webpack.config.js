
const { resolve} = require('path')

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    // loader的配置
    module:{
        rules:[
            // 详细配置信息
           { 
               test:/\.css$/,
               use:
                  [ 
                    //  创建style标签将js中的样式资源添加到head标签中生效
                    'style-loader',
                    // 执行顺序由下至上 css-loader将带有css的文件以字符串的形式变为common.js文件架子啊到js文件中
                    'css-loader'
                ]
            },

            // 配置less-loader
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    // 负责将less文件编译成css文件交给css-loader
                    // 下载less-loader还需下载less
                    'less-loader'
                ]
            }

        ]
    },
    plugins:[
        // 插件的详细配置
    ],
    // 开发模式还是生产模式 production（生产模式会将打包好的文件压缩）
    mode:"development",
}