// Expose approve(), addTask(), toLocale() methods to the views. toLocale() is used to display the date
// in locale format
angular.module('tasks')
.controller('tasksController',['$rootScope','$scope','$state','$kinvey','tasks','notify',function($rootScope,$scope,$state,$kinvey,tasks,notify){
	
	if(!$rootScope.activeUser) return null;
	var users = [];
	$scope.tasks = tasks;
	if (!$rootScope.activeUser.admin) users.push($rootScope.activeUser.name)
	else 
		for (var i = 0; i <= tasks.length-1; i++) 
			if(tasks[i].creator && tasks[i].creator.name && users.indexOf(tasks[i].creator.name) < 0 ) 
				users.push(tasks[i].creator.name); 
	$scope.users = users;	

	$scope.toLocale = function(date){
		var d = new Date(date);
		return d.toLocaleDateString();
	}
		
	$scope.approve = function(bool,task){
		var doc = {
			_id: task.approval._id,
			approved: bool
		}
		$kinvey.DataStore.save('task-approval',doc)
		.then(function(res){
			console.log('Task approval/disapproval success');
			task.approval = doc;
		},function(err){
			console.log('Could not approve the task!... see the error log below...');
			console.log(err);
			notify(err.description);
		});
	}
}])
.controller('addTaskController',['$rootScope','$scope','$state','$kinvey',function($rootScope,$scope,$state,$kinvey){
	$scope.addTask = function(){
		if ($scope.addTaskForm.taskName.$error.required || $scope.addTaskForm.startDate.$error.required || $scope.addTaskForm.endDate.$error.required ) return null;
		var doc = {
			task_name: $scope.task.name,
			start_date: $scope.task.startDate,
			end_date: $scope.task.endDate,
			comments: $scope.task.comments,
			creator: $rootScope.activeUser
		};
		$kinvey.DataStore.save('tasks',doc,{
			exclude: ['creator'],
			relations: {creator: 'user'}
		}).then(function(){
			$state.go('root.tasks',{},{reload:true});
		},
		function(err) {
			console.log('There seems to be a problem adding the task!...see the error log below...');
			console.log(err);
			notify(err.description);
		});
	}
}]);
