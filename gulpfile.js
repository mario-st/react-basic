var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var react = require('gulp-react');
var babel = require('gulp-babel');
var plumber = require("gulp-plumber");
var watch = require("gulp-watch");

gulp.task("watch", function () {
    return gulp.src("src/**/*.jsx")
        .pipe(plumber())
        .pipe(watch('src/**/*.jsx', { verbose: true }))
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ["react", "es2015"]}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("lib"));
});

gulp.task("default", function () {
    return gulp.src("src/**/*.jsx")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ["react", "es2015"]}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("lib"));
});