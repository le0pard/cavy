/* eslint-env node */
/* eslint-disable no-var, no-console, strict */

const gulp = require('gulp');
const webpackBuild = require('../webpack/build');
const webpackDevServer = require('../webpack/server');
const webpackMainConfig = require('../webpack/main_config');
const webpackRendererConfig = require('../webpack/renderer_config');

function makeWebpackRunner(builder, config) {
  return function(done) {
    var task = builder(config);
    return task(done);
  };
}

gulp.task('webpack:main-server', ['webpack:main-build'], function() {
  gulp.watch(['src/**/*'], ['webpack:main-build']).on('error', (e) => console.error('Error', e));
});

gulp.task('webpack:renderer-server', function(done) {
  makeWebpackRunner(webpackDevServer, webpackRendererConfig)(done);
});

gulp.task('webpack:main-build', function(done) {
  makeWebpackRunner(webpackBuild, webpackMainConfig)(done);
});

gulp.task('webpack:renderer-build', function(done) {
  makeWebpackRunner(webpackBuild, webpackRendererConfig)(done);
});
