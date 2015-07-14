'use strict';

var path = require('path');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var ractivate = require('ractivate');
var del = require('del');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');


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


gulp.task('client', ['site', 'feed']);

gulp.task('site', function() {
  browserify('./client/site/index.js')
      .bundle()
      .pipe(source('site.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/assets/js'));
});


gulp.task('feed', function() {
  browserify('./client/feed/index.js')
      .transform({ extensions: [ '.ract' ] }, ractivate)
      .bundle()
      .pipe(source('feed.js'))
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
      'node_modules/'
    ]
  }).on('restart', livereload.changed);
});

gulp.task('dev', ['watch'], function() {
  console.log(livereload.server);
  livereload.listen();
});