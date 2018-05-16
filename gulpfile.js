var gulp = require("gulp");
var sass = require("gulp-sass");

gulp.task("copy:html", function() {
  return gulp.src("src/**/*.html")
    .pipe(gulp.dest("dist/amd"))
    .pipe(gulp.dest("dist/commonjs"))
    .pipe(gulp.dest("dist/es2015"))
    .pipe(gulp.dest("dist/native-modules"))
    .pipe(gulp.dest("dist/system"));
});

gulp.task("copy:css", function() {
  return gulp.src("src/**/*.css")
    .pipe(gulp.dest("dist/amd"))
    .pipe(gulp.dest("dist/commonjs"))
    .pipe(gulp.dest("dist/es2015"))
    .pipe(gulp.dest("dist/native-modules"))
    .pipe(gulp.dest("dist/system"));
});

gulp.task("copy:json", function() {
  return gulp.src("src/**/*.json")
    .pipe(gulp.dest("dist/amd"))
    .pipe(gulp.dest("dist/commonjs"))
    .pipe(gulp.dest("dist/es2015"))
    .pipe(gulp.dest("dist/native-modules"))
    .pipe(gulp.dest("dist/system"));
});

gulp.task('icons', () => {
    return gulp.src('node_modules/formiojs/dist/icons/*.*')
        .pipe(gulp.dest("dist/amd/icons"))
        .pipe(gulp.dest("dist/commonjs/icons"))
        .pipe(gulp.dest("dist/es2015/icons"))
        .pipe(gulp.dest("dist/native-modules/icons"))
        .pipe(gulp.dest("dist/system/icons"));
});

gulp.task('fonts', () => {
    return gulp.src('node_modules/formiojs/dist/fonts/*.*')
        .pipe(gulp.dest("dist/amd/fonts"))
        .pipe(gulp.dest("dist/commonjs/fonts"))
        .pipe(gulp.dest("dist/es2015/fonts"))
        .pipe(gulp.dest("dist/native-modules/fonts"))
        .pipe(gulp.dest("dist/system/fonts"));
});

gulp.task('styles:formio', () => {
    return gulp.src('node_modules/formiojs/dist/formio.form.min.css')
        .pipe(gulp.dest("dist/amd"))
        .pipe(gulp.dest("dist/commonjs"))
        .pipe(gulp.dest("dist/es2015"))
        .pipe(gulp.dest("dist/native-modules"))
        .pipe(gulp.dest("dist/system"));
});

gulp.task('styles:builder', () => {
    return gulp.src('node_modules/formiojs/dist/formio.full.min.css')
        .pipe(gulp.dest("dist/amd"))
        .pipe(gulp.dest("dist/commonjs"))
        .pipe(gulp.dest("dist/es2015"))
        .pipe(gulp.dest("dist/native-modules"))
        .pipe(gulp.dest("dist/system"));
});

gulp.task('styles', ['icons', 'fonts', 'styles:formio', 'styles:builder']);
gulp.task("default", ["copy:html", "copy:css", "copy:json", "styles"]);
