var autoprefixer  = require('autoprefixer'),
    browserSync   = require('browser-sync'),
    mqpacker      = require('css-mqpacker'),
    gulp          = require('gulp'),
    postcss       = require('gulp-postcss'),
    sass          = require('gulp-sass'),
    atImport      = require('postcss-import'),
    pump          = require('pump');

gulp.task('css', function () {
  var processors = [
    atImport,
    autoprefixer({browsers: ['last 6 versions']}),
    mqpacker
  ];
  return gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.scss', ['css']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['watch', 'browser-sync']);