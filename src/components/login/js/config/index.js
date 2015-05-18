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
		},
		onEnter: ['$state','activeUser',function($state,activeUser){
			if(activeUser!==null) $state.go('logged-in');
		}]
	})
	.state('root.logged-in',{
		url: '/logged-in',
		views: {
			'section@root': {
				templateUrl: '/partials/logged-in.html',
				controller: 'loggedInController'
			}
		}
	})
}]);
