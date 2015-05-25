"use strict";

var environment = (function defineEnvironment(){
	var agent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?'webview':'browser';
	return {
		env: env,
		agent: agent,
		readyEvent: agent === 'webview'? 'deviceready':'DOMContentLoaded',
	}
})();

console.log('environment ' + JSON.stringify(environment));

var app = new function() {
	//	TODO: Event Logger

	//	Events Handlers	
	function onDeviceReady() {
		console.log('Bootstrapping angular on main module...');
		angular.bootstrap(document, ['main']);
	};

	//  Bind to the events that the app will respond  
	function bindEvents() {
		console.log('Ready event binding');
		document.addEventListener (environment.readyEvent, onDeviceReady, false);
		// Andorid and iOS supported events
		// However note iOS quirks in them
		/*
		document.addEventListener('pause', onPause, false);
		document.addEventListener('resume', onResume, false);
		*/
		// The following are Android specific events
		// Implement backButton event handler to override default behaviour
		/* 
		document.addEventListener('backbutton', onBackButton, false);
		document.addEventListener('menubutton', onMenuButton, false);
		document.addEventListener('searchbutton', onSearchButton, false);
		*/
	};

	// Application Constructor
	return {
		initialize: function() {
			console.log('Initializing app by binding handlers to different events that the app responds to...');
			bindEvents();
		}
	}
};

app.initialize();
