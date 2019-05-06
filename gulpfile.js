var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var gulpTslint = require('gulp-tslint');
var ts = require('gulp-typescript');
var tslint = require('tslint');

var tsProject = ts.createProject('tsconfig.json');

var path = {
    src: './src/',
    dist: './dist/',
    tool: './tool/src/assets/AdaptiveCards/',
};
function clean() {
    return del([path.dist, path.tool]);
}

function minifyImage() {
    return gulp.src(path.src + 'Assets/**/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest(path.dist + 'Assets'))
        .pipe(gulp.dest(path.tool + 'Assets'))
        .pipe(rename(function (opt) {
            opt.basename = opt.basename.replace(/@[^.]*/, '');
            return opt;
        }));
}

function lintTs() {
    var program = tslint.Linter.createProgram('./tsconfig.json');
    return gulp.src([path.src + '**/*.ts', path.src + '**/*.tsx'])
        .pipe(gulpTslint({
            formatter: 'stylish',
            program: program
        }))
        .pipe(gulpTslint.report({
            emitError: true
        }));
}

function copyJson() {
    return gulp.src(path.src + '**/*.json')
        .pipe(gulp.dest(path.dist))
        .pipe(gulp.dest(path.tool));
}

function copyDefinition() {
    return gulp.src(path.src + '**/*.d.ts')
        .pipe(gulp.dest(path.dist))
        .pipe(gulp.dest(path.tool));
}

function compileTs() {
    var tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult
        .pipe(gulp.dest(path.dist))
        .pipe(gulp.dest(path.tool));
}

exports.clean = clean;
exports.minifyImage = minifyImage;
exports.lintTs = lintTs;
exports.copyJson = copyJson;
exports.compileTs = compileTs;
exports.copyDefinition = copyDefinition;
exports.build = gulp.series(
    lintTs,
    clean,
    compileTs,
    gulp.parallel(minifyImage, copyJson),
);
exports.default = exports.build;
