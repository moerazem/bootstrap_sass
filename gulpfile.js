
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync').create();

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'scss/style.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: [
        'Chrome >= 35',
        'Firefox >= 38',
        'Edge >= 12',
        'Explorer >= 10',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12']
    })]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

// Move the javascript files into our js folder
gulp.task('js', function () {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("js"))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series(['sass']), function () {

  browserSync.init({
    proxy: "http://yourdomain.com",
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'scss/*.scss'], ['sass']).on('change', browserSync.reload);

});

gulp.task('default', gulp.parallel(['js', 'serve']));