module.exports = function(gulp,plugins,srcConfig,distConfig){
	return function() {
		var srcBasePath = srcConfig.basePath,
			partialsPath = srcConfig.partialsPath,
        	componentsPath = srcConfig.componentsPath,  		
			distBasePath = distConfig.basePath;
    return gulp.src([plugins.path.join(srcBasePath,partialsPath,'{,/**}/*.html'),plugins.path.join(srcBasePath,componentsPath,'/**', partialsPath,'{,/**}/*.html')],{base:'.'})
        .pipe(plugins.rename(function (path) {
            path.dirname = './' 
        }))
        .pipe(gulp.dest(plugins.path.join(distBasePath,distConfig.partialsPath)));
  	}	
}