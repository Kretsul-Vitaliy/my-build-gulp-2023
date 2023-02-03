import webpack from 'webpack-stream';
export const copySW = () => {
  return app.gulp
    .src(app.path.src.sw, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.if(
        app.isBuild,
        webpack({
          mode: 'production',
          output: {
            filename: 'sw.js',
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html));
};
