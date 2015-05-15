'use strict';

var gulp = require('gulp');


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

gulp.task('base:compile-sass', require('./tasks/compile-sass').base);
gulp.task('components:compile-sass', require('./tasks/compile-sass').components);
gulp.task('compile-sass',['components:compile-sass','base:compile-sass']);
gulp.task('build-dist', require('./tasks/build-dist'));

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