// Initialize kinvey and route the app to either the login page or the tasks page based on whether 
// an active user is present or not.
angular.module('main')
.run(['$kinvey','$state','$rootScope','$document','$timeout','notify',function($kinvey,$state,$rootScope,$document,$timeout,notify){
	var shouldExitApp = false;
	$document[0].addEventListener('backbutton',function(){
		if (shouldExitApp) return navigator.app.exitApp();
		else if ($state.$current.parent.name ==='root') {
			shouldExitApp = true;
			notify('Press back one more time to exit');
			$timeout(function(){
				shouldExitApp = false;
			},2800);
		} else return $state.go('^');
	},false);

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
