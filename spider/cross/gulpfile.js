const gulp = require('gulp');
const pretty = require('gulp-pretty');

gulp.task('b', () =>
  gulp
    .src('1.js')
    .pipe(pretty())
    .pipe(gulp.dest('/tmp/'))
);


// prettier can be called by itself...
gulp.task('format', () =>
  gulp
    .src('html/*.js')
    .pipe(pretty())
    .pipe(gulp.dest('html/js/'))
);



// ...or with options.
gulp.task('format-with-options', () =>
  gulp
    .src('src/**/*.html')
    .pipe(
      pretty({
        singleQuote: true,
        trailingComma: 'es5',
      })
    )
    .pipe(gulp.dest('src/'))
);
