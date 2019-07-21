var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourceMaps = require('gulp-sourcemaps');
var server = require('gulp-server-livereload');
var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');
var htmlclean = require('gulp-htmlclean');

gulp.task('sass', function() {
    return  gulp
        .src('src/style/style.scss')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/style'))
});

gulp.task('pages', function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('fonts', function(){
    return gulp.src('src/font/**/*')
        .pipe(gulp.dest('dist/font/'))
});

gulp.task('images', function(){
    return gulp.src('src/img/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img/'))
});

gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(server({
            livereload: {
                enable: true,
                filter: function(filePath, cb) {
                    cb( !(/.DS_Store/.test(filePath)) );
                }
            },
            directoryListing: false,
            open: true,
            log: 'info',
            defaultFile: 'index.html'
        }));
});

gulp.task('default', function() {
    gulp.start('pages', 'sass', 'images', 'fonts', 'webserver');
    gulp.watch('src/*.html', ['pages']);
    gulp.watch('src/**/*.scss', ['sass']);
});