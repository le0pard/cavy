/* eslint-env node */
/* eslint-disable no-var, no-console, strict */

const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');

gulp.task('svg-sprite', function() {
  var svgSpriteConfig = {
    svg: {
      xmlDeclaration:      false,
      doctypeDeclaration:  false,
      dimensionAttributes: false,
      rootAttributes:      {
        xmlns:         'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        id:            'cavy-sprite',
        style:         'display:none'
      },
      transform: [{
        svgo: {
          plugins: [
            {mergePaths: false},
            {cleanupIDs: false}
          ]
        }
      }]
    },
    shape: {
      id: {
        generator: '%s-icon'
      }
    },
    mode: {
      inline: true,
      symbol: {
        dest: 'symbol',
        sprite: 'svg/sprite.symbol.svg'
      }
    }
  };

  return gulp.src('src/css/svg/*.svg')
    .pipe(svgSprite(svgSpriteConfig))
    .pipe(gulp.dest('src/css'));
});
