module.exports = function(gulp,plugins,srcConfig,distConfig){
  return function() {
    // It is very important to set the base as '.' as it determines where this file is present
    // If the file is at /some/location/ then setting no base will retain this location while
    // setting base: '.' will make its location ./ 
    // Piping to rename, as the name suggests only RENAMES the file and its a hack to change its
    // location with that. So in the former case a rename will be /some/location/rename/ while in 
    // the latter it will be ./rename
    var srcBasePath = srcConfig.basePath,
      distBasePath = distConfig.basePath;
    var target = gulp.src(srcBasePath + '/*.html',{base:'.'})
      .pipe(plugins.rename(function(foo){
        foo.dirname = distBasePath;  
      }))
      .pipe(plugins.debug({title:'target-->'}));
    var sources = gulp.src(distBasePath + '/*{.js,.css}',{read: false})
      .pipe(plugins.debug({title:'sources-->'}));
    var libraries = gulp.src(plugins.path.join(distBasePath,distConfig.libPath) + '/**/*{.js,.css}',{read: false})
      .pipe(plugins.debug({title:'libraries-->'}));

    return target
    .pipe(plugins.inject(libraries,{relative:true, name:'lib'}))
    .pipe(plugins.inject(sources,{relative:true, name:'src'}))
    .pipe(gulp.dest('.'));
  }  
}