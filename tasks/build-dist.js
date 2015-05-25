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
var ngFileSort           = require('gulp-angular-filesort');
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
    // ['copy-scripts','copy-css','copy-partials'],
    ['clean-dist-folder', 'compile-sass'],
    ['copy-libraries','copy-fonts'],
    ['copy-scripts','copy-css','copy-partials'],
    'inject-files',
    // 'rev'
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
    var count = 1;
    // var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

    // grab vendor js files from bower_components, minify and push it into libPath/js
    return gulp.src(mainBowerFiles())
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(sourceMaps.write())
    .pipe(rename(function(path){
        path.basename = 'lib-js-' + count++ + '-' + path.basename;
        path.extname = '.min' + path.extname;
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
gulp.task('copy-fonts',function(done){
    return gulp.src(path.join(srcBasePath,'/bower_components','/**','/fonts','/*'),{base:'.'})
    .pipe(rename(function (path) {
        path.dirname = './' 
    }))
    .pipe(gulp.dest(path.join(distBasePath,distConfig.libPath,distConfig.fontsPath)));

});
gulp.task('copy-scripts',function(done){
	var jsPath = srcConfig.jsPath,
		componentsPath = srcConfig.componentsPath;
	return gulp.src([path.join(srcBasePath,jsPath,'{,/**}/*.js'),path.join(srcBasePath,componentsPath,'/**',jsPath,'{,/**}/*.js')])
    .pipe(ngFileSort())
	.pipe(concat('app.js'))
	.pipe(ngAnnotate())
	// .pipe(uglify())
	.pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(distBasePath));     
});

gulp.task('copy-css', function(done){
    var cssPath = srcConfig.cssPath,
        componentsPath = srcConfig.componentsPath;
    return gulp.src([path.join(srcBasePath,cssPath,'/**/*.css'),path.join(srcBasePath,componentsPath,'/**',cssPath,'/**/*.css')])
        .pipe(concat('app.css'))
        .pipe(sourceMaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(distBasePath));
});

gulp.task('copy-partials',function(){
    var partialsPath = srcConfig.partialsPath,
        componentsPath = srcConfig.componentsPath;
    return gulp.src([path.join(srcBasePath,partialsPath,'{,/**}/*.html'),path.join(srcBasePath,componentsPath,'/**', partialsPath,'{,/**}/*.html')],{base:'.'})
        .pipe(rename(function (path) {
            path.dirname = './' 
        }))
        .pipe(gulp.dest(path.join(distBasePath,distConfig.partialsPath)));
})
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
});

gulp.task('rev',function(){
    var revAll = new revAll({ dontRenameFile: [/^\/favicon.ico$/g, /^\/index.html/g]});
    gulp.src(distBasePath + '/**')
        .pipe(revAll.revision())
        .pipe(revAll.manifestFile())
        .pipe(revAll.versionFile());
});