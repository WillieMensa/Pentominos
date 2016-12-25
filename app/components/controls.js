angular.module('pentominoApp')

// The terminal (input / output)
.directive('controls', function() {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/controls.html',
        link: function ($scope) {
            $scope.showSolution = function() {
                $scope.methods.showSolution();
                $scope.settings.solutionsShown = true;
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
