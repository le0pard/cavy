/* eslint-env node */
/* eslint-disable no-var */

var gulp = require('gulp')
var eslint = require('gulp-eslint')
var conf = require('./conf')

gulp.task('eslint', function() {
  return gulp.src(conf.js.src.concat(conf.jsx.src))
    .pipe(eslint())
    .pipe(eslint.format('stylish'))
    .pipe(eslint.failAfterError())
})