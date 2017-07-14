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
