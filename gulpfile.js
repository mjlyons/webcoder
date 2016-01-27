var babel = require("gulp-babel");
var eslint = require("gulp-eslint");
var gulp = require("gulp");
var gulpIf = require("gulp-if");

var paths = {
  serverScripts: [
    'js/**/*.js',
    '!js/client/**',
  ],
  allScripts: [
    'js/**/*.js'
  ],
  allTests: [
    'test/**/*.js'
  ],
  ace: [
    'thirdparty/ace-builds/src-min-noconflict/**',
  ],
  static: ['static/**', '!**/.*'],
  localsettings: ['settings.js', 'localsettings.js', 'buildsettings.js'],
};

function isFixed(file) {
	// Has ESLint fixed the file contents?
	return file.eslint != null && file.eslint.fixed;
}

gulp.task("scripts", function() {
  return gulp.src(paths.serverScripts)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest("build/js/"));
});

gulp.task('ace', function() {
  return gulp.src(paths.ace)
    .pipe(gulp.dest('./build/static/client/ace/'));
});

gulp.task("static", function() {
  return gulp.src(paths.static)
    .pipe(gulp.dest("build/static/"));
});

gulp.task("localsettings", function() {
  return gulp.src(paths.localsettings)
    .pipe(gulp.dest("build/"));
});

gulp.task('lint-js', function() {
  return gulp.src(paths.allScripts)
    .pipe(eslint({"fix": true}))
    .pipe(eslint.format("node_modules/eslint-friendly-formatter"))
    .pipe(eslint.failAfterError())
    .pipe(gulpIf(isFixed, gulp.dest('js/')));
});
gulp.task('lint-test', function() {
  return gulp.src(paths.allTests)
    .pipe(eslint({"fix": true, "rules": {'no-unused-expressions': 0}}))  // expect()... is an unused expression
    .pipe(eslint.format("node_modules/eslint-friendly-formatter"))
    .pipe(eslint.failAfterError())
    .pipe(gulpIf(isFixed, gulp.dest('test/')));
});
gulp.task('lint', ['lint-js', 'lint-test']);

gulp.task('default', ['localsettings', 'scripts', 'static', 'ace']);
