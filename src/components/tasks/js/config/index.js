angular.module('tasks')
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('tasks',{
		url: '/tasks',
		resolve: {
			tasks: ['$kinvey',function($kinvey){
				$kinvey.DataStore.find('tasks')
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
				templateUrl: '/partials/tasks.html',
				controller: 'tasksController'
			}
		}
	})
}]);
