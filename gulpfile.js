var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    stylelint = require('stylelint'),
    sourcemaps = require('gulp-sourcemaps'),
    reporter = require('postcss-reporter'),
    sasssyntax = require('postcss-scss'),
    cleanCSS = require('gulp-clean-css'),
    brightconfig = require('stylelint-config-bright'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),
    sassFiles = ['src/sass/**/*.scss'],
    jsFiles = ['src/js/**/*.js'];

gulp.task('transpile-min', function () {
    process.env.NODE_ENV = 'production';

    browserify({
        entries: 'standalone.js',
        extensions: ['.js'],
        debug: false
    })
        .transform(babelify)
        .bundle()
        .pipe(source('indexed-cloudinary.min.js'))
        .pipe(buffer())
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('transpile', function () {
    browserify({
        entries: 'standalone.js',
        extensions: ['.js'],
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source('indexed-cloudinary.js'))
        .pipe(gulp.dest('dist'));
});


/*  CSS related tasks
 ----------------------------------------------- */
gulp.task('sass', function () {
    return gulp.src(sassFiles)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

// Run postcss after the sass task has finished
gulp.task('css', ['sass', 'cssLint'], function () {
    var processors = [
        autoprefixer({browsers: ['last 2 versions', 'ie 9', 'ie 10']})
    ];

    return gulp.src('dist/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(cleanCSS({debug: true}, function (details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('cssLint', function () {
    var processors = [
        stylelint(brightconfig),
        reporter({
            clearMessages: true
        })
    ];

    return gulp.src(sassFiles)
        .pipe(postcss(processors, {syntax: sasssyntax}));
});


/*  Watch statements
 ----------------------------------------------- */

gulp.task('watch', function () {
    gulp.watch(sassFiles, ['css']);
    gulp.watch(jsFiles, ['transpile']);
});

gulp.task('build', ['css', 'transpile', 'transpile-min']);

gulp.task('default', ['build']);

