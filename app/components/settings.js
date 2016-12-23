angular.module('pentominoApp')

// The terminal (input / output)
.directive('settings', function() {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/settings.html',
        link: function ($scope) {
            $scope.showSolution = function() {
                $scope.methods.showSolution();
            };
            $scope.showPreviousSolution = function() {
                if ($scope.currentSolution > 0) {
                    $scope.currentSolution --;
                    $scope.showSolution();
                }
            };
            $scope.showNextSolution = function() {
                if ($scope.currentSolution < $scope.solutions[$scope.board.brdType].length) {
                    $scope.currentSolution ++;
                    $scope.showSolution();
                }
            };
        }
	};
});
