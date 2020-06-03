//导入处理路径模块
var path = require('path');

//启动热更新的第二步
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

const VueloaderPlugin = require('vue-loader/lib/plugin')

//这个文件其实就是一个js文件，通过node操作模块，向外暴露一个配置对象
module.exports = {
    entry:path.join(__dirname,'./main.js'),  //入口，表示要用webpack打包这个文件
    output:{
        //输出相关配置
        path:path.join(__dirname,'./dist'),  //指定打包好的文件，输出到那个目录
        filename:'bundle.js'   //只是指定输出的文件名称
    },
    devServer:{
        open:true,
        contentBase:'./',
        port:8888,
        hot:true   //启动热更新的第一步
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./index.html'),
            filename:'index.html'
        }),
        new VueloaderPlugin(),
    ],
    module:{//这个节点，用于配置所有第三方模块加载器
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},  //配置.css第三方loader
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},  //配置.scss第三方loader
            {test:/\.(jpg|png|gif|webp)$/,use:'url-loader?limit=200&name=[hash:32]-[name].[ext]'},  //配置图片第三方loader
            {test:/\.vue$/,use:'vue-loader'},  //配置.vue第三方loader
        ]
    
    }
}