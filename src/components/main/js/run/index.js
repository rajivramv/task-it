angular.module('login')
.run(['$kinvey','$state','$rootScope',function($kinvey,$state,$rootScope){
	$kinvey.init({
			appKey: 'kid_Wk8MsXwikg',
			appSecret: '68c9a63e8a4a41b98898796652bfccc5'
	}).then(function(activeUser){
		$rootScope.activeUser = activeUser;
		if(activeUser===null){
			console.log('Kinvey initalized with no active user...redirecting to login page');
			$state.go('root.login');
		}else{
			console.log('Kinvey initalized with an active user...redirecting to tasks page');
			$state.go('root.tasks',{},{reload:true});
		}
	},function(err){
		console.log('Kinvey could not be initalized ...determining behaviour');
		if(err.name === "EmailVerificationRequired"){
			$rootScope.activeUser = false;
			console.log('The user has not clicked on the link that was sent through email...')
			$state.go('root.login');
		}else{
			console.log('Unable to resolve behaviour...see error log below');
			console.log(err);
		}
	})
}]);
