module.exports = function(gulp,plugins,srcConfig,distConfig){
	var basePath = srcConfig.basePath,
		componentsPath = srcConfig.componentsPath,
		sassPath = srcConfig.sassPath,
		cssPath  = srcConfig.cssPath,
		baseSassPath = plugins.path.join(basePath,sassPath),
		componentsSassPath = plugins.path.join(basePath,componentsPath,'/**');  

	function sassify(target) {
		return gulp.src(plugins.path.join(target,'/*.scss'),{base:'.'})
		.pipe(plugins.plumber())
		.pipe(plugins.sass())
		.pipe(plugins.rename(function(foo){
			foo.dirname += '/../css'
		}))
		.pipe(gulp.dest('.'))
	}

	return {
		base: sassify.bind(this,baseSassPath),
		components: sassify.bind(this,componentsSassPath)
	}
}




// 'use strict';

// /**
//  * Compile sass
//  */

//  var gulp    = require('gulp');
//  var plumber = require('gulp-plumber');
//  var sass    = require('gulp-sass');
//  var config  = require('./config/src');
//  var path 	= require('path');
//  var rename  = require('gulp-rename')

//  module.exports = new function(){
//  	var basePath = config.basePath,
//  	componentsPath = config.componentsPath,
//  	sassPath = config.sassPath,
//  	cssPath  = config.cssPath,
//  	baseSassPath = path.join(basePath,sassPath),
//  	componentsSassPath = path.join(basePath,componentsPath,'/**');	
//  	function sassify(target) {
//  		return gulp.src(path.join(target,'/*.scss'),{base:'.'})
//  		.pipe(plumber())
//  		.pipe(sass())
//  		.pipe(rename(function(foo){
//  			foo.dirname += '/../css'
//  		}))
//  		.pipe(gulp.dest('.'))
//  	}
//  	return {
//  		base: sassify.bind(this,baseSassPath),
//  		components: sassify.bind(this,componentsSassPath)
//  	}
//  }