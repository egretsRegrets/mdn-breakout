/*'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['src/*.html']
};

gulp.task('copyHtml', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('default', ['copyHtml', 'sass'], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/js/main.js'],
        cache: {},
        packageCache: {}
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js'));
});*/

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['src/*.html']
};

gulp.task('copyHtml', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('js', function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/js/main.js'],
        cache: {},
        packageCache: {}
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['copyHtml', 'sass', 'js'], function () {
    gulp.watch('src/*.html', ['copyHtml']);
    gulp.watch('./src/styles/*.scss', ['sass']);
    gulp.watch('src/js/*js', ['js']);
});