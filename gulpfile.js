'use strict';
// main module
import gulp from 'gulp';
// path
import { path } from './gulp/config/path.js';
// plugins
import { plugins } from './gulp/config/plugins.js';
// global
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path,
  gulp,
  plugins,
};

// import task
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { imagesOrigin } from './gulp/tasks/imagesOrigin.js';
import { imagesMin } from './gulp/tasks/imagesMin.js';
import { otfToTft, ttfToWoff, fontStyle } from './gulp/tasks/fonts.js';
import { sprite } from './gulp/tasks/sprite.js';
import { zip } from './gulp/tasks/zip.js';
import { copySW } from './gulp/tasks/copySW.js';

// watcher files
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.manifest, copy);
  gulp.watch(path.watch.robots, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, imagesOrigin);
  gulp.watch(path.watch.images, imagesMin);
  gulp.watch(path.watch.sw, copySW);
}

export { sprite };
// sequential processing fonts
const fonts = gulp.series(otfToTft, ttfToWoff, fontStyle);
// main task
const mainTasksOrigin = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, imagesOrigin)
);
const mainTasksMin = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, imagesMin)
);

// build scenario run task
const dev = gulp.series(
  reset,
  mainTasksOrigin,
  copySW,
  gulp.parallel(watcher, server)
);
const devMin = gulp.series(
  reset,
  mainTasksMin,
  copySW,
  gulp.parallel(watcher, server)
);
const build = gulp.series(reset, mainTasksOrigin, copySW);
const deployZIP = gulp.series(reset, mainTasksOrigin, copySW, zip);

export { dev };
export { build };
export { deployZIP };

// run task
gulp.task('default', dev);
gulp.task('devmin', devMin);
