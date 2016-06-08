/* eslint-disable no-var, strict, global-strict */
/* @flow weak */

'use strict'

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var webpack = require('webpack')

var browserSupport = {
  browsers: [
    'last 2 version',
    'Chrome 42'
  ]
}

module.exports = function(currentEnv) {
  function isEnv() {
    return Array.prototype.indexOf.call(arguments, currentEnv) >= 0
  }

  function stylesLoaders() {
    var extLoaders = 'css-loader!postcss-loader'
    var loader = isEnv('development', 'test') ? 'style-loader!' + extLoaders :
      ExtractTextPlugin.extract('style-loader', extLoaders)
    return {
      loader: loader,
      test:   /\.css$/
    }
  }

  var preScripts = {
    development: [
      'webpack-dev-server/client?http://localhost:8888',
      // Why only-dev-server instead of dev-server:
      // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
      'webpack/hot/only-dev-server'
    ],
    test: []
  }
  var preScriptsEnv = preScripts[currentEnv] || []

  var appScripts = ['./src/index.js']

  var entryPoints = {
    app: preScriptsEnv.concat(
      appScripts
    )
  }

  var config = {
    browserSupport: browserSupport.browsers,
    cache:          isEnv('development'),
    debug:          isEnv('development'),
    devtool:        (isEnv('production') ? 'hidden-source-map' : (isEnv('development') || isEnv('test') ? 'inline-source-map' : 'source-map')),
    target:         'web',
    entry:          entryPoints,
    postcss: function() {
      return [
        require('postcss-import')({addDependencyTo: webpack}),
        require('postcss-url')(),
        require('postcss-cssnext')({browsers: browserSupport.browsers}),
        require('postcss-browser-reporter')(),
        require('postcss-reporter')()
      ]
    },
    module: {
      loaders: [{
        loader: 'url-loader?limit=10000',
        test:   /\.(gif|jpg|png|woff|woff2|eot|ttf|svg|ico)$/
      }, {
        exclude: /node_modules/,
        loaders: isEnv('development') ? [
          'react-hot', 'babel-loader'
        ] : [
          'babel-loader'
        ],
        test: /\.(js|jsx)$/
      }, {
        test:    /\.json$/,
        loaders: ['json']
      }].concat(stylesLoaders()),
      noParse: [
        /node_modules\/bluebird\/js\/browser\/bluebird\.js/,
        /moment\/moment\.js/
      ]
    },
    output: isEnv('development') ? {
      path:       path.join(__dirname, '/build/'),
      filename:   '[name].js',
      publicPath: 'http://localhost:8888/build/'
    } : {
      path:              'build/',
      filename:          '[name].js',
      sourceMapFilename: 'debugging/[file].map'
    },
    plugins: (function() {
      var plugins = [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV':                JSON.stringify(currentEnv),
          'process.env.WEBPACK_LOGGER_DISABLED': isEnv('production')
        })
      ]
      if (isEnv('development')) {
        plugins.push(
          new webpack.HotModuleReplacementPlugin(),
          // Tell reloader to not reload if there is an error.
          new webpack.NoErrorsPlugin()
        )
      } else if (isEnv('test')) {
        plugins.push(
          new webpack.optimize.OccurenceOrderPlugin()
        // https://github.com/webpack/webpack/issues/1082
        //  new webpack.optimize.DedupePlugin()
        )
      } else {
        plugins.push(
          // Render styles into separate cacheable file to prevent FOUC and
          // optimize for critical rendering path.
          new ExtractTextPlugin('app.css', {
            allChunks: true
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            },
            mangle:    isEnv('production'),
            sourceMap: true
          })
        )
      }

      return plugins
    })(),
    resolve: {
      alias: {
        bluebird: 'bluebird/js/browser/bluebird.js'
      },
      extensions: ['', '.js', '.jsx', '.json'],
      root:       [path.join(__dirname, '..', 'src')]
    },
    profile: process.env.PROFILE_WEBPACK
  }

  return config
}
