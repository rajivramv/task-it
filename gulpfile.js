'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var srcConfig			= require('./tasks/config/src.js');
var distConfig			= require('./tasks/config/dist.js');
var gulp 				= require('gulp');
var plugins 			= require('gulp-load-plugins')();
// Wiring non-gulp modules to be used as plugins
plugins.del 			= require('del');
plugins.path			= require('path');
plugins.mainBowerFiles 	= require('main-bower-files');
plugins.runSequence 	= require('run-sequence');

function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins, srcConfig, distConfig);
}

gulp.task('base:compile-sass', require('./tasks/compile-sass'));
gulp.task('components:compile-sass', require('./tasks/compile-sass'));
gulp.task('compile-sass',['components:compile-sass','base:compile-sass']);
// gulp.task('build-dist', require('./tasks/build-dist'));
gulp.task('serve-dist',['build-dist'],require('./tasks/serve-dist'));

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
		['copy-library','copy-scripts','copy-css','copy-partials'],
		'inject-files',
		done
	)
});


// var gulp = require('gulp');
// var plugins = require("gulp-load-plugins")({lazy:false});

// gulp.task('scripts', function(){
//     //combine all js files of the app
//     gulp.src(['!./src/**/*_test.js','./src/**/*.js'])
//         .pipe(plugins.jshint())
//         .pipe(plugins.jshint.reporter('default'))
//         .pipe(plugins.concat('app.js'))
//         .pipe(gulp.dest('./build'));
// });

// gulp.task('templates',function(){
//     //combine all template files of the app into a js file
//     gulp.src(['!./src/index.html',
//         './src/**/*.html'])
//         .pipe(plugins.angularTemplatecache('templates.js',{standalone:true}))
//         .pipe(gulp.dest('./build'));
// });

// gulp.task('css', function(){
//     gulp.src('./src/**/*.css')
//         .pipe(plugins.concat('app.css'))
//         .pipe(gulp.dest('./build'));
// });

// gulp.task('vendorJS', function(){
//     //concatenate vendor JS files
//     gulp.src(['!./bower_components/**/*.min.js',
//         './bower_components/**/*.js'])
//         .pipe(plugins.concat('lib.js'))
//         .pipe(gulp.dest('./build'));
// });

// gulp.task('vendorCSS', function(){
//     //concatenate vendor CSS files
//     gulp.src(['!./bower_components/**/*.min.css',
//         './bower_components/**/*.css'])
//         .pipe(plugins.concat('lib.css'))
//         .pipe(gulp.dest('./build'));
// });

// gulp.task('copy-index', function() {
//     gulp.src('./app/index.html')    
//         .pipe(gulp.dest('./build'));
// });

// gulp.task('watch',function(){
//     gulp.watch([
//         'build/**/*.html',        
//         'build/**/*.js',
//         'build/**/*.css'        
//     ], function(event) {
//         return gulp.src(event.path)
//             .pipe(plugins.connect.reload());
//     });
//     gulp.watch(['./app/**/*.js','!./app/**/*test.js'],['scripts']);
//     gulp.watch(['!./app/index.html','./app/**/*.html'],['templates']);
//     gulp.watch('./app/**/*.css',['css']);
//     gulp.watch('./app/index.html',['copy-index']);

// });

// gulp.task('connect', plugins.connect.server({
//     root: ['build'],
//     port: 9000,
//     livereload: true
// }));

// gulp.task('default',['connect','scripts','templates','css','copy-index','vendorJS','vendorCSS','watch']);
