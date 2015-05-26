angular.module('tasks')
.controller('tasksController',['$scope','$state','$kinvey','tasks','activeUser',function($scope,$state,$kinvey,tasks,activeUser){
	
	$scope.tasks = tasks;
	$scope.haveActiveUser = (activeUser!==null) ? true : false;
	var isAdmin = $scope.isAdmin = activeUser.admin ? true : false;
	var users = [];
	if (!isAdmin) users.push(activeUser.username)
	else 
		for (var i = 0; i <= tasks.length-1; i++) 
			if(tasks[i].creator && tasks[i].creator.username && users.indexOf(tasks[i].creator.username) < 0 ) 
				users.push(tasks[i].creator.username); 
	$scope.users = users;	
		
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
		});
	}
}])
.controller('addTaskController',['$scope','$state','$kinvey','activeUser',function($scope,$state,$kinvey,activeUser){
	$scope.addTask = function(){
		if ($scope.addTaskForm.taskName.$error.required || $scope.addTaskForm.startDate.$error.required || $scope.addTaskForm.endDate.$error.required ) return null;
		var doc = {
			task_name: $scope.task.name,
			start_date: $scope.task.startDate,
			end_date: $scope.task.endDate,
			comments: $scope.task.comments,
			creator: activeUser
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
		});
	}
}]);
