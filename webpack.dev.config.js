// webpack.config.js
var webpack = require('webpack')
var glob = require('glob')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractCSS = new ExtractTextPlugin('css/[name].css')
var path = require('path')
var webpackConfig = {
    /* 一些webpack基础配置 */
    entry: {

    },
    output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, './dist'),
    },
    plugins: [
      extractCSS,
      new webpack.LoaderOptionsPlugin({
        options: {
          vue: {
            loaders: {
             less: extractCSS.extract({
                 fallback: 'style-loader',
                 use: [
                   {
                     loader: 'css-loader'
                   },
                   {
                     loader: 'less-loader'
                   }
                 ]
               })
            }
         }
        }
      }),
       new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: {
            loader: 'vue-loader'
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [{
            loader: 'babel-loader'
          }]
        },
        {
          test: /\.styl$/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader'
              },
              {
                loader: 'less-loader'
              }
            ]
          })
        },
        {
          test: /\.(png|jpg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[ext]'
            }
          }
        }
      ]
    }
};

// 获取指定路径下的入口文件
function getEntries(globPath) {
     var files = glob.sync(globPath),
       entries = {};

     files.forEach(function(filepath) {
         // 取倒数第二层(view下面的文件夹)做包名
         var split = filepath.split('/');
         var name = split[split.length - 2];

         entries[name] = './' + filepath;
     });

     return entries;
}

var entries = getEntries('src/views/**/index.js');
// var entries = ['src/views/**/index.js'];
Object.keys(entries).forEach(function(name) {
    var arrPath = []
    arrPath.push('webpack-hot-middleware/client')
    arrPath.push(entries[name])
    // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
    webpackConfig.entry[name] = arrPath;

    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin({
        // 生成出来的html文件名
        filename: name + '.html',
        // 每个html的模版，这里多个页面使用同一个模版
        template: './template.html',
        // 自动将引用插入html
        inject: true,
        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        chunks: [name]
    });
    webpackConfig.plugins.push(plugin);
})
console.log(webpackConfig.entry);
module.exports = webpackConfig
