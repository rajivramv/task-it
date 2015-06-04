// The root state, just to plugin the other state and not have the default nameles state of ui-router.
angular.module('main')
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('root',{
		views: {
			'body': {
				templateUrl: 'partials/body.html'
			}
		}
	});
}])
