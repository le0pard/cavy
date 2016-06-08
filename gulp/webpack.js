/* eslint-env node */
/* eslint-disable no-var, no-console, strict */

var gulp = require('gulp')
var webpackBuild = require('../webpack/build')
var webpackDevServer = require('../webpack/server')
var frontendConfig = require('../webpack/config')

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

gulp.task('webpack-build', makeWebpackRunner(webpackBuild, frontendConfig))
gulp.task('webpack-server', function(done) {
  if (process.env.NODE_ENV === 'development')
    makeWebpackRunner(webpackDevServer, frontendConfig)(done)
  else {
    console.log('webpack-dev-server will only work in development environment because of asset paths')
    done(1)
  }
})

gulp.task('build', ['set-prod-env', 'webpack-build'])
gulp.task('server', ['webpack-server'])