var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var gulpTslint = require('gulp-tslint');
var runSequence = require('run-sequence');
var typescript = require('gulp-typescript');
var tslint = require('tslint');

var tsProject = typescript.createProject('tsconfig.json');

var path = {
    src: './src/',
    dist: './dist/',
    example: './examples/AdaptiveCards/',
};

// Clean destination folder
gulp.task('clean', function () {
    return del([path.dist, path.example]);
});

// Minify images in place
gulp.task('minify-img', function () {
    return gulp.src(path.src + 'Assets/**/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest(path.dist + 'Assets'))
        .pipe(gulp.dest(path.example + 'Assets'));
});

// Checks your TypeScript code for readability, maintainability, and functionality errors.
gulp.task('lint-ts', function () {
    var program = tslint.Linter.createProgram('./tsconfig.json');
    return gulp.src([path.src + '**/*.ts', path.src + '**/*.tsx'])
        .pipe(gulpTslint({
            formatter: 'stylish',
            program: program
        }))
        .pipe(gulpTslint.report({
            emitError: true
        }));
});

// Copy .json files
gulp.task('copy-json', function () {
    gulp.src(path.src + '**/*.json')
        .pipe(gulp.dest(path.dist))
        .pipe(gulp.dest(path.example));
});

gulp.task('compile-ts', function () {
    var tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js
        .pipe(gulp.dest(path.dist))
        .pipe(gulp.dest(path.example));
});

gulp.task('default', function (cb) {
    runSequence('clean', [
        'minify-img',
        'lint-ts',
        'compile-ts',
        'copy-json',
    ], cb);
});