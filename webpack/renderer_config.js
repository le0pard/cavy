/* eslint-disable no-var, strict, global-strict */
/* @flow weak */

'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const conf = require('./conf');
const baseWebpackConfig = require('./base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const browserSupport = {
  browsers: [
    'last 2 version'
  ]
};

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      modules: false,
      minimize: conf.isProduction,
      sourceMap: !conf.isProduction
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: !conf.isProduction,
      plugins: function() {
        return [
          require('postcss-import')({
            addDependencyTo: webpack
          }),
          require('postcss-url')(),
          require('postcss-cssnext')({
            browsers: browserSupport.browsers,
            features: {
              rem: false
            }
          }),
          require('postcss-browser-reporter')(),
          require('postcss-reporter')()
        ];
      }
    }
  }
];

const preScripts = {
  development: [],
  production: []
};

const preScriptsEnv = conf.isProduction ? preScripts['production'] : preScripts['development'];

const rendererConfig = webpackMerge(baseWebpackConfig, {
  target: 'electron-renderer',
  entry: {
    renderer: preScriptsEnv.concat([
      './src/renderer.js'
    ])
  },
  module: {
    rules: [
      {
        test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg|ico)$/,
        exclude: /symbol\/svg\//,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      },
      {
        test: /sprite\.symbol\.svg$/,
        include: /symbol\/svg\//,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders.concat({
            loader: 'sass-loader',
            options: {
              indentedSyntax: false,
              sourceMap:      !conf.isProduction,
              includePaths:   [path.join(__dirname, '..', 'src', 'css')]
            }
          })
        })
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders.concat({
            loader: 'sass-loader',
            options: {
              indentedSyntax: true,
              sourceMap:      !conf.isProduction,
              includePaths:   [path.join(__dirname, '..', 'src', 'css')]
            }
          })
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Cavy',
      inject: 'body',
      template: 'src/index.ejs'
    }),
    new ExtractTextPlugin({
      filename: conf.isProduction ? 'app-[contenthash].css' : 'app.css',
      allChunks: true
    })
  ]
});

module.exports = rendererConfig;
