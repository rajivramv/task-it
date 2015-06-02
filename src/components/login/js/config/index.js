angular.module('login')
.config(['$stateProvider',function($stateProvider){
	$stateProvider
	.state('root.login',{
		url: '/login',
		views: {
			'header@root': {
				templateUrl: 'partials/login-header.html'
			},
			'section@root': {
				templateUrl: 'partials/login.html',
				controller: 'loginController'
			}
		}
	})
	.state('root.signup',{
		url: '/signup',
		views: {
			'header@root': {
				templateUrl: 'partials/signup-header.html'
			},
			'section@root': {
				templateUrl: 'partials/signup.html',
				controller: 'signupController'
			}
		}
	})
}]);
