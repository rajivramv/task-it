angular.module('tasks')
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('root.tasks',{
		url: '/tasks',
		resolve: {
			tasks: ['$rootScope','$kinvey',function($rootScope,$kinvey){
				if(!$rootScope.activeUser) return [];
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
			'header@root':{
				templateUrl: 'partials/tasks-header.html'
			},
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
