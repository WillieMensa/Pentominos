angular.module('pentominoApp')

// The terminal (input / output)
.directive('settings', function() {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/settings.html',
		controller: function($scope) {
            showSize = function () {
                console.log($scope.board.sizeType);
            }
		},
		controllerAs: 'settingsCtrl'
	};
});
