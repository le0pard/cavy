/* eslint-env node */
/* eslint-disable no-var, no-console, strict */

'use strict';

var gulp = require('gulp');
var path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('./gulp/webpack');
require('./gulp/eslint');
require('./gulp/stylelint');
require('./gulp/svg_sprite');

gulp.task('test', ['eslint', 'stylelint']);
gulp.task('release', ['webpack:main-build', 'webpack:renderer-build']);
gulp.task('start', ['webpack:renderer-server', 'webpack:main-server']);
