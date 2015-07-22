'use strict';

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var reactify = require('reactify');
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

// ============================================================================
//  Main Tasks
// ============================================================================

// Default task is build
gulp.task('default', ['build']);

// Build task
gulp.task('build', ['clean'], function() {
  gulp.start(['styles', 'app']);
});

// Dev mode
gulp.task('dev', ['watch'], function() {
  livereload.listen();
});

// Clean task
gulp.task('clean', function() {
  del([
    './www/assets/css/**/*.css',
    './www/assets/js/**/*.js'
  ]);
});


// ============================================================================
//  Style task(s)
// ============================================================================

gulp.task('styles', function() {
  return gulp.src('./www/assets/sass/main.scss')
      .pipe(sass({
        includePaths: require('node-bourbon').includePaths
      }))
      .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
      .pipe(minifycss())
      .pipe(gulp.dest('./www/assets/css'));
});


// ============================================================================
//  Client side (browserify, watchify) tasks
// ============================================================================

// bundle function
function bundle(b) {
  return b.bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./www/assets/js'));
}

// app task
gulp.task('app', function() {

  // watch or build?
  var watch = this.seq.indexOf('watch') !== -1;

  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  // react trasnform
  b.transform(reactify);

  // enable watchify if watch task is executed
  if (watch) {
    b = watchify(b);

    // rebundle on update
    b.on('update', function() {
      bundle(b);
    });
  }

  // handle errors
  b.on('error', function(err) {
    gutil.log(err);
  });

  // add our source file
  b.add('./app/index.js');

  // bundle the app
  bundle(b);

});


// ============================================================================
//  Watch & livereload
// ============================================================================

gulp.task('watch', ['app'], function() {
  gulp.watch('./www/assets/sass/**/*.scss', ['styles']);
  gulp.watch('./www/assets/**/*', livereload.changed);

  nodemon({
    script: './index.js',
    ext: 'html js',
    ignore: [
      'node_modules/',
      'gulpfile.js'
    ]
  }).on('restart', livereload.changed);
});
