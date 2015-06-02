module.exports = function(gulp,plugins,srcConfig,distConfig){
	return function(){
		var distBasePath = distConfig.basePath,
			libPath = plugins.path.join(distBasePath, distConfig.libPath),
			jsPath = plugins.path.join(libPath,distConfig.jsPath),
			cssPath = plugins.path.join(libPath,distConfig.cssPath),
			fontsPath = plugins.path.join(libPath,distConfig.fontsPath);
		var jsFilter = plugins.filter('*.js');
		var cssFilter = plugins.filter('*.css');
		var fontFilter = plugins.filter(['*.eot', '*.woff','*.woff2', '*.svg', '*.ttf']);
		var count = 1;

		// grab vendor js files from bower_components, minify and push it into libPath/js
		return gulp.src(plugins.mainBowerFiles())
		.pipe(jsFilter)
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write())
		.pipe(plugins.rename(function(path){
			path.basename = 'lib-js-' + count++ + '-' + path.basename;
			path.extname = '.min' + path.extname;
		}))
		.pipe(gulp.dest(jsPath))
		.pipe(jsFilter.restore())

		// grab vendor css files from bower_components, minify and push it into libPath/css
		.pipe(cssFilter)
		.pipe(plugins.minifyCss())
		.pipe(plugins.sourcemaps.write())
		.pipe(plugins.rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(cssPath))
		.pipe(cssFilter.restore())

		// grab vendor font files from bower_components, and push it into libPath/fonts
		.pipe(fontFilter)
		.pipe(gulp.dest(fontsPath))
		.pipe(cssFilter.restore());
	}
}