var babel = require("gulp-babel");
var eslint = require("gulp-eslint");
var gulp = require("gulp");
var gulpIf = require("gulp-if");

var paths = {
  scripts: 'src/**/*.js',
  static: 'static/**'
};

function isFixed(file) {
	// Has ESLint fixed the file contents?
	return file.eslint != null && file.eslint.fixed;
}

gulp.task("scripts", function() {
  return gulp.src(paths.scripts)
    .pipe(babel())
    .pipe(gulp.dest("build/"));
});

gulp.task("static", function() {
  return gulp.src(paths.static)
    .pipe(gulp.dest("build/"));
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(eslint({"fix": true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulpIf(isFixed, gulp.dest('src/')));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']),
  gulp.watch(paths.static, ['static']);
});

gulp.task('default', ['lint', 'scripts', 'static']);
