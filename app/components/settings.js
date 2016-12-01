angular.module('pentominoApp')

// The terminal (input / output)
.directive('settings', function() {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/settings.html',
		controller: function($scope) {
            $scope.readStart = function () {
                $scope.getStartPosition();
            }
            console.log($scope.board);
		},
		controllerAs: 'settingsCtrl'
	};
});
