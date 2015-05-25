angular.module('tasks')
.controller('tasksController',['$scope','$state','$kinvey','tasks','activeUser',function($scope,$state,$kinvey,tasks,activeUser){
	$scope.tasks = tasks;
	$scope.hasActiveUser = (activeUser!==null) ? true : false;
	$scope.isAdmin = activeUser.admin ? true : false;
	$scope.approve = function(bool,index,approvalId){
		// console.log(bool + ' ' + taskId );
		// console.log(tasks[$index].approval._id);
		var doc = {
			_id: approvalId,
			approved: bool
		}
		$kinvey.DataStore.save('task-approval',doc)
		.then(function(res){
			console.log('Task approval/disapproval success');
			$scope.tasks[index].approval = res;
		},function(err){
			console.log('Couldnot approve the task!... see the error log below...');
			console.log(err);
		});
	}
}])
.controller('addTaskController',['$scope','$state','$kinvey',function($scope,$state,$kinvey){
	$scope.addTask = function(){
		if ($scope.addTaskForm.taskName.$error.required || $scope.addTaskForm.startDate.$error.required || $scope.addTaskForm.endDate.$error.required ) return null;
		var doc = {
			task_name: $scope.task.name,
			start_date: $scope.task.startDate,
			end_date: $scope.task.endDate,
			comments: $scope.task.comments,
		};
		$kinvey.DataStore.save('tasks',doc).then(function(){
			$state.go('root.tasks',{},{reload:true});
		},
		function(err) {
			console.log('There seems to be a problem adding the task!...see the error log below...');
			console.log(err);
		});
	}
}]);
