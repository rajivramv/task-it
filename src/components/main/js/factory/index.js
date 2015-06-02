angular.module('main')
.factory('notify',['$timeout',function($timeout){
	return function(msg){
		$notify = $('.notify');
		if ($notify.length===0){
			$notify = $('body').append('<div class="notify"></div>'); 
			$notify = $('.notify');
		}
		$notify.text(msg).addClass('notify-shown');
		$timeout(function(){
			$notify.removeClass('notify-shown');
		},3000);
	}
}])