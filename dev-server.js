// dev-server.js
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.config')
var path = require('path')
var app = express();
var httpProxy = require("http-proxy");
// webpack编译器
var compiler = webpack(webpackConfig);
//  配置代理
var apiProxy = httpProxy.createProxyServer();
// webpack-dev-server中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
  //   proxy: {
  //   "/mockjsdata": {
  //     "target": {
  //       "host": "rap.taobao.org",
  //       "protocol": 'http:',
  //       "port": 80
  //     },
  //     ignorePath: true,
  //     changeOrigin: true,
  //     secure: false
  //   }
  // }
    // proxy: {
    //   '/mockjsdata/*': {
    //     target: 'http://rap.taobao.org',
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
});
app.use(devMiddleware)
app.use(require("webpack-hot-middleware")(compiler));
app.use("/mockjsdata/*", function(req, res) {
    req.url = req.baseUrl; // Janky hack...
    apiProxy.web(req, res, {
      target: {
        port: 80,
        host: "rap.taobao.org"
      }
    });
  });
// 路由
app.get('/:viewname?', function(req, res, next) {

    var viewname = req.params.viewname
        ? req.params.viewname + '.html'
        : 'home.html';
    var filepath = path.join(compiler.outputPath, viewname);
    // 使用webpack提供的outputFileSystem

    compiler.outputFileSystem.readFile(filepath, function(err, result) {
        if (err) {
            // something error

            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

module.exports = app.listen(8080, function(err) {
    if (err) {
        // do something
        return;
    }

    console.log('Listening at http://localhost:' + 8080 + '\n')
})
webpack(webpackConfig)
