angular.module('tasks')
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('root.tasks',{
		url: '/tasks',
		resolve: {
			tasks: ['$kinvey',function($kinvey){
				return $kinvey.DataStore.find('tasks')
				.then(function(model){
					return model;
				},function(err){
					console.log('Some error fetching the records!...see log below...');
					console.log(err);
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
	.state('root.tasks.addtask',{
		url: '/addtask',
		views: {
			'section@root': {
				templateUrl: '/partials/add-task.html',
				controller: 'addTaskController'
			}
		}
	});
}]);
