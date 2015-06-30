angular.module('app').controller('mvMainCtrl', function($scope) {
	var threads = [];

	$.getJSON('https://www.reddit.com/r/askreddit.json?limit=100', function(data){
		threads = data;
		local = data;		
	})
	.fail(function(){
		$scope.question = 'reddit api call failed';
		$scope.random = 'not loaded';
	})
	.done(function() {
		$scope.nextQuestion();
		$scope.$apply();
	});

	$scope.nextQuestion = function() {
		ga('send', 'event', 'nextQuestion', 'Click');
		$scope.hideAnswerDiv = true;		
		var random = Math.floor(Math.random() * 100);
		$scope.random = random;
		$scope.question = threads.data.children[random].data.title;
		$scope.currentThreadID = threads.data.children[random].data.id;
	}

	$scope.showAnswers = function() {
		ga('send', 'event', 'showAnswers', 'Click');
		$.getJSON('https://www.reddit.com/r/AskReddit/comments/' + $scope.currentThreadID + '/.json', function(data){
			$scope.comments = data[1];
		})
		.fail(function(){
			$scope.question = 'reddit comment api call failed';
		})
		.done(function() {
			$scope.hideAnswerDiv = false;
			$scope.$apply();
		});
	}
});