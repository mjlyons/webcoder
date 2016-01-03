var babel = require("gulp-babel");
var eslint = require("gulp-eslint");
var gulp = require("gulp");
var gulpIf = require("gulp-if");

var paths = {
  scripts: [
    'js/**/*.js',
    '!js/client/**',
  ],
  static: 'server/static/**',
  localsettings: 'localsettings.js'
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
    .pipe(gulp.dest("build/server/js/"));
});

gulp.task("static", function() {
  return gulp.src(paths.static)
    .pipe(gulp.dest("build/server/static/"));
});

gulp.task("localsettings", function() {
  return gulp.src(paths.localsettings)
    .pipe(gulp.dest("build/server/"));
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(eslint({"fix": true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulpIf(isFixed, gulp.dest('js/')));
});

gulp.task('default', ['localsettings', 'scripts', 'static']);
