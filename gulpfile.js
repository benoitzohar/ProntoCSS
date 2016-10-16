var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var reload = browserSync.reload;

var src = {
    scss: 'src/pronto.scss',
    scsssubs: 'src/pronto/**/*.scss',
    demo: 'demo/demo.scss',
    html: 'index.html'
};

var dest = 'dist/';

// Static Server + watching scss/html files
gulp.task('serve', ['demo', 'sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch([src.scss, src.scsssubs, src.demo], ['demo', 'sass']);
    gulp.watch([src.html]).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(dest))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dest));
});

// Compile demo files
gulp.task('demo', function() {
    return gulp.src(src.demo)
        .pipe(sass())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('demo/'))
        .pipe(reload({
            stream: true
        }));
});


gulp.task('default', ['serve']);
