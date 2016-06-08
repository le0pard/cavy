/* eslint-disable no-var, strict, global-strict */
/* @flow weak */

'use strict'

var assign = require('lodash/object/assign')
var webpackConfig = require('../webpack/base')


module.exports = function(currentEnv) {
  function isEnv() {
    return Array.prototype.indexOf.call(arguments, currentEnv) >= 0
  }

  var mainConfig = webpackConfig(currentEnv)

  var mainScripts = ['./src/main.js']

  var entryPoints = {
    main: mainScripts
  }

  var config = assign(mainConfig, {
    target: 'electron',
    entry:  entryPoints,
    node: {
      __dirname:  false,
      __filename: false
    },
    output: isEnv('development') ? {
      path:              'app/',
      filename:          '[name].js',
      sourceMapFilename: '[file].map'
    } : {
      path:              'build/',
      filename:          '[name].js',
      sourceMapFilename: 'debugging/[file].map'
    },
    externals: []
  })

  return config
}
