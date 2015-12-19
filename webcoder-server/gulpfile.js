var gulp = require("gulp");
var babel = require("gulp-babel");
var jasmine = require("gulp-jasmine");

var paths = {
  scripts: 'src/**/*.js',
  static: 'static/**'
};

gulp.task("scripts", function() {
  return gulp.src(paths.scripts)
    .pipe(babel())
    .pipe(gulp.dest("build/"));
});

gulp.task("static", function() {
  return gulp.src(paths.static)
    .pipe(gulp.dest("build/"));
})

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts', 'test']),
  gulp.watch(paths.static, ['static']);
});

gulp.task('test', function() {
  return gulp.src('build/spec/**')
    .pipe(jasmine());
});

gulp.task('default', ['scripts', 'static', 'test', 'watch']);
