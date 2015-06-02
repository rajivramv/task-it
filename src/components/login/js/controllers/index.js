angular.module('login')
.controller('loginController',['$rootScope','$scope','$state','$kinvey','notify',function($rootScope,$scope,$state,$kinvey,notify){
	$scope.login = function(){
		if ($scope.loginForm.username.$error.required || $scope.loginForm.password.$error.required) return null;

		$kinvey.User.login({
			username: $scope.user.username,
			password: $scope.user.pwd
		}).then(function(activeUser){
			console.log('Successfully logged in!');
			$rootScope.activeUser = activeUser;
			$state.reload();
		},function(err){
			console.log('Error logging in!');
			console.log(err);
			notify(err.description);
		})
	};

	$scope.logout = function () {
		$kinvey.User.logout().then(function(){
			console.log('Successfully logged out!');
			$rootScope.activeUser = null;
			$state.reload();
		},function(err){
			console.log('Some problem logging out...try again!');
			console.log(err);
			notify(err.description);
		});
	};

	$scope.confirm = function () {
		$kinvey.User.me().then(function(activeUser) {
			console.log('User confirmed the email');
			$rootScope.activeUser = activeUser;
			$state.reload();
		},function(err) {
			console.log('Some problem confirming the user out...try again!');
			console.log(err);
			notify(err.description);
		})
	}
}])

.controller('signupController',['$rootScope','$scope','$state','$kinvey','notify',function($rootScope,$scope,$state,$kinvey,notify){
		
	$scope.signup = function () {
		if ($scope.signupForm.$invalid) return null;

		$kinvey.User.signup({
			username: $scope.user.username,
			password: $scope.user.pwd,
			name: $scope.user.name,
			email: $scope.user.email
		}).then(function (user) {
			console.log('Successfully signed up...need email verfication!');
			$rootScope.activeUser = false;
			$state.go('root.login');
		},function(err) {
			console.log("Error sign up!...check error log below");
			console.log(err);	
			notify(err.description);
		})
	};
}]);
