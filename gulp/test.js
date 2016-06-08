/* eslint-env node */
/* eslint-disable no-var */

var gulp = require('gulp')
var runSequence = require('run-sequence')

gulp.task('set-test-env', function() {
  process.env.NODE_ENV = 'test'
  process.env.PHANTOMJS_BIN = '/usr/local/bin/phantomjs' // for karma
})

gulp.task('test', function(done) {
  runSequence('eslint', 'karma', done)
})