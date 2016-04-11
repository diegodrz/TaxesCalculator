var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var print = require('gulp-print');
var angularFilesort = require('gulp-angular-filesort');

gulp.task('vendors-task', function () {
    var target = gulp.src('index.html');

    var vendorStream = gulp.src(['./bower_components/angular-route/angular-route.js',
                                 './bower_components/angular/angular.js',
                                 './bower_components/bootstrap/dist/js/bootstrap.js',
                                 './bower_components/jquery/dist/jquery.js']);

    return target
        .pipe(inject(
            vendorStream.pipe(print())
                        .pipe(angularFilesort())
                        .pipe(concat('vendors.js'))
                        .pipe(gulp.dest('.build/vendors')), { name: 'vendors' }))
        .pipe(gulp.dest('./views/home/'));
});