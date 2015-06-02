module.exports = function(gulp,plugins,srcConfig,distConfig){
	return function() {
		var basePath = plugins.path.normalize(distConfig.basePath);
  		plugins.del([basePath+'/**', '!'+basePath, '!'+basePath+'/.git{,/**}']);
  	}	
}