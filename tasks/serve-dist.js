var gulp = require('gulp');
var serve = require('gulp-serve');

module.exports = function(){
	serve({
		root: './dist',
		port: 3000
	})();
}
