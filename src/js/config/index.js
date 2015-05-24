angular.module('gquotient')
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('root',{
		abstract: true,
		views: {
			'body': {
				templateUrl: 'partials/body.html'
			},
			'header@root': {
				templateUrl: 'partials/main-nav.html'
			} 
		}
	});
}])