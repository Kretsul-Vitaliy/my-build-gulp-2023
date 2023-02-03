export const copy = () => {
    return app.gulp
        .src(app.path.src.files)
        .pipe(app.gulp.dest(app.path.build.files))
        .pipe(app.gulp.src(app.path.src.manifest))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.gulp.src(app.path.src.robots))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.gulp.src(app.path.src.min))
        .pipe(app.gulp.dest(app.path.build.js));
};
