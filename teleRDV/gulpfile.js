var gulp = require("gulp");
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var gulpUtil = require('gulp-util');

gulp.task('default', ['watch']);

gulp.task('lint', () => {
    return gulp.src(['app/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.js', ['appjs']);
});


gulp.task('appjs', function () {
    return gulp.src('app/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify().on('error', gulpUtil.log))
        .pipe(gulp.dest('scripts'))
});

gulp.task('fonts', function () {
    return gulp.src(['bower_components/font-awesome/fonts/*',
                    'bower_components/bootstrap/dist/fonts/*'])
            .pipe(gulp.dest('fonts/'));
});

gulp.task('images', function () {
    return gulp.src(['bower_components/angular-tree-control/images/*'])
            .pipe(gulp.dest('images/'));
});

gulp.task('nglocale', function () {
    return gulp.src(['bower_components/angular-i18n/angular-locale_en.js',
                    'bower_components/angular-i18n/angular-locale_el.js'])
            .pipe(gulp.dest('scripts'));
});

gulp.task('vendorjs', function () {
    return gulp.src(mainBowerFiles('**/*.js'))        
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('scripts'))
});

gulp.task('vendorcss', function () {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(concat('vendor.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('css'))
});

gulp.task('appcss', function () {
    return gulp.src('content/**/*.css')
        .pipe(concat('app.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('css'))
});

gulp.task('build', ['fonts', 'images', 'nglocale', 'vendorjs', 'vendorcss', 'appcss', 'appjs']);