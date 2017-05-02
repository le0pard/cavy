/* eslint-disable no-var, strict, global-strict */
/* @flow weak */

'use strict';

const gutil = require('gulp-util');
const conf = require('./conf');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

module.exports = function(webpackConfig) {
  return function(callback) {
    new WebpackDevServer(webpack(webpackConfig)).listen(conf.devServerPort, conf.devServerHost, function(err) {
      // Callback is called only once, can't be used to catch compilation errors.
      if (err)
        throw new gutil.PluginError('webpack-dev-server', err);

      gutil.log('[webpack-dev-server]', 'localhost:' + conf.devServerPort + '/build/app.js');
      callback();
    })
  }
}
