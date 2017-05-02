/* eslint-env node */
/* eslint-disable no-var, no-console, strict */

'use strict';

var gulp = require('gulp');
var path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('./gulp/webpack');
require('./gulp/eslint');
require('./gulp/stylelint');

gulp.task('test', ['eslint', 'stylelint']);
gulp.task('build', ['webpack:main-build', 'webpack:renderer-build']);
gulp.task('start', ['webpack:renderer-server', 'webpack:main-server']);
