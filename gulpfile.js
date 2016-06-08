/* eslint-env node */
/* eslint-disable no-var, no-console, strict */

'use strict'

var gulp = require('gulp')
var path = require('path')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.NODE_PATH = [
  path.join(__dirname, 'src'),
  path.join(__dirname, 'node_modules')
].join(':')

require('./gulp/assets')
require('./gulp/webpack')

require('./gulp/eslint')
require('./gulp/karma')
//require('./gulp/spectron')
require('./gulp/test')

//require('./gulp/svg-sprite')

gulp.task('release', ['build', 'assets'])
gulp.task('default', ['server'])
