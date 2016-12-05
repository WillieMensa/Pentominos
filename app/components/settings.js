angular.module('pentominoApp')

// The terminal (input / output)
.directive('settings', function() {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/settings.html',
        link: function ($scope) {
            $scope.currentSolution = 0;
            $scope.showSolution = function() {
                $scope.methods.showSolution($scope.solutions[$scope.board.brdType][$scope.currentSolution]);
            }
        }
	};
});
