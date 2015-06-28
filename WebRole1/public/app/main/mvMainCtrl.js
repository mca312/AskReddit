angular.module('app').controller('mvMainCtrl', function($scope) {
	$.getJSON('https://www.reddit.com/r/askreddit.json?limit=100', function(data){
		$scope.threads = data;		
	})
	.fail(function(){
		$scope.threads = 'fail';
	})
	.done(function() {
		$scope.nextQuestion();
		$scope.$apply();
	});

	$scope.nextQuestion = function() {
		var random = Math.floor(Math.random() * 100);
		$scope.random = random;
		$scope.question = $scope.threads.data.children[random].data.title
	}
});