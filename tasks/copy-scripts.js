module.exports = function(gulp,plugins,srcConfig,distConfig){
	return function() {
		var srcBasePath = srcConfig.basePath,
			jsPath = srcConfig.jsPath,
			componentsPath = srcConfig.componentsPath,
			distBasePath = distConfig.basePath;
		return gulp.src([plugins.path.join(srcBasePath,jsPath,'{,/**}/*.js'),plugins.path.join(srcBasePath,componentsPath,'/**',jsPath,'{,/**}/*.js')])
    	.pipe(plugins.angularFilesort())
		.pipe(plugins.concat('app.js'))
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.uglify())
		.pipe(plugins.rename({
    	    suffix: '.min'
    	}))
    	.pipe(gulp.dest(distBasePath));
  	}	
}