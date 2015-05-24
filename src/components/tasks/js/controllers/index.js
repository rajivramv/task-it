angular.module('tasks')
.controller('tasksController',['$scope','$state','tasks','activeUser',function($scope,$state,tasks,activeUser){
	$scope.tasks = tasks;
	console.log(activeUser);
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
