var gulp = require('gulp');
var serve = require('gulp-serve');

module.exports = function(){
	serve({
		root: './dist',
		port: process.env.PORT || 3000
	})();
}
