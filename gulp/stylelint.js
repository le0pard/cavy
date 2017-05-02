const gulp = require('gulp');
const gulpStylelint = require('gulp-stylelint');
const conf = require('./conf');

gulp.task('stylelint', function() {
  return gulp
    .src(conf.css.src)
    .pipe(gulpStylelint({
      syntax: 'sugarss',
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});
