const gulp = require("gulp");
let sass = require("gulp-sass"),
  clean = require("gulp-clean"),
  concatCss = require("gulp-concat-css");


gulp.task("scssToCss", () =>{
  return gulp.src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./src/css/"));
});

gulp.task("concatCss", () =>{
  return gulp.src('src/css/**/*.css')
    .pipe(concatCss("style.min.css"))
    .pipe(gulp.dest('./src/css/'));
});

gulp.task("clean", () =>{
  return gulp.src("src/css", {read: false})
    .pipe(clean());
});


gulp.task("endBuildCss", () =>{
  return gulp.src('src/css/style.min.css')
          .pipe(gulp.dest("./dist/css/"))
});


gulp.task("endBuildHtml", () =>{
  return gulp.src("src/index.html")
          .pipe(gulp.dest("./dist/"));
});

gulp.task("endBuildIMG", () =>{
  return gulp.src("src/images/**.**")
          .pipe(gulp.dest("./dist/images/"));
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**.**')
  .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task("watch", () => {
  gulp.watch("src/scss/**/*.scss", (done) => {
    gulp.series(["clean", "scssToCss", "concatCss", "endBuildIMG"])(done);
  });
});


gulp.task("default", gulp.series(["clean", "scssToCss", "concatCss", "fonts"]));
gulp.task("build", gulp.series(["clean", "scssToCss", "concatCss", "endBuildCss", "endBuildHtml", "endBuildIMG", "fonts"]));