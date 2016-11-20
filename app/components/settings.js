angular.module('pentominoApp')

// The terminal (input / output)
.directive('settings', function() {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/settings.html',
		link: function($scope) {
		},
		controllerAs: 'settingsCtrl'
	};
});
