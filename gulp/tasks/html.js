import fileinclude from 'gulp-file-include';
import versionNumber from 'gulp-version-number';
import webpHtml from 'gulp-webp-retina-html';

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'HTML',
          message: 'Error: <%= error.message %>',
        })
      )
    )

    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(
      webpHtml({
        extensions: ['jpg', 'jpeg', 'png', 'gif'],
        retina: {
          1: '',
          2: '@2x',
        },
        checkExists: false,
        publicPath: '/src/img/',
      })
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
};
