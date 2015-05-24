angular.module('login')
.run(['$kinvey','$state',function($kinvey,$state){
	console.log('login run');
	// TODO: handle kinvey failing to initialize better!
	$kinvey.init({
			appKey: 'kid_Wk8MsXwikg',
			appSecret: '68c9a63e8a4a41b98898796652bfccc5'
	}).then(function(){
		console.log('Kinvey initalized...checking for active user');
		return determineBehaviour($kinvey,$state);
	},function(err){
		console.log('Kinvey could not be initalized (see error log below)...determining behaviour');
		console.log(err);
		return determineBehaviour($kinvey,$state);
	})

	function determineBehaviour($kinvey,$state){
		var activeUser = $kinvey.getActiveUser();
		console.log('determining behaviour')
		if(activeUser!==null){
			console.log('Active user confirmed...redirecting to root state...');
			$state.go('root');
		} else {
			console.log('No active user...redirecting to login page...');
			$state.go('root.login');
		}		
	}
}]);
