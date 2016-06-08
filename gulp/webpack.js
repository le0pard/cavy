/* eslint-env node */
/* eslint-disable no-var, no-console, strict */

var gulp = require('gulp')
var webpackBuild = require('../webpack/build')
var webpackDevServer = require('../webpack/server')
var webpackMainConfig = require('../webpack/main_config')
var webpackRendererConfig = require('../webpack/renderer_config')

function makeWebpackRunner(constructor, configurator) {
  return function(done) {
    var config = configurator.call(null, process.env.NODE_ENV)
    var task = constructor.call(null, config)
    return task(done)
  }
}

gulp.task('set-prod-env', function() {
  process.env.NODE_ENV = 'production'
})


gulp.task('webpack:main-server', ['webpack:main-build'], function() {
	gulp.watch(['src/**/*'], ['webpack:main-build'])
})


gulp.task('webpack:renderer-server', function(done) {
  if ('development' === process.env.NODE_ENV)
    makeWebpackRunner(webpackDevServer, webpackRendererConfig)(done)
  else {
    console.log('webpack:renderer-server will only work in development environment because of asset paths')
    done(1)
  }
})


gulp.task('webpack:main-build', function(done) {
  makeWebpackRunner(webpackBuild, webpackMainConfig)(done)
})

gulp.task('webpack:renderer-build', function(done) {
  if ('production' === process.env.NODE_ENV)
    makeWebpackRunner(webpackBuild, webpackRendererConfig)(done)
  else {
    console.log('webpack:renderer-build will only work in production environment')
    done(1)
  }
})

gulp.task('build', ['set-prod-env', 'webpack:main-build', 'webpack:renderer-build'])
gulp.task('server', ['webpack:renderer-server', 'webpack:main-server'])