'use strict';
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./src/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  return gulp.src('./src/js/script.js')
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  browserSync.init({
    server: "./dist/"
  });

  gulp.watch('./src/sass/**/*.scss', gulp.series("sass"));
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js', gulp.series("scripts"));
});