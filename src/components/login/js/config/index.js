angular.module('login')
.config(['$stateProvider',function($stateProvider){
	$stateProvider
	.state('root.login',{
		url: '/login',
		resolve: {
			activeUser: ['$kinvey',function($kinvey){
				return $kinvey.getActiveUser();
			}]
		},
		views: {
			'section@root': {
				templateUrl: '/partials/login.html',
				controller: 'loginController'
			}
		}
	})
}]);
