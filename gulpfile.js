'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var srcConfig      = require('./tasks/config/src.js');
var distConfig      = require('./tasks/config/dist.js');
var gulp         = require('gulp');
var plugins       = require('gulp-load-plugins')();
// Wiring non-gulp modules to be used as plugins
plugins.del       = require('del');
plugins.path      = require('path');
plugins.mainBowerFiles   = require('main-bower-files');
plugins.runSequence   = require('run-sequence');

function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins, srcConfig, distConfig);
}

gulp.task('base:compile-sass', require('./tasks/compile-sass'));
gulp.task('components:compile-sass', require('./tasks/compile-sass'));
gulp.task('compile-sass',['components:compile-sass','base:compile-sass']);
gulp.task('serve-dist',require('./tasks/serve-dist'));

gulp.task('clean-dist',getTask('clean-dist'));
gulp.task('sassify-base',getTask('compile-sass').base);
gulp.task('sassify-components',getTask('compile-sass').components);
gulp.task('copy-library',getTask('copy-library'));
gulp.task('copy-scripts',getTask('copy-scripts'));
gulp.task('copy-css',['sassify-base','sassify-components'],getTask('copy-css'));
gulp.task('copy-partials',getTask('copy-partials'));
gulp.task('inject-files',getTask('inject-files'));

gulp.task('watch',function(){
  gulp.watch(plugins.path.join(srcConfig.basePath,'/**/*.scss'),['copy-css']);
  gulp.watch(plugins.path.join(srcConfig.basePath,'/**/*.js'),['copy-scripts']);
  gulp.watch(plugins.path.join(srcConfig.basePath,'/**/*.html'),['copy-partials']);
})
gulp.task('build-dist',function(done){
  plugins.runSequence(
    'clean-dist',
    ['copy-scripts','copy-css'],
    'copy-library','copy-partials','inject-files',
    done
  )
});
