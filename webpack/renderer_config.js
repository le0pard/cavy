/* eslint-disable no-var, strict, global-strict */
/* @flow weak */

'use strict'

var assign = require('lodash/object/assign')
var webpack = require('webpack')
var webpackConfig = require('../webpack/base')


module.exports = function(currentEnv) {
  function isEnv() {
    return Array.prototype.indexOf.call(arguments, currentEnv) >= 0
  }

  var mainConfig = webpackConfig(currentEnv)

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

  var rendererScripts = ['./src/renderer.js']

  var entryPoints = {
    renderer: preScriptsEnv.concat(
      rendererScripts
    )
  }

  var config = assign(mainConfig, {
    target: 'electron-renderer',
    entry:  entryPoints,
    plugins: (function() {
      var plugins = mainConfig.plugins
      if (isEnv('development')) {
        plugins.push(
          new webpack.HotModuleReplacementPlugin(),
          // Tell reloader to not reload if there is an error.
          new webpack.NoErrorsPlugin()
        )
      }
      return plugins
    })()
  })

  return config
}
