/* eslint-env node */
/* eslint-disable no-var, no-console, strict */

var gulp = require('gulp')
var Server = require('karma').Server
var path = require('path')

function runKarma(singleRun, done) {
  var server = new Server({
    configFile: path.join(__dirname, '../karma.conf.js'),
    singleRun:  singleRun
  }, function(exitCode) {
    done(0 === exitCode ? null : exitCode)
  })

  server.start()
}

gulp.task('karma', ['set-test-env'], function(done) {
  runKarma(true, done)
})

gulp.task('karma-watch', ['set-test-env'], function(done) {
  runKarma(false, done)
})