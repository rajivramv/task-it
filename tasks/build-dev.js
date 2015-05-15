var gulp = require('gulp');
// var plugins = require("gulp-load-plugins")({lazy:false});

gulp.task('dev:scripts', function(){
    //combine all js files of the app
    gulp.src(['!./src/**/*_test.js','./src/**/*.js'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest('./build'));
});

gulp.task('dev:clean', function (done) {
  del(['dev/**', '!dev', '!dev/.git{,/**}'], done);
});
