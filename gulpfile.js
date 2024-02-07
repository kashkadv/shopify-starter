const gulp = require("gulp")
const concat = require("gulp-concat")
const uglify = require("gulp-uglify")
const rename = require("gulp-rename")
const watch = require("gulp-watch")

const srcScripts = "src/scripts/*.js"
const destDir = "assets"

function bundleScripts() {
  return gulp
    .src(srcScripts)
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(destDir))
}

function watchScripts() {
  return watch(srcScripts, gulp.series(bundleScripts))
}

exports.watch = gulp.series(bundleScripts, watchScripts)
exports.default = gulp.series(bundleScripts)
