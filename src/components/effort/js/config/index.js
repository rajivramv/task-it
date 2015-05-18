angular.module('efforts')
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('efforts',{
		url: '/efforts',
		resolve: {
			tasks: ['$kinvey',function($kinvey){
				$kinvey.DataStore.find('efforts')
				.then(function(model){
					console.log(model);
					return model;
				},function(err){
					console.log('Error!');
					console.log(err)
				})
			}]
		},
		views: {
			'section@root': {
				templateUrl: '/partials/efforts.html',
				controller: 'effortsController'
			}
		}
	})
}]);
