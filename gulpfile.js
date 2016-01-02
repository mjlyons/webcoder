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
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest("build/server/"));
});

gulp.task("static", function() {
  return gulp.src(paths.static)
    .pipe(gulp.dest("build/server/"));
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(eslint({"fix": true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulpIf(isFixed, gulp.dest('js/')));
});

gulp.task('default', ['scripts', 'static']);
