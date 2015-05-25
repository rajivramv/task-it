angular.module('main')
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('root',{
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