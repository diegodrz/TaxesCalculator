var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var ngAnnotate = require('gulp-ng-annotate')

var app = [
    "app/*.js",
    "app/controllers/*.js"
];

var dependencies = [
    "app/bower_components/jquery/dist/jquery.js",
    "app/bower_components/toastr/toastr.js",
    "app/bower_components/angular/angular.js",
    "app/bower_components/angular-route/angular-route.js",
    "app/bower_components/angular-locale-pt-br/angular-locale_pt-br.js",
];

var styles = [
    "app/bower_components/font-awesome/css/font-awesome.css",
    "app/bower_components/bootswatch-dist/css/bootstrap.css",
    "app/bower_components/toastr/toastr.css",
    "app/css/taxes.css"
];

var fonts = ["app/bower_components/font-awesome/fonts/*"];

gulp.task('check', function () {
    gulp.src(app)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build', function () {
    gulp.src(app)
        .pipe(concat('taxes.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./wwwroot/app'));

    gulp.src(dependencies)
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./wwwroot/assets/js'));

    gulp.src(styles)
        .pipe(concat('styles.min.css'))
        .pipe(cssmin())
		.pipe(gulp.dest('./wwwroot/assets/css'));

    gulp.src(fonts)
		.pipe(gulp.dest('./wwwroot/assets/fonts'));

});

gulp.task('default', function () {
    gulp.run('check', 'build');
    gulp.watch(app, function (evt) {
        gulp.run('check', 'build');
    });
});
