module.exports = function(gulp,plugins,srcConfig,distConfig){
	return function() {
		var srcBasePath = srcConfig.basePath,
    		cssPath = srcConfig.cssPath,
        	componentsPath = srcConfig.componentsPath,
			distBasePath = distConfig.basePath;
    	return gulp.src([plugins.path.join(srcBasePath,cssPath,'/**/*.css'),plugins.path.join(srcBasePath,componentsPath,'/**',cssPath,'/**/*.css')])
        .pipe(plugins.concat('app.css'))
        .pipe(plugins.sourcemaps.write())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(distBasePath));
  	}	
}