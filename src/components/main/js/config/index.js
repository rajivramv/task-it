angular.module('main')
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('root',{
		abstract: true,
		views: {
			'body': {
				templateUrl: 'partials/body.html'
			}
		}
	});
}])
