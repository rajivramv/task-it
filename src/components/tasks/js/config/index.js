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
				// var query = new $kinvey.Query();
				// query.equalTo()
				return $kinvey.DataStore.find('tasks',null,{
					relations: {approval: 'task-approval'}
				})
				.then(function(model){
					console.log('Fetched records');
					console.log(model);
					return model;
				},function(err){
					console.log('Some error fetching the records!...see log below...');
					console.log(err);
				})
			}]	
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
