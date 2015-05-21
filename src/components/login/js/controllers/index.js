angular.module('login')
.controller('loginController',['$scope','$state','$kinvey','activeUser',function($scope,$state,$kinvey,activeUser){
	if(activeUser!==null){
		$scope.hasActiveUser = true;
		$scope.username =  activeUser.username;
	} else $scope.hasActiveUser = false;

	$scope.login = function(){
		if ($scope.loginForm.username.$error.required || $scope.loginForm.password.$error.required) return null;

		$kinvey.User.login({
			username: $scope.user.name,
			password: $scope.user.pwd
		}).then(function(res){
			console.log('Successfully logged in!');
			console.log(res);
			$state.reload();
		},function(err){
			console.log('Error logging in!');
			console.log(err);
			$state.reload();
		})
	}

	$scope.logout = function(){
		$kinvey.User.logout().then(function(){
			console.log('Successfully logged out!');
			$state.reload();
		},function(err){
			console.log('Some problem logging out...try again!');
			console.log(err);
			$state.reload();
		})
	}
}]);