var gulp = require('gulp')
var conf = require('./conf')

// copy static files to dist directory
gulp.task('assets', function() {
  gulp.src(conf.assets.app)
    .pipe(gulp.dest(conf.assets.appDest))
})