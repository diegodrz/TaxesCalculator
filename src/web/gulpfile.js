var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate')

var files = [ "app/*.js","app/controllers/*.js" ];

gulp.task('check', function () {
    gulp.src(files)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('combine', function () {
        gulp.src(files)        
        .pipe(concat('./wwwroot/app'))
        .pipe(rename('taxes.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./wwwroot/app'));
});

gulp.task('all', function () {
    gulp.run('check', 'combine');
    gulp.watch(files, function (evt) {
        gulp.run('check', 'combine');
    });
});