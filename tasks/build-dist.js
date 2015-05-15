'use strict';

/**
 * Dist build tasks
 */

var gulp                 = require('gulp');
var path                 = require('path');
var distConfig			 = require('./config/dist.js');
var srcConfig			 = require('./config/src.js');
var runSequence          = require('run-sequence');
var del                  = require('del');
var plumber              = require('gulp-plumber');
var minifyCss            = require('gulp-minify-css');
var uglify               = require('gulp-uglify');
var mainBowerFiles		 = require('main-bower-files');
var rename 				 = require('gulp-rename');
var sourceMaps 		 	 = require('gulp-sourcemaps')
var gulpFilter 			 = require('gulp-filter');
var concat               = require('gulp-concat');
var ngAnnotate           = require('gulp-ng-annotate');
var inject 				 = require('gulp-inject');
var revAll               = require('gulp-rev-all');
var debug				 = require('gulp-debug');
//var sq                   = require('streamqueue');
// var usemin               = require('gulp-usemin');
// var cssRebaseUrls        = require('gulp-css-rebase-urls');
// var autoprefixer         = require('gulp-autoprefixer');
// var angularTemplatecache = require('gulp-angular-templatecache');
// var replace              = require('gulp-replace');
// var revToExclude         = require('./config/revFilesToExclude');

// var toDelete = [];
var srcBasePath = srcConfig.basePath,		
	distBasePath = distConfig.basePath;

module.exports = function (done) {	
  runSequence(
    // ['clean-dist-folder', 'compile-sass'],
    // 'copy-libraries',
    // ['copy-scripts','copy-css'],
    'inject-files',
    // 'rev'
  //   // ['usemin', 'copy:dist'],
  //   // ['replace', 'scripts', 'cssmin'],
  //   // 'rev',
  //   // 'clean:finish',
    done);
};

gulp.task('clean-dist-folder', function (done) {
	var basePath = path.normalize(distBasePath);
  	del([basePath+'/**', '!'+basePath, '!'+basePath+'/.git{,/**}'],done);
});

gulp.task('copy-libraries',function (done){
	var libPath = path.join(distBasePath, distConfig.libPath),
		jsPath = distConfig.jsPath,
		cssPath = distConfig.cssPath;
	var jsFilter = gulpFilter('*.js');
    var cssFilter = gulpFilter('*.css');
    // var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

    // grab vendor js files from bower_components, minify and push it into libPath/js
    return gulp.src(mainBowerFiles())
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(sourceMaps.write())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(path.join(libPath + jsPath)))
    .pipe(jsFilter.restore())

    // grab vendor css files from bower_components, minify and push it into libPath/css
    .pipe(cssFilter)
    .pipe(minifyCss())
    .pipe(sourceMaps.write())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(path.join(libPath,cssPath)))
    .pipe(cssFilter.restore());
});

gulp.task('copy-scripts',function(){
	var jsPath = srcConfig.jsPath,
		componentsPath = srcConfig.componentsPath;
	gulp.src([path.join(srcBasePath,jsPath,'/**/*.js'),path.join(srcBasePath,componentsPath,'/**',jsPath,'/**/*.js')])
	.pipe(concat('app.js'))
	.pipe(ngAnnotate())
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest(distBasePath));		
});
gulp.task('copy-css', function(){
	var cssPath = srcConfig.cssPath,
		componentsPath = srcConfig.componentsPath;
	gulp.src([path.join(srcBasePath,cssPath,'/**/*.css'),path.join(srcBasePath,componentsPath,'/**',cssPath,'/**/*.css')])
	    .pipe(debug({title:'debug:'}))
	    .pipe(concat('app.css'))
        .pipe(sourceMaps.write())
        .pipe(rename({
        	suffix: '.min'
        }))
        .pipe(gulp.dest(distBasePath));
});
gulp.task('inject-files',function () {
	// It is very important to set the base as '.' as it determines where this file is present
	// If the file is at /some/location/ then setting no base will retain this location while
	// setting base: '.' will make its location ./ 
	// Piping to rename, as the name suggests only RENAMES the file and its a hack to change its
	// location with that. So in the former case a rename will be /some/location/rename/ while in 
	// the latter it will be ./rename
	var target = gulp.src(srcBasePath + '/*.html',{base:'.'})
		.pipe(rename(function(foo){
		 	foo.dirname = distBasePath;  
		}))
		.pipe(debug({title:'target-->'}));
	var sources = gulp.src(distBasePath + '/*{.js,.css}',{read: false}).pipe(debug({title:'sources-->'}));
	var libraries = gulp.src(path.join(distBasePath,distConfig.libPath) + '/**/*{.js,.css}',{read: false}).pipe(debug({title:'libraries-->'}));

	return target
		.pipe(inject(libraries,{relative:true, name:'lib'}))
		.pipe(inject(sources,{relative:true, name:'src'}))
		.pipe(gulp.dest('.'));
})
gulp.task('rev',function(){
	var revAll = new revAll({ dontRenameFile: [/^\/favicon.ico$/g, /^\/index.html/g]});
    gulp.src(distBasePath + '/**')
        .pipe(revAll.revision())
        .pipe(revAll.manifestFile())
        .pipe(revAll.versionFile());
})

// gulp.task('clean:finish', function (done) {
//   del([
//     '.tmp/**',
//     'dist/client/app.{css,js}'
//   ].concat(toDelete), done);
// });

// gulp.task('copy:dist', function () {
//   var main = gulp.src(['server/**/*', 'package.json'], { base: './' });
//   var assets = gulp.src('client/assets/**/*', { base: './' });

//   return sq({ objectMode: true }, main, assets)
//     .pipe(gulp.dest('dist/'));
// });

// gulp.task('usemin', ['inject'], function () {
//   return gulp.src('client/index.html')
//     .pipe(plumber())
//     .pipe(usemin({ css: [cssRebaseUrls({ root: 'client' }), 'concat'] }))
//     .pipe(gulp.dest('dist/client/'));
// });

// gulp.task('cssmin', function () {
//   return gulp.src('dist/client/app.css')
//     .pipe(autoprefixer())
//     .pipe(minifyCss())
//     .pipe(gulp.dest('dist/client/'));
// });

// gulp.task('scripts', function () {
//   var views = gulp.src('client/views/**/*.html')
//     .pipe(angularTemplatecache({
//       root: 'views',
//       module: 'bangular'
//     }));

//   var tpls = gulp.src('client/directives/**/*.html')
//     .pipe(angularTemplatecache({
//       root: 'directives',
//       module: 'bangular'
//     }));

//   var app = gulp.src('dist/client/app.js');

//   return sq({ objectMode: true }, app, views, tpls)
//     .pipe(concat('app.js'))
//     .pipe(ngAnnotate())
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/client/'));
// });

// gulp.task('replace', function () {
//   return gulp.src('dist/client/index.html')
//     .pipe(replace(/\s*<script.*livereload.*><\/script>/, ''))
//     .pipe(gulp.dest('dist/client'));
// });

// gulp.task('rev', function () {

//   var rev = new revAll({
//     transformFilename: function (file, hash) {
//       var filename = path.basename(file.path);
//       if (revToExclude.indexOf(filename) !== -1) {
//         return filename;
//       }
//       toDelete.push(path.resolve(file.path));
//       var ext = path.extname(file.path);
//       return path.basename(file.path, ext) + '.' + hash.substr(0, 8) + ext;
//     }
//   });

//   return gulp.src('dist/client/**')
//     .pipe(rev.revision())
//     .pipe(gulp.dest('dist/client/'));
// });
