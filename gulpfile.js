'use strict';

var path = require('path');
var gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  reactify = require('reactify'),
  del = require('del'),
  livereload = require('gulp-livereload'),
  babelify = require('babelify'),
  nodemon = require('gulp-nodemon');


var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('styles', function() {
  return gulp.src('./public/assets/sass/main.scss')
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/assets/css'));
});


gulp.task('client', function() {
  browserify('./client/app.js')
    .transform(babelify)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('nodemon', function() {
  process.env.NODE_ENV = 'development';
  nodemon({
    script: './index.js',
    ext: 'html js',
    ignore: [
      'node_modules/',
      'public/'
    ]
  });
});

gulp.task('clean', function() {
  del([
    './public/assets/css/**/*',
    './public/assets/js/**/*'
  ]);
});

gulp.task('build', ['clean'], function() {
  gulp.start(['styles', 'client']);
});

gulp.task('watch', function() {
  gulp.watch('./public/assets/sass/**/*.scss', ['styles']);
  gulp.watch('./client/**/*.js', ['client']);
  gulp.watch('./public/assets/**/*', livereload.changed);

  nodemon({
    script: './index.js',
    ext: 'html js',
    ignore: [
      'node_modules/',
      'public/'
    ]
  }).on('restart', livereload.changed);
});

gulp.task('dev', ['watch'], function() {
  console.log(livereload.server);
  livereload.listen();
});