import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = (webpackConfigObj, env) => {

  const webpackConfig = webpackConfigObj;

  const production = env === 'production';

  // 支持scss编译
  const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development'
  });

  webpackConfig.module.rules.push({
    test: /\.(scss)$/,
    use: extractSass.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            module: true, // 开启css模块化
            localIdentName: '[local]_[hash:base64:5]'
          }
        }, {
          loader: 'resolve-url-loader'
        }, {
          loader: 'sass-loader'
        }
      ],
      fallback: 'style-loader?sourceMap'
    })
  });
  webpackConfig.plugins.push(extractSass);

  // 支持文件模块化
  webpackConfig.module.rules.push({
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: ['file-loader']
   });

  if (production) {
    webpackConfig.plugins.forEach(item => {
      // 取消console
      if (item.options && item.options.compress && item.options.mangle && item.options.output) {
        item.options.compress.drop_console = true;
        item.options.compress.drop_debugger = true;
      }

      // 压缩html
      if (item.options && item.options.template && item.options.filename.includes('.html')) {
        item.options.minify = {
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
          collapseWhitespace: true,
          removeComments: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        };
      }
    });

    // 添加头部备注
    const banner = `
      copyright (c) 2018-?, test v1.0.0
      description: test
      build time: ${new Date()}
      author: test
    `;
    webpackConfig.plugins.push(new webpack.BannerPlugin(banner));
  }

  if (env === 'development') {
    // webpackConfig.module.rules.push(
    //   {
    //     test: /\.jsx?$/,
    //     exclude: /node_modules/,
    //     loaders: ['eslint-loader'],
    //   },
    // );
    webpackConfig.devServer = webpackConfig.devServer || {};
    webpackConfig.devServer.overlay = {
      errors: true,
      warnings: true,
    };
  }



  return webpackConfig;
};
