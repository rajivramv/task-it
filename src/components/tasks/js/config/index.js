angular.module('tasks')
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('root.tasks',{
		url: '/tasks',
		resolve: {
			activeUser: ['$kinvey',function($kinvey){
				return $kinvey.getActiveUser();
			}],
			tasks: ['$kinvey',function($kinvey){
				return $kinvey.DataStore.find('tasks',null,{
					relations: {
						approval: 'task-approval',
						creator: 'user'
					}
				})
				.then(function(model){
					console.log('Fetched records');
					return model;
				},function(err){
					console.log('Some error fetching the records!...see log below...');
					console.log(err);
				})
			}],	
		},
		views: {
			'section@root': {
				templateUrl: 'partials/tasks.html',
				controller: 'tasksController'
			}
		}
	})
	.state('root.tasks.addtask',{
		url: '/addtask',
		views: {
			'section@root': {
				templateUrl: 'partials/add-task.html',
				controller: 'addTaskController'
			}
		}
	});
}]);
