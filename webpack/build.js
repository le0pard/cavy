/* eslint-disable no-var, strict, global-strict */

'use strict';

const webpack = require('webpack');
const gutil = require('gulp-util');
const fs = require('fs');

module.exports = function(webpackConfig) {
  return function(callback) {
    webpack(webpackConfig, function(fatalError, stats) {
      var jsonStats = stats.toJson();
      var buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0];

      if (buildError)
        throw new gutil.PluginError('webpack', buildError);

      gutil.log('[webpack]', stats.toString({
        colors:       true,
        version:      false,
        hash:         false,
        timings:      false,
        chunks:       false,
        chunkModules: false
      }));

      if (process.env.PROFILE_WEBPACK)
        fs.writeFile('webpack.stats.json', JSON.stringify(jsonStats));

      callback();
    })
  }
}
