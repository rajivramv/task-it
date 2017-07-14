var gulp = require('gulp');
var express = require('express');
var PORT = process.env.PORT || 3000;
module.exports = function(){
  express().use(express.static('www')).listen(PORT, () => console.log('Listening on ' + PORT))
}
